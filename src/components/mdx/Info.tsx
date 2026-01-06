import type { ReactNode } from "react";
import { Info as InfoIcon } from "lucide-react";

type InfoProps = {
    title?: string;
    children: ReactNode;
};

export function Info({ title, children }: InfoProps) {
    return (
        <div className="not-prose my-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
            <div className="flex gap-3">
                <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <div className="flex-1 space-y-1">
                    {title && (
                        <h4 className="m-0 text-sm font-semibold text-blue-900 dark:text-blue-100">
                            {title}
                        </h4>
                    )}
                    <div className="text-sm text-blue-800 dark:text-blue-200 [&_p]:m-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
