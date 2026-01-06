import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuideStaticParams, getGuideDoc } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { PostMetadata } from "@/components/guide/PostMetadata";

export const dynamic = "force-static";

export function generateStaticParams() {
    return getAllGuideStaticParams();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const doc = getGuideDoc(slug);
    if (!doc) return { title: "No encontrado" };

    return {
        title: doc.title,
        description: doc.description,
    };
}

export default async function GuidePage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    const doc = getGuideDoc(slug);
    if (!doc) notFound();

    const rendered = await renderMdx(doc.mdx);

    return (
        <article className="prose prose-neutral dark:prose-invert max-w-none">
            <header className="not-prose mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
                {doc.description ? (
                    <p className="mt-2 text-muted-foreground">{doc.description}</p>
                ) : null}
                <PostMetadata doc={doc} />
            </header>

            {rendered.content}
        </article>
    );
}
