import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost-dark";
export type ButtonSize = "sm" | "md";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-body font-bold whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out " +
  "motion-safe:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "border border-line bg-white text-ink hover:border-ink-subtle",
  accent: "bg-sun text-ink hover:bg-sun-hover focus-visible:outline-sun",
  "ghost-dark": "text-on-dark hover:text-white focus-visible:outline-sun",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
};

export function buttonClasses({ variant = "primary", size = "md", fullWidth }: StyleProps = {}) {
  return cn(
    base,
    variants[variant],
    variant === "ghost-dark" ? "px-4 py-3.5" : sizes[size],
    fullWidth && "w-full",
  );
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export function Button({ variant, size, fullWidth, className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...rest} />
  );
}

type ButtonLinkProps = StyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode };

export function ButtonLink({ variant, size, fullWidth, className, ...rest }: ButtonLinkProps) {
  return <a className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...rest} />;
}
