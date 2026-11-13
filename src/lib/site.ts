// Set NEXT_PUBLIC_SITE_URL to the production domain when deploying.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://luma.example.com");

export const siteName = "Luma";
export const siteTitle = "Luma — Practical courses that move you forward";
export const siteDescription =
  "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";
