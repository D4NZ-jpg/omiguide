import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ProblemProps = {
    name: string;
    url?: string;
    source?: string;
    difficulty?: "Muy Fácil" | "Fácil" | "Medio" | "Difícil" | "Muy Difícil";
    starred?: boolean;
    tags?: string[];
    children?: ReactNode;
};

export function Problem({ name, url, source, difficulty, starred, tags, children }: ProblemProps) {
    const difficultyColors = {
        "Muy Fácil": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        Fácil: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        Medio: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        Difícil: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        "Muy Difícil": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };

    return (
        <div className="not-prose my-3 rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
                {starred && (
                    <Star className="mt-0.5 h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                )}
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        {url ? (
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 font-medium text-foreground hover:underline"
                            >
                                {name}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        ) : (
                            <span className="font-medium">{name}</span>
                        )}
                        {source && (
                            <span className="text-xs text-muted-foreground">({source})</span>
                        )}
                        {difficulty && (
                            <span
                                className={cn(
                                    "rounded-full px-2 py-0.5 text-xs font-medium",
                                    difficultyColors[difficulty],
                                )}
                            >
                                {difficulty}
                            </span>
                        )}
                    </div>
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {children && (
                        <div className="text-sm text-muted-foreground [&_p]:m-0">{children}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
