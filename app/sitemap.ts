import type { MetadataRoute } from "next";
import { SITE_URL, legalPublished } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/for-complexes/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/enquire/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
  if (legalPublished) {
    pages.push(
      { url: `${SITE_URL}/privacy/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
      { url: `${SITE_URL}/terms/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    );
  }
  return pages;
}
