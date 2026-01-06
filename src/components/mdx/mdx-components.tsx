import Link from "next/link";
import type { ComponentProps } from "react";
import { Info } from "./Info";
import { Warning } from "./Warning";
import { Spoiler } from "./Spoiler";
import { Optional } from "./Optional";
import { Problem } from "./Problem";

function isInternalHref(href: string) {
    return href.startsWith("/") || href.startsWith("#");
}

export const mdxComponents = {
    a: ({ href, ...props }: ComponentProps<"a">) => {
        if (!href) return <a {...props} />;

        if (isInternalHref(href)) {
            // next/link doesn't support all <a> props directly, so keep it simple.
            return (
                <Link href={href} className={props.className}>
                    {props.children}
                </Link>
            );
        }

        return <a href={href} target="_blank" rel="noreferrer" {...props} />;
    },
    Info,
    Warning,
    Spoiler,
    Optional,
    Problem,
};
