import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  /** Space between eyebrow and title: 8px ("Meet") or 16px (everywhere else). */
  eyebrowGap?: "sm" | "md";
  className?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  tone = "default",
  eyebrowGap = "md",
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Eyebrow tone={inverse ? "light" : "brand"}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "font-display text-h3-m font-extrabold md:text-h3",
          eyebrowGap === "sm" ? "mt-2" : "mt-4",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-subtitle-1-m md:text-subtitle-1",
            inverse ? "text-white" : "text-ink-muted",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
