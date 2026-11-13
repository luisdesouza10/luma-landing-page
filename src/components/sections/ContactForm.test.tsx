import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { content } from "@/data/content";
import { ContactForm } from "./ContactForm";

const copy = content.contact.form;

function setup(onSubmitted = vi.fn()) {
  const user = userEvent.setup();
  render(<ContactForm copy={copy} submitDelayMs={0} onSubmitted={onSubmitted} />);
  return {
    user,
    onSubmitted,
    name: screen.getByLabelText("Full name"),
    email: screen.getByLabelText("Email"),
    message: screen.getByLabelText("Your question"),
    submit: screen.getByRole("button", { name: "Send message" }),
  };
}

describe("ContactForm", () => {
  it("renders the English copy from the desktop design", () => {
    setup();
    expect(screen.getByRole("heading", { name: "Contact us" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("youremail@example.com")).toBeInTheDocument();
  });

  it("shows an error for every empty field and focuses the first invalid one", async () => {
    const { user, name, email, message, submit, onSubmitted } = setup();

    await user.click(submit);

    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Please enter your name.");
    expect(email).toHaveAccessibleDescription("Please enter your email address.");
    expect(message).toHaveAccessibleDescription("Please tell us how we can help.");
    expect(name).toHaveFocus();
    expect(onSubmitted).not.toHaveBeenCalled();
  });

  it("validates the email format when the field loses focus and clears the error once fixed", async () => {
    const { user, email } = setup();

    await user.type(email, "maya@example");
    await user.tab();
    expect(email).toHaveAccessibleDescription("Please enter a valid email, like name@example.com.");

    await user.type(email, ".com");
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("does not flag an empty field just because focus passed through it", async () => {
    const { user, name } = setup();

    await user.click(name);
    await user.tab();

    expect(name).not.toHaveAttribute("aria-invalid");
  });

  it("requires a message with some detail", async () => {
    const { user, name, email, message, submit } = setup();

    await user.type(name, "Maya Chen");
    await user.type(email, "maya@example.com");
    await user.type(message, "Hi");
    await user.click(submit);

    expect(message).toHaveAccessibleDescription(/at least 10 characters/);
    expect(message).toHaveFocus();
  });

  it("submits trimmed values, shows a success message and can be reset", async () => {
    const { user, name, email, message, submit, onSubmitted } = setup();

    await user.type(name, "  Maya Chen ");
    await user.type(email, "maya@example.com");
    await user.type(message, "Which course should I start with?");
    await user.click(submit);

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(copy.success.title);
    expect(onSubmitted).toHaveBeenCalledWith({
      name: "Maya Chen",
      email: "maya@example.com",
      message: "Which course should I start with?",
    });
    await waitFor(() => expect(screen.getByRole("heading", { name: copy.success.title })).toHaveFocus());

    await user.click(screen.getByRole("button", { name: copy.success.reset }));
    const freshName = screen.getByLabelText("Full name");
    expect(freshName).toHaveValue("");
    await waitFor(() => expect(freshName).toHaveFocus());
  });
});
