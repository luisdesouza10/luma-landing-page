import type { Step } from "@/types/content";
import { cn } from "@/lib/cn";

function StepIcon({ icon }: { icon: Step["icon"] }) {
  if (icon === "focus") {
    return (
      <div className="relative size-14 rounded-full bg-brand-soft">
        <div className="absolute top-2 left-2 size-6 rounded-md bg-brand" />
      </div>
    );
  }
  if (icon === "experience") {
    return (
      <div className="relative size-14">
        <div className="absolute inset-0 rotate-12 rounded-lg bg-coral/15 lg:bg-peach" />
        <div className="absolute top-6 left-6 size-7 rounded-full bg-coral" />
      </div>
    );
  }
  return (
    <div className="relative size-14 rounded-xl bg-butter">
      <div className="absolute top-7 left-2 size-5 rounded-full bg-mustard" />
    </div>
  );
}

type StepItemProps = Step & {
  hasNext?: boolean;
  className?: string;
};

export function StepItem({ label, title, description, icon, hasNext, className }: StepItemProps) {
  return (
    <li className={cn("relative flex flex-col", hasNext && "pb-[76px] md:pb-0", className)}>
      <div className="relative z-10 self-start" aria-hidden="true">
        <StepIcon icon={icon} />
      </div>
      <p className="mt-6 text-overline font-semibold text-ink-subtle uppercase">{label}</p>
      <h3 className="mt-2 font-display text-h5-m font-bold text-ink lg:text-h5">{title}</h3>
      <p className="mt-3 text-subtitle-2-m text-ink-muted lg:text-subtitle-2">{description}</p>
      {hasNext ? (
        <span aria-hidden="true" className="absolute bottom-0 left-7 h-[50px] w-px bg-line md:hidden" />
      ) : null}
    </li>
  );
}
