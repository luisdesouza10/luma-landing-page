import type { Stat } from "@/types/content";

export function StatItem({ value, label }: Stat) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="order-2 pt-1 text-body text-ink-subtle">{label}</dt>
      <dd className="order-1 font-display text-h1-m font-extrabold text-brand md:text-h1">{value}</dd>
    </div>
  );
}
