import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  keywords: ["online courses", "product design", "technology", "business", "creative skills"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": new URL("/#organization", siteUrl).href,
      name: siteName,
      url: siteUrl.href,
      logo: new URL("/images/logo.svg", siteUrl).href,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": new URL("/#website", siteUrl).href,
      name: siteName,
      url: siteUrl.href,
      inLanguage: "en",
      publisher: { "@id": new URL("/#organization", siteUrl).href },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
