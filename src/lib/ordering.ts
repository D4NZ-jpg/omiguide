// Section -> Chapter -> Post
// Define el orden explícito de secciones, capítulos y posts
// Este archivo controla el ordenamiento del sidebar

export type SectionID = string;

export type Chapter = {
    name: string;
    description?: string;
    items: string[]; // IDs de posts o slugs (ej: "blog/primer-post")
};

export type SectionConfig = {
    label?: string; // Label personalizado para el sidebar (opcional)
    chapters?: Chapter[]; // Capítulos dentro de la sección (opcional)
    items?: string[]; // Posts directos si no hay capítulos
};

// Configuración de ordenamiento
// Las secciones se ordenan según el orden de las claves en este objeto
// Los posts dentro de cada sección/capítulo se ordenan según el array 'items'
const ORDERING: Record<SectionID, SectionConfig> = {
    blog: {
        label: "Blog",
        items: [
            "blog-index", // ID del frontmatter (también puedes usar "blog/index" como slug)
            "blog/primer-post", // Slug o ID, ambos funcionan
            // Agrega más posts aquí en el orden deseado
        ],
    },
    secciones: {
        label: "Secciones",
        chapters: [
            {
                name: "Introducción",
                description: "Guías básicas para empezar",
                items: [
                    "secciones/index", // Página índice de la sección
                    "secciones/como-escribir",
                    // Agrega más posts aquí
                ],
            },
            // Agrega más capítulos aquí
        ],
    },
    // Agrega más secciones aquí
};

export default ORDERING;

// Helper para obtener el orden de una sección
export function getSectionOrder(section: string): number {
    const sections = Object.keys(ORDERING);
    const index = sections.indexOf(section);
    return index === -1 ? 999 : index;
}

// Helper para verificar si un post está en la configuración
export function isPostInOrdering(slug: string[]): boolean {
    const slugStr = slug.join("/");
    for (const sectionConfig of Object.values(ORDERING)) {
        // Verificar en items directos
        if (sectionConfig.items?.includes(slugStr)) {
            return true;
        }
        // Verificar en capítulos
        if (sectionConfig.chapters) {
            for (const chapter of sectionConfig.chapters) {
                if (chapter.items.includes(slugStr)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Helper para obtener el orden de un post dentro de su sección
// Busca por slug completo o por ID del frontmatter
export function getPostOrder(slug: string[], id?: string): number {
    const slugStr = slug.join("/");
    for (const sectionConfig of Object.values(ORDERING)) {
        // Verificar en items directos
        if (sectionConfig.items) {
            // Buscar por slug primero
            let index = sectionConfig.items.indexOf(slugStr);
            if (index !== -1) return index;

            // Si no se encuentra y hay ID, buscar por ID
            if (id) {
                index = sectionConfig.items.indexOf(id);
                if (index !== -1) return index;
            }
        }
        // Verificar en capítulos
        if (sectionConfig.chapters) {
            let globalIndex = 0;
            for (const chapter of sectionConfig.chapters) {
                // Buscar por slug primero
                let index = chapter.items.indexOf(slugStr);
                if (index !== -1) return globalIndex + index;

                // Si no se encuentra y hay ID, buscar por ID
                if (id) {
                    index = chapter.items.indexOf(id);
                    if (index !== -1) return globalIndex + index;
                }

                globalIndex += chapter.items.length;
            }
        }
    }
    return 999;
}

// Helper para obtener la configuración de una sección
export function getSectionConfig(section: string): SectionConfig | undefined {
    return ORDERING[section];
}

// Helper para obtener el label de una sección
export function getSectionLabel(section: string): string {
    return ORDERING[section]?.label ?? section;
}
