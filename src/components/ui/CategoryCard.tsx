import Image from "next/image";
import type { Category } from "@/types/content";

type CategoryCardProps = Category & { linkLabel: string };

export function CategoryCard({ number, title, description, href, linkLabel }: CategoryCardProps) {
  return (
    <a
      href={href}
      className="group flex h-full min-h-[200px] flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-brand/40 hover:shadow-card motion-safe:hover:-translate-y-1 lg:min-h-[260px] lg:p-7"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 mb-5 self-start rounded-md bg-brand-soft px-2 py-1 text-overline font-semibold text-brand"
      >
        {number}
      </span>
      <h3 className="font-display text-h5-m font-bold text-ink lg:text-h5">{title}</h3>
      <p className="mt-3 text-body text-ink-subtle">{description}</p>
      <span className="mt-auto flex items-center gap-2 pt-6 text-body font-bold text-ink">
        {linkLabel}
        <span className="sr-only"> {title} courses</span>
        <Image
          src="/images/arrow-right.svg"
          alt=""
          width={20}
          height={20}
          className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
        />
      </span>
    </a>
  );
}
