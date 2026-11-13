import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { StatItem } from "@/components/ui/StatItem";

type TestimonialProps = { content: SiteContent["testimonial"] };

export function Testimonial({ content }: TestimonialProps) {
  const { author } = content;
  return (
    <section aria-label="What learners say" className="bg-white py-15 md:py-20 lg:py-25">
      <Container className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <figure className="reveal flex max-w-[600px] flex-col">
          <Image src="/images/quote.svg" alt="" width={24} height={22} className="h-[22px] w-6" />
          <blockquote className="mt-4 font-display text-quote-m font-semibold text-ink md:text-quote">
            <p>{content.quote}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-brand-soft">
              <Image src={author.avatar.src} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="flex flex-col">
              <span className="text-subtitle-1-m font-bold text-ink md:text-[16px] md:leading-7">{author.name}</span>
              <span className="text-body text-ink-muted">{author.role}</span>
            </span>
          </figcaption>
        </figure>

        <dl className="reveal grid grid-cols-3 gap-x-4 lg:w-[401px] lg:shrink-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-line lg:pl-12">
          {content.stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
