/**
 * Datos comerciales centralizados.
 * Lo marcado como PROVISIONAL debe confirmarse con Castora antes de publicar.
 */
export const siteConfig = {
  name: "Castora Perú",
  shortName: "Castora",
  description:
    "Muebles y soluciones de organización para el hogar, diseñados en Perú. Conoce el Zapatero Melina en melamina de 18 mm.",
  // Sin dominio todavía: se toma de la variable de entorno en Vercel.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://castora-alpha.vercel.app").replace(/\/$/, ""),
  locale: "es_PE",

  whatsapp: {
    // Formato internacional sin "+" ni espacios (Perú = 51).
    number: "51942862050",
    display: "+51 942 862 050",
  },

  // PROVISIONAL: correo de ejemplo, reemplazar por el real.
  email: "hola@castora.pe",

  social: {
    instagram: "https://www.instagram.com/castora.peru/",
    // PROVISIONAL: cuenta de ejemplo. Dejar en null para ocultarla.
    tiktok: "https://www.tiktok.com/@castora.peru" as string | null,
  },

  shipping: {
    coverage: "Lima Metropolitana",
    note: "Por ahora realizamos envíos solo dentro de Lima.",
  },

  nav: [
    { label: "Inicio", href: "/" },
    { label: "Zapatero Melina", href: "/productos/zapatero-melina" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
