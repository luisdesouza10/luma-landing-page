import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = { children: ReactNode; className?: string };

// Translucent white instead of Figma's line-1: on brand blue its antialiased corners turn lilac.
export function Pill({ children, className }: PillProps) {
  return (
    <li className={cn("rounded-lg border border-white/80 px-3.5 py-1.5 text-body whitespace-nowrap", className)}>
      {children}
    </li>
  );
}
