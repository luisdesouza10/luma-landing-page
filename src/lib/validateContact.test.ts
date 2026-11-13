import { describe, expect, it } from "vitest";
import { validateContact } from "./validateContact";

const valid = { name: "Maya Chen", email: "maya@example.com", message: "Which course should I take?" };

describe("validateContact", () => {
  it("returns no errors for valid input", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("ignores surrounding whitespace", () => {
    expect(validateContact({ name: "   ", email: " ", message: "  " })).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email address.",
      message: "Please tell us how we can help.",
    });
  });

  it.each(["maya", "maya@", "maya@example", "maya example@test.com", "@example.com"])(
    "rejects the malformed email %s",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toMatch(/valid email/);
    },
  );

  it("rejects one-letter names and very short messages", () => {
    const errors = validateContact({ ...valid, name: "M", message: "Hello" });
    expect(errors.name).toMatch(/at least 2/);
    expect(errors.message).toMatch(/at least 10/);
  });
});
