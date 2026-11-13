import type { SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepItem } from "@/components/ui/StepItem";

type HowItWorksProps = { content: SiteContent["howItWorks"] };

export function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-cream py-15 md:py-20 lg:py-25">
      <Container>
        <SectionHeading id="how-title" eyebrow={content.eyebrow} title={content.title} align="center" className="reveal" />
        {/*
          Desktop: a 1px rule runs behind the icons, from just past the first icon (52px)
          to 13px into the third column — same geometry as the Figma frame.
          --gap is the column gap (40px tablet, 80px desktop).
        */}
        <ol className="reveal relative mt-10 grid grid-cols-1 [--gap:40px] md:mt-16 md:grid-cols-3 md:gap-(--gap) md:py-7 lg:mt-20 lg:[--gap:80px]">
          <span
            aria-hidden="true"
            className="absolute top-[56.5px] left-[52px] hidden h-px w-[calc((100%-2*var(--gap))*2/3+2*var(--gap)-39px)] bg-line md:block"
          />
          {content.steps.map((step, i) => (
            <StepItem key={step.label} {...step} hasNext={i < content.steps.length - 1} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
