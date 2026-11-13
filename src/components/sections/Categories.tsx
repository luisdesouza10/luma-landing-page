import type { SiteContent } from "@/types/content";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type CategoriesProps = { content: SiteContent["categories"] };

export function Categories({ content }: CategoriesProps) {
  return (
    <section id="categories" aria-labelledby="categories-title" className="bg-white py-15 md:py-20 lg:py-25">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="reveal max-w-[560px]"
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {content.items.map((item) => (
            <li key={item.number} className="reveal">
              <CategoryCard {...item} linkLabel={content.linkLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
