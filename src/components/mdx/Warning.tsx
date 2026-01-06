import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

type WarningProps = {
    title?: string;
    children: ReactNode;
};

export function Warning({ title, children }: WarningProps) {
    return (
        <div className="not-prose my-4 rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-800 dark:bg-yellow-950/30">
            <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                <div className="flex-1 space-y-1">
                    {title && (
                        <h4 className="m-0 text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                            {title}
                        </h4>
                    )}
                    <div className="text-sm text-yellow-800 dark:text-yellow-200 [&_p]:m-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
