import type { ReactNode } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { GuideSidebar as GuideSidebarModel } from "@/lib/content";
import { GuideSidebar } from "@/components/guide/GuideSidebar";

export function GuideShell({
  sidebar,
  children,
}: {
  sidebar: GuideSidebarModel;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <GuideSidebar sidebar={sidebar} />
            </SheetContent>
          </Sheet>

          <Link href="/guide" className="text-sm font-semibold">
            Comi Guide
          </Link>

          <div className="ml-auto" />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[18rem_1fr]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] border-r md:block">
          <GuideSidebar sidebar={sidebar} />
        </aside>

        <main className="min-w-0 px-4 py-8">
          {children}
          <Separator className="mt-10" />
          <p className="mt-4 text-xs text-muted-foreground">
            Edita archivos en <code className="rounded bg-muted px-1">content/guide</code> para actualizar el sitio.
          </p>
        </main>
      </div>
    </div>
  );
}
