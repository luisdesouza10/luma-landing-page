import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { content } from "@/data/content";
import { Header } from "./Header";

function setup() {
  const user = userEvent.setup();
  render(
    <>
      <Header brandName={content.brand.name} nav={content.nav} actions={content.headerActions} />
      <main id="main">
        <a href="#somewhere">Page link</a>
      </main>
      <footer id="site-footer" />
    </>,
  );
  const toggle = screen.getByRole("button", { name: "Open menu" });
  return { user, toggle };
}

describe("Header mobile menu", () => {
  it("starts closed", () => {
    const { toggle } = setup();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens as a modal dialog, moves focus inside, locks scroll and makes the page inert", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");
    expect(toggle).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByRole("link", { name: "Courses" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.getElementById("main")).toHaveAttribute("inert");
    expect(document.getElementById("site-footer")).toHaveAttribute("inert");
  });

  it("closes on Escape, restores focus to the toggle and unlocks the page", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
    expect(document.getElementById("main")).not.toHaveAttribute("inert");
  });

  it("traps focus between the close button and the menu items", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    const dialog = screen.getByRole("dialog");
    const items = within(dialog).getAllByRole("link");
    const last = items[items.length - 1];

    // Tab past the last item wraps to the close button…
    last.focus();
    await user.tab();
    expect(toggle).toHaveFocus();

    // …and Shift+Tab from the close button wraps back to the last item.
    await user.tab({ shift: true });
    expect(last).toHaveFocus();

    // Never escapes to the page behind.
    for (let i = 0; i < items.length + 2; i++) {
      await user.tab();
      expect(screen.getByRole("link", { name: "Page link", hidden: true })).not.toHaveFocus();
    }
  });

  it("closes when a menu link is followed", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Community" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("toggles closed with the same button", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
