import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = { children: ReactNode; className?: string };

/** Outlined meta tag (e.g. "8 lessons") used on the blue Featured Course block. */
export function Pill({ children, className }: PillProps) {
  return (
    <li className={cn("rounded-lg border border-line px-3.5 py-1.5 text-body whitespace-nowrap", className)}>
      {children}
    </li>
  );
}
