import Image from "next/image";
import type { ContactChannel, SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

type ContactProps = { content: SiteContent["contact"] };

const icons: Record<ContactChannel["icon"], { src: string; size: number }> = {
  chat: { src: "/images/icon-chat.svg", size: 24 },
  clock: { src: "/images/icon-clock.svg", size: 20 },
};

function ChannelCard({ channel }: { channel: ContactChannel }) {
  const icon = icons[channel.icon];
  return (
    <li className="flex items-center gap-4 rounded-xl bg-cream p-4 md:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft" aria-hidden="true">
        <Image src={icon.src} alt="" width={icon.size} height={icon.size} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 text-body md:gap-1">
        <span className="text-ink">{channel.label}</span>
        {channel.href ? (
          <a href={channel.href} className="break-words text-brand underline-offset-4 hover:underline">
            {channel.value}
          </a>
        ) : (
          <span className="text-ink-subtle">{channel.value}</span>
        )}
      </span>
    </li>
  );
}

export function Contact({ content }: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-15 md:py-20 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-15">
        <div className="reveal flex flex-col gap-8 lg:max-w-[480px] lg:flex-1 lg:gap-10">
          <SectionHeading
            id="contact-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            descriptionClassName="text-subtitle-2-m md:text-subtitle-1"
          />
          <ul className="flex flex-col gap-4">
            {content.channels.map((channel) => (
              <ChannelCard key={channel.label} channel={channel} />
            ))}
          </ul>
        </div>
        <div className="reveal w-full lg:max-w-[540px] lg:flex-1">
          <ContactForm copy={content.form} />
        </div>
      </Container>
    </section>
  );
}
