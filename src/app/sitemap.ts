import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl.href, changeFrequency: "monthly", priority: 1 },
    { url: new URL("/videos", siteUrl).href, changeFrequency: "monthly", priority: 0.5 },
  ];
}
