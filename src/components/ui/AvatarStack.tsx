import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: ImageAsset[];
  /** Avatar diameter in px (32 in the hero, 40 in the final CTA). */
  size: number;
  /** Ring colour that separates overlapping avatars. */
  ringClassName: string;
  className?: string;
};

/** Overlapping round avatars; each one overlaps the previous by 8px, as in Figma. */
export function AvatarStack({ avatars, size, ringClassName, className }: AvatarStackProps) {
  return (
    <ul className={cn("flex", className)} aria-hidden="true">
      {avatars.map((avatar, i) => (
        <li
          key={avatar.src}
          className={cn("relative shrink-0 overflow-hidden rounded-full border-2 bg-brand-soft", ringClassName)}
          style={{ width: size, height: size, marginLeft: i === 0 ? 0 : -8, zIndex: i }}
        >
          <Image src={avatar.src} alt="" fill sizes={`${size}px`} className="object-cover" />
        </li>
      ))}
    </ul>
  );
}
