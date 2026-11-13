import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";

type FooterProps = {
  brand: SiteContent["brand"];
  content: SiteContent["footer"];
};

export function Footer({ brand, content }: FooterProps) {
  return (
    <footer id="site-footer" className="bg-navy pt-15 pb-5 lg:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <Link href="/" aria-label={`${brand.name} home`} className="self-start">
              <Image src="/images/logo-light.svg" alt="" width={54} height={17} className="h-[17px] w-auto" />
            </Link>
            <p className="max-w-[240px] text-body text-on-dark-muted max-md:max-w-none">{brand.tagline}</p>
          </div>

          {content.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-overline font-semibold text-on-dark uppercase">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-body text-on-dark-muted transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-ink-muted pt-6 lg:mt-16">
          <p className="text-center text-caption text-white md:text-left md:text-on-dark">{content.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
