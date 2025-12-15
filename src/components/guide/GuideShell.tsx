"use client";

import * as React from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { GuideSidebar as GuideSidebarModel } from "@/lib/content";
import { GuideSidebar } from "@/components/guide/GuideSidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function GuideShell({
  sidebar,
  children,
}: {
  sidebar: GuideSidebarModel;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem("comi:sidebar-collapsed");
      if (v === "1") setCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem("comi:sidebar-collapsed", next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center gap-2 px-4">
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

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label={collapsed ? "Mostrar sidebar" : "Ocultar sidebar"}
            onClick={toggleCollapsed}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>

          <Link href="/guide" className="text-sm font-semibold">
            Comi Guide
          </Link>

          <div className="ml-auto" />
          <ThemeToggle />
        </div>
      </header>

      {/* Desktop: fixed left sidebar anchored to viewport (not centered). */}
      <aside
        className={cn(
          "fixed left-0 top-14 hidden h-[calc(100dvh-3.5rem)] w-72 border-r bg-background md:block",
          collapsed && "md:hidden"
        )}
      >
        <GuideSidebar sidebar={sidebar} />
      </aside>

      <main
        className={cn(
          "min-w-0 px-4 py-8 transition-[padding] duration-200",
          collapsed ? "md:pl-4" : "md:pl-[calc(18rem+1rem)]"
        )}
      >
        <div className="w-full max-w-3xl">
          {children}
          <Separator className="mt-10" />
          <p className="mt-4 text-xs text-muted-foreground">
            Edita archivos en <code className="rounded bg-muted px-1">content/guide</code> para actualizar el sitio.
          </p>
        </div>
      </main>
    </div>
  );
}
