import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

// Fecha del último cambio de contenido de cada página. Actualízala cuando cambie el texto
// o las fotos de esa página (no hace falta por cambios de diseño o de código).
const updated = {
  home: "2026-11-14",
  product: "2026-11-14",
  nosotros: "2026-11-14",
  contacto: "2026-11-13",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, lastModified: updated.home, changeFrequency: "monthly", priority: 1 },
    ...products.map((p) => ({
      url: `${base}/productos/${p.slug}`,
      lastModified: updated.product,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${base}/nosotros`, lastModified: updated.nosotros, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contacto`, lastModified: updated.contacto, changeFrequency: "yearly", priority: 0.6 },
  ];
}
