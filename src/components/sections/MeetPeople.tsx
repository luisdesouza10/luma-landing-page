import Image from "next/image";
import type { CSSProperties } from "react";
import type { CollageColumn, SiteContent } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type MeetPeopleProps = { content: SiteContent["people"] };

type CssVars = CSSProperties & Record<`--${string}`, string>;

const alignClass: Record<NonNullable<CollageColumn["align"]>, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-start justify-center",
};

/**
 * Photo collage. Every photo keeps its exact Figma size per breakpoint
 * (mobile frame below 768px, desktop frame above); between 1024px and 1279px the
 * collage is zoomed to 85% so it fits beside the text column.
 */
function Collage({ columns }: { columns: CollageColumn[] }) {
  return (
    <div className="relative flex items-center justify-center gap-3 md:gap-4 lg:[zoom:0.85] xl:[zoom:1]">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft md:size-[500px]"
      />
      {columns.map((column, ci) => (
        <ul
          key={ci}
          className={cn(
            "relative flex flex-col gap-2 pt-(--mo) md:gap-[12.84px] md:pt-(--do)",
            alignClass[column.align ?? "start"],
          )}
          style={
            {
              "--mo": `${column.offset?.mobile ?? 0}px`,
              "--do": `${column.offset?.desktop ?? 0}px`,
            } as CssVars
          }
        >
          {column.photos.map((photo) => (
            <li
              key={photo.src}
              className="relative h-(--mh) w-(--mw) overflow-hidden rounded-[5px] shadow-photo md:h-(--h) md:w-(--w) md:rounded-[4px]"
              style={
                {
                  "--mw": `${photo.mobile.w}px`,
                  "--mh": `${photo.mobile.h}px`,
                  "--w": `${photo.desktop.w}px`,
                  "--h": `${photo.desktop.h}px`,
                } as CssVars
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 140px, 100px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function MeetPeople({ content }: MeetPeopleProps) {
  return (
    <section id="people" aria-labelledby="people-title" className="overflow-hidden bg-cream py-15 md:py-20 lg:py-25">
      <Container className="flex flex-col gap-8 md:gap-14 lg:flex-row lg:items-center lg:gap-15">
        <div className="reveal flex flex-col items-start gap-6 md:gap-8 lg:flex-1">
          <SectionHeading
            id="people-title"
            eyebrow={content.eyebrow}
            title={content.title}
            eyebrowGap="sm"
            className="max-w-[560px]"
          />
          <p className="text-subtitle-1-m text-ink md:text-subtitle-1 md:text-ink-muted">{content.description}</p>
          <ButtonLink href={content.cta.href} variant="secondary">
            {content.cta.label}
          </ButtonLink>
        </div>
        <div className="reveal lg:flex-1">
          <Collage columns={content.columns} />
        </div>
      </Container>
    </section>
  );
}
