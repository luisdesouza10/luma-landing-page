import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  tone?: "brand" | "light" | "muted";
  className?: string;
};

const tones = {
  brand: "text-brand",
  light: "text-white",
  muted: "text-ink-subtle",
} as const;

/** Small uppercase label ("Overline" text style in Figma). */
export function Eyebrow({ children, tone = "brand", className }: EyebrowProps) {
  return (
    <p className={cn("text-overline font-semibold uppercase", tones[tone], className)}>{children}</p>
  );
}
