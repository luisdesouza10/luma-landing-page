"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CallToAction, NavLink } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeaderProps = {
  brandName: string;
  nav: NavLink[];
  actions: { login: CallToAction; primary: CallToAction };
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** Elements made inert while the mobile menu is open. */
const BACKGROUND_SELECTORS = ["#main", "#site-footer"];

export function Header({ brandName, nav, actions }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    // Lock page scroll and hide the rest of the page from assistive tech / tab order.
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const background = BACKGROUND_SELECTORS.map((s) => document.querySelector<HTMLElement>(s)).filter(
      (el): el is HTMLElement => el !== null,
    );
    background.forEach((el) => el.setAttribute("inert", ""));

    // Move focus into the menu.
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap: the toggle (now "Close menu") plus everything inside the panel.
      const items = [
        toggleRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !items.includes(active as HTMLElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close automatically if the viewport grows past the mobile layout.
    const media = window.matchMedia("(min-width: 1024px)");
    const onMedia = (e: MediaQueryListEvent) => {
      if (e.matches) close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onMedia);
    return () => {
      body.style.overflow = previousOverflow;
      background.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onMedia);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-brand px-4 py-2 text-body font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Container className="grid h-[68px] grid-cols-[1fr_auto] items-center lg:h-[70px] lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="justify-self-start" aria-label={`${brandName} home`}>
          <Image src="/images/logo.svg" alt="" width={54} height={17} className="h-[17px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-body text-ink-muted transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-2 lg:flex">
          <a
            href={actions.login.href}
            className="rounded-lg px-4 py-2.5 text-body text-ink-muted transition-colors hover:text-ink"
          >
            {actions.login.label}
          </a>
          <ButtonLink href={actions.primary.href} size="sm">
            {actions.primary.label}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="justify-self-end rounded-md p-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#171B2C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <Image src="/images/icon-menu.svg" alt="" width={24} height={24} />
          )}
        </button>
      </Container>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 top-[69px] bottom-0 overflow-y-auto bg-cream motion-safe:animate-fade-up lg:hidden"
        >
          <Container className="flex min-h-full flex-col gap-8 py-8">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((link) => (
                  <li key={link.label} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={() => close(false)}
                      className="block py-4 font-display text-h5 font-bold text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3">
              <ButtonLink href={actions.primary.href} fullWidth onClick={() => close(false)}>
                {actions.primary.label}
              </ButtonLink>
              <ButtonLink href={actions.login.href} variant="secondary" fullWidth onClick={() => close(false)}>
                {actions.login.label}
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
