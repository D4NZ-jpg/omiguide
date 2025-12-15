"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { GuideSidebar as GuideSidebarModel } from "@/lib/content";
import { cn } from "@/lib/utils";

export function GuideSidebar({ sidebar }: { sidebar: GuideSidebarModel }) {
  const pathname = usePathname();

  const defaultOpen = sidebar.groups
    .filter(g => pathname.startsWith(`/guide/${g.section}`))
    .map(g => g.section);

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-3">
        <Link
          href={sidebar.home.url}
          className={cn(
            "block rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent",
            pathname === sidebar.home.url && "bg-accent"
          )}
        >
          {sidebar.home.title}
        </Link>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="px-3 py-3">
          <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
            {sidebar.groups.map(group => (
              <AccordionItem key={group.section} value={group.section} className="border-b-0">
                <AccordionTrigger className="py-2 text-sm">{group.label}</AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex flex-col gap-0.5">
                    {group.items.map(item => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className={cn(
                          "rounded-md px-2 py-1.5 text-sm hover:bg-accent",
                          pathname === item.url && "bg-accent"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
