import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FeaturedCourseProps = { content: SiteContent["featuredCourse"] };

export function FeaturedCourse({ content }: FeaturedCourseProps) {
  return (
    <section id="featured" aria-labelledby="featured-title" className="bg-brand py-15 md:py-20 lg:py-25">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-15">
        <div className="reveal relative">
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-brand-soft md:h-[400px] lg:h-[408px]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="absolute -top-3 -left-3 rounded-md bg-sun px-3 py-1.5 text-overline font-semibold text-ink uppercase">
            {content.badge}
          </p>
        </div>

        <div className="reveal flex flex-col items-start">
          <SectionHeading
            id="featured-title"
            eyebrow={content.eyebrow}
            title={content.title}
            tone="inverse"
            description={content.description}
            descriptionClassName="mt-5 text-subtitle-2-m md:text-subtitle-2"
          />
          <p className="mt-6 text-subtitle-2-m text-white md:text-subtitle-2">{content.instructor}</p>
          <ul className="mt-6 flex flex-wrap gap-3 text-on-dark lg:text-white" aria-label="Course details">
            {content.meta.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </ul>
          <div className="mt-8 flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <ButtonLink href={content.primaryCta.href} variant="accent" className="w-full md:w-auto">
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="ghost-dark" className="group w-full md:w-auto">
              {content.secondaryCta.label}
              <Image
                src="/images/arrow-right-light.svg"
                alt=""
                width={20}
                height={20}
                className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
