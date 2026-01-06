"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SpoilerProps = {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
};

export function Spoiler({ title, children, defaultOpen = false }: SpoilerProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="not-prose my-4 rounded-lg border border-border bg-muted/30">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-2 p-4 text-left transition-colors hover:bg-muted/50"
            >
                {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className="flex-1 font-medium">{title}</span>
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all",
                    isOpen ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0",
                )}
            >
                <div className="border-t border-border p-4 [&_p]:m-0">{children}</div>
            </div>
        </div>
    );
}
