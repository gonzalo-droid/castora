import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

const lastModified = "2026-11-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    ...products.map((p) => ({
      url: `${base}/productos/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${base}/nosotros`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contacto`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
