import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/types/content";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FinalCtaProps = { content: SiteContent["finalCta"] };

type Shape = { className: string; style: CSSProperties };

/*
 * Decorative shapes, positioned exactly as in the 1280px Figma frame (2:352).
 * Shapes on the right half are anchored with `right` so they stay put between
 * 1024px and 1280px. Hidden below 1024px (the mobile frame has none).
 */
const shapes: Shape[] = [
  { className: "size-[108px] rounded-full border-2 border-peach", style: { left: 22, top: 16 } },
  { className: "size-[120px] rounded-full bg-peach", style: { left: 56, top: 373 } },
  { className: "size-10 rounded-full bg-peach", style: { right: 176, top: 468 } },
  { className: "size-[115px] rotate-12 rounded-lg bg-peach", style: { right: 10, top: -14 } },
  { className: "size-14 rotate-12 rounded-lg bg-peach", style: { left: -28, top: 235 } },
  { className: "size-8 rounded-full border-2 border-peach", style: { right: 40, top: 429 } },
  { className: "size-8 rounded-full border-2 border-peach", style: { right: 371, top: 43 } },
  { className: "size-14 rotate-12 rounded-lg border border-peach", style: { left: 322, top: 47.6 } },
];

const icons = [
  { src: "/images/cta-deco-b.svg", size: 82.56, style: { left: 281.3, top: 369.3, rotate: "15deg" } },
  { src: "/images/cta-deco-cube.svg", size: 160, style: { right: 40, top: 180.4 } },
  { src: "/images/cta-deco-bubble.svg", size: 32, style: { left: 141, top: 214 } },
  { src: "/images/cta-deco-drop.svg", size: 61.376, style: { right: 202.6, top: 82 } },
  { src: "/images/cta-deco-door.svg", size: 48, style: { right: 269, top: 381 } },
] satisfies Array<{ src: string; size: number; style: CSSProperties }>;

export function FinalCta({ content }: FinalCtaProps) {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-butter py-15 lg:py-25">
      {/* A centred 1280px "frame" (or the full viewport when narrower) that holds the shapes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[1280px] -translate-x-1/2 lg:block"
      >
        {shapes.map((shape, i) => (
          <div key={i} className={cn("absolute", shape.className)} style={shape.style} />
        ))}
        {icons.map((icon) => (
          <Image
            key={icon.src}
            src={icon.src}
            alt=""
            width={icon.size}
            height={icon.size}
            className="absolute"
            style={{ ...icon.style, width: icon.size, height: icon.size }}
          />
        ))}
      </div>

      <div className="reveal relative mx-auto flex w-full max-w-[720px] flex-col items-center px-5 text-center md:px-8">
        <AvatarStack avatars={content.avatars} size={40} ringClassName="border-sun" />
        <h2
          id="final-cta-title"
          className="mt-8 font-display text-h2-m font-extrabold text-ink md:text-h2"
        >
          {content.title}
        </h2>
        <p className="mt-4 text-subtitle-1-m text-ink-muted md:text-subtitle-1">{content.description}</p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 md:w-auto md:flex-row">
          <ButtonLink href={content.primaryCta.href} className="w-full md:w-auto">
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary" className="w-full md:w-auto">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
