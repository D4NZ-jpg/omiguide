import type { GuideDoc } from "@/lib/content";

type PostMetadataProps = {
    doc: GuideDoc;
};

export function PostMetadata({ doc }: PostMetadataProps) {
    const hasMetadata = doc.author || doc.contributors?.length;

    if (!hasMetadata) return null;

    return (
        <div className="not-prose mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {doc.author && (
                <span>
                    {Array.isArray(doc.author) && doc.author.length > 1 ? "Autores" : "Autor"}:{" "}
                    <span className="text-foreground">
                        {Array.isArray(doc.author) ? doc.author.join(", ") : doc.author}
                    </span>
                </span>
            )}

            {doc.contributors && doc.contributors.length > 0 && (
                <span>
                    Contribuidores:{" "}
                    <span className="text-foreground">{doc.contributors.join(", ")}</span>
                </span>
            )}
        </div>
    );
}
