export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN_LENGTH = 10;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Your name should have at least 2 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email, like name@example.com.";

  if (!message) errors.message = "Please tell us how we can help.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = `Please add a bit more detail (at least ${MESSAGE_MIN_LENGTH} characters).`;

  return errors;
}
