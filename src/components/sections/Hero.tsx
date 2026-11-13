import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeroProps = { content: SiteContent["hero"] };

/*
 * Media block geometry comes straight from Figma:
 *  - mobile (base): 380px tall, photo inset 8px, peach bar from 27.8% to 10px past the right edge;
 *  - desktop (lg): 500×520 box, peach bar at left 90% / 17.8% wide, circle at (-44.8px, 77.5%).
 */
export function Hero({ content }: HeroProps) {
  const { trust, coursesBadge, ratingBadge } = content;

  return (
    <section aria-labelledby="hero-title" className="bg-cream py-15 md:py-20 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-15">
        <div className="flex flex-col lg:order-1 lg:flex-1">
          <Eyebrow className="motion-safe:animate-fade-up">{content.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 font-display text-h1-m font-extrabold text-ink motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] md:text-h1 lg:text-h2 xl:text-h1"
          >
            {content.title}
          </h1>
          <p className="mt-6 max-w-[480px] text-subtitle-1-m text-ink-muted motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] md:text-subtitle-1">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] md:flex-row">
            <ButtonLink href={content.primaryCta.href} className="w-full md:w-auto">
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="secondary" className="w-full md:w-auto">
              {content.secondaryCta.label}
            </ButtonLink>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] md:justify-start">
            <AvatarStack avatars={trust.avatars} size={32} ringClassName="border-cream" />
            <p className="text-body text-ink">
              <strong className="font-bold">{trust.strong}</strong>{" "}
              <span className="text-ink-muted">{trust.rest}</span>
            </p>
          </div>
        </div>

        <div className="relative order-first h-[380px] w-full motion-safe:animate-fade-up md:h-[480px] lg:order-2 lg:h-auto lg:w-[400px] lg:shrink-0 lg:aspect-[500/520] xl:w-[500px]">
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-3.5 left-[27.8%] -right-2.5 rounded-2xl bg-peach lg:right-auto lg:bottom-auto lg:left-[90%] lg:h-[90%] lg:w-[17.8%]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-3 -left-2.5 size-16 rounded-full bg-brand-soft lg:bottom-auto lg:-left-[44.8px] lg:top-[77.5%] lg:size-[106px]"
          />
          <div className="absolute inset-y-0 inset-x-2 overflow-hidden rounded-2xl bg-brand-soft lg:inset-0 lg:rounded-3xl">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              preload
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 400px, 100vw"
              className="object-cover object-[50%_25%] lg:object-center"
            />
          </div>

          <p className="absolute top-1.5 left-0 flex w-max items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float lg:top-4 lg:-left-[22px]">
            <span className="flex h-8 items-center rounded-lg bg-brand-soft px-1 text-body font-bold text-brand">
              {coursesBadge.value}
            </span>
            <span className="text-body text-ink">{coursesBadge.label}</span>
          </p>

          <p className="absolute -right-1.5 bottom-[35px] flex w-max items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-float lg:-right-6 lg:bottom-auto lg:top-[83.9%] xl:-right-14">
            <span className="flex gap-0.5" role="img" aria-label={`${ratingBadge.stars} out of 5 stars`}>
              {Array.from({ length: ratingBadge.stars }, (_, i) => (
                <Image key={i} src="/images/star.svg" alt="" width={14} height={14} />
              ))}
            </span>
            <span className="text-body whitespace-nowrap text-ink">{ratingBadge.label}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
