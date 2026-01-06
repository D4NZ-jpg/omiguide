import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

type OptionalProps = {
    title?: string;
    children: ReactNode;
};

export function Optional({ title, children }: OptionalProps) {
    return (
        <div className="not-prose my-4 rounded-lg border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-950/30">
            <div className="flex gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />
                <div className="flex-1 space-y-1">
                    {title && (
                        <h4 className="m-0 text-sm font-semibold text-purple-900 dark:text-purple-100">
                            Opcional{title ? `: ${title}` : ""}
                        </h4>
                    )}
                    {!title && (
                        <h4 className="m-0 text-sm font-semibold text-purple-900 dark:text-purple-100">
                            Opcional
                        </h4>
                    )}
                    <div className="text-sm text-purple-800 dark:text-purple-200 [&_p]:m-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
