import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (Inter + Plus Jakarta Sans, SIL OFL), loaded through next/font.
const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const jakarta = localFont({
  src: "../fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const title = "Luma — Practical courses that move you forward";
const description =
  "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";

export const metadata: Metadata = {
  metadataBase: new URL("https://luma.example.com"),
  title,
  description,
  applicationName: "Luma",
  keywords: ["online courses", "product design", "technology", "business", "creative skills"],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Luma",
    locale: "en_US",
    images: [{ url: "/images/hero.jpg", width: 900, height: 1100, alt: "Learner studying at a laptop" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
