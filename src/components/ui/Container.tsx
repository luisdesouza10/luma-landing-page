import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLElement> & { as?: ElementType };

/**
 * Page gutter: 20px on mobile, 40px on tablet/small laptops, 80px from 1280px
 * (the desktop frame), capped so content never exceeds 1120px.
 */
export function Container({ as: Tag = "div", className, ...rest }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20", className)} {...rest} />;
}
