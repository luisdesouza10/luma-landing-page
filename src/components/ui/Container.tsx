import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLElement> & { as?: ElementType };

export function Container({ as: Tag = "div", className, ...rest }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20", className)} {...rest} />;
}
