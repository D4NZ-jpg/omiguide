import type { ReactNode } from "react";
import { getGuideSidebar } from "@/lib/content";
import { GuideShell } from "@/components/guide/GuideShell";

export default function GuideLayout({ children }: { children: ReactNode }) {
    const sidebar = getGuideSidebar();
    return <GuideShell sidebar={sidebar}>{children}</GuideShell>;
}
