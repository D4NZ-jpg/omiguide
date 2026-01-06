import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getSectionOrder, getPostOrder, getSectionLabel, getSectionConfig } from "./ordering";

export type GuideFrontmatter = {
    title?: string;
    description?: string;
    order?: number;
    draft?: boolean;
    id?: string; // Identificador único del post (no depende del nombre del archivo)
    prerequisites?: string[]; // IDs de posts que deben leerse antes
    author?: string | string[]; // Autor o autores del post
    contributors?: string[]; // Contribuidores al post
    frequency?: number; // Qué tan común es el tema en competencias (1-5, donde 5 es muy común)
};

export type GuideDoc = {
    slug: string[];
    url: string;
    section: string; // first path segment ("" for root)
    title: string;
    description?: string;
    order: number;
    mdx: string;
    id?: string;
    prerequisites?: string[];
    author?: string | string[];
    contributors?: string[];
    frequency?: number;
};

export type GuideSidebarGroup = {
    section: string;
    label: string;
    items: Array<Pick<GuideDoc, "slug" | "url" | "title" | "order" | "id">>;
};

export type GuideSidebar = {
    home: Pick<GuideDoc, "url" | "title">;
    groups: GuideSidebarGroup[];
};

const GUIDE_ROOT = path.join(process.cwd(), "content", "guide");

function titleFromSlugSegment(seg: string) {
    return seg.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeOrder(v: unknown): number {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) {
        return Number(v);
    }
    return 999;
}

function resolveMdxPathFromSlug(slug: string[]): string | null {
    // [] -> content/guide/index.mdx
    if (slug.length === 0) {
        const p = path.join(GUIDE_ROOT, "index.mdx");
        return fs.existsSync(p) ? p : null;
    }

    // Prefer /a/b.mdx, fallback to /a/b/index.mdx
    const direct = path.join(GUIDE_ROOT, ...slug) + ".mdx";
    if (fs.existsSync(direct)) return direct;

    const index = path.join(GUIDE_ROOT, ...slug, "index.mdx");
    if (fs.existsSync(index)) return index;

    return null;
}

function slugFromFile(relPath: string): string[] {
    const noExt = relPath.replace(/\.mdx$/, "");
    const parts = noExt.split(path.sep).filter(Boolean);
    if (parts.length === 1 && parts[0] === "index") return [];
    if (parts.at(-1) === "index") return parts.slice(0, -1);
    return parts;
}

function urlFromSlug(slug: string[]): string {
    return slug.length === 0 ? "/guide" : `/guide/${slug.join("/")}`;
}

export function getGuideDoc(slug: string[] | undefined): GuideDoc | null {
    const normalizedSlug = slug ?? [];
    const mdxPath = resolveMdxPathFromSlug(normalizedSlug);
    if (!mdxPath) return null;

    const rel = path.relative(GUIDE_ROOT, mdxPath);
    const fileSlug = slugFromFile(rel);
    const raw = fs.readFileSync(mdxPath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as GuideFrontmatter;

    const title = fm.title ?? (fileSlug.length ? titleFromSlugSegment(fileSlug.at(-1)!) : "Inicio");
    const section = fileSlug.length ? fileSlug[0] : "";

    if (fm.draft) return null;

    return {
        slug: fileSlug,
        url: urlFromSlug(fileSlug),
        section,
        title,
        description: fm.description,
        order: normalizeOrder(fm.order),
        mdx: content,
        id: fm.id,
        prerequisites: fm.prerequisites,
        author: fm.author,
        contributors: fm.contributors,
        frequency: fm.frequency,
    };
}

function walkMdxFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const out: string[] = [];
    for (const e of entries) {
        if (e.name.startsWith(".")) continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            out.push(...walkMdxFiles(full));
        } else if (e.isFile() && e.name.endsWith(".mdx")) {
            out.push(full);
        }
    }
    return out;
}

export function getAllGuideDocs(): GuideDoc[] {
    if (!fs.existsSync(GUIDE_ROOT)) return [];

    const files = walkMdxFiles(GUIDE_ROOT);
    const docs: GuideDoc[] = [];

    for (const abs of files) {
        const rel = path.relative(GUIDE_ROOT, abs);
        const slug = slugFromFile(rel);
        const doc = getGuideDoc(slug);
        if (doc) docs.push(doc);
    }

    return docs;
}

export function getAllGuideStaticParams(): Array<{ slug: string[] }> {
    // Include root too for optional catch-all.
    const docs = getAllGuideDocs();
    return docs.map((d) => ({ slug: d.slug }));
}

export function getGuideSidebar(): GuideSidebar {
    const docs = getAllGuideDocs();
    const home = docs.find((d) => d.slug.length === 0) ?? {
        slug: [],
        url: "/guide",
        section: "",
        title: "Inicio",
        description: undefined,
        order: 0,
        mdx: "",
    };

    const bySection = new Map<string, GuideDoc[]>();
    for (const d of docs) {
        if (d.slug.length === 0) continue; // keep home separate
        const key = d.section;
        const arr = bySection.get(key) ?? [];
        arr.push(d);
        bySection.set(key, arr);
    }

    // Sistema de ordenamiento explícito: solo se ordena lo que está en ordering.ts
    const groups: GuideSidebarGroup[] = Array.from(bySection.entries())
        .sort(([a], [b]) => {
            const orderA = getSectionOrder(a);
            const orderB = getSectionOrder(b);
            // Secciones no configuradas van al final (999)
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            // Si ambas están al final, orden alfabético
            return a.localeCompare(b);
        })
        .map(([section, items]) => {
            // Usar label personalizado si existe, sino generar desde el nombre
            const label = getSectionLabel(section) || titleFromSlugSegment(section);

            // Ordenar items: solo por ordenamiento explícito en ordering.ts
            // Posts no configurados van al final (999) y luego orden alfabético
            const sorted = items.slice().sort((x, y) => {
                const orderX = getPostOrder(x.slug, x.id);
                const orderY = getPostOrder(y.slug, y.id);

                // Si ambos tienen orden explícito, usar ese orden
                if (orderX !== 999 && orderY !== 999) {
                    return orderX - orderY;
                }

                // Si solo uno tiene orden explícito, ese va primero
                if (orderX !== 999) return -1;
                if (orderY !== 999) return 1;

                // Si ninguno tiene orden explícito, orden alfabético
                return x.title.localeCompare(y.title);
            });

            return {
                section,
                label,
                items: sorted.map((i) => ({
                    slug: i.slug,
                    url: i.url,
                    title: i.title,
                    order: i.order,
                    id: i.id,
                })),
            };
        });

    return {
        home: { url: home.url, title: home.title },
        groups,
    };
}
