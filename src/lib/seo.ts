import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

type OgImage = { url: string; width: number; height: number; alt: string };

export const defaultOgImage: OgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Zapatero Melina de Castora",
};

type PageMetaInput = {
  /** Título de la página (se le agrega " · Castora Perú" salvo que absolute sea true). */
  title: string;
  description: string;
  path: string;
  image?: OgImage;
  absolute?: boolean;
};

/** Metadata completa por página: canonical, Open Graph (con og:url) y Twitter. */
export function pageMetadata({ title, description, path, image = defaultOgImage, absolute = false }: PageMetaInput): Metadata {
  const fullTitle = absolute ? title : `${title} · ${siteConfig.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Datos de marca para Google (Organization + WebSite). */
export function organizationJsonLd() {
  const url = siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url,
        logo: `${url}/brand/logo-brown.png`,
        description: siteConfig.description,
        sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok].filter(Boolean),
        areaServed: { "@type": "City", name: "Lima" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${siteConfig.whatsapp.number}`,
          contactType: "sales",
          areaServed: "PE",
          availableLanguage: "es",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        inLanguage: "es-PE",
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
