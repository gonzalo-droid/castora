/**
 * Datos comerciales centralizados.
 * Lo marcado como PROVISIONAL debe confirmarse con Castora antes de publicar.
 */
export const siteConfig = {
  name: "Castora Perú",
  shortName: "Castora",
  description:
    "Muebles y soluciones de organización para el hogar, diseñados en Perú. Conoce el Zapatero Melina en melamina de 18 mm.",
  // URL pública completa, incluido el basePath de GitHub Pages (/castora).
  // Se define en el workflow de deploy; con dominio propio será https://castorape.com.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gonzalo-lozg.me/castora").replace(/\/$/, ""),
  locale: "es_PE",

  whatsapp: {
    // Formato internacional sin "+" ni espacios (Perú = 51).
    number: "51941808373",
    display: "+51 941 808 373",
  },

  // Sin correo por ahora: en null se oculta en todo el sitio.
  // Para mostrarlo, poner el real, ej. "hola@castora.pe".
  email: null as string | null,

  social: {
    instagram: "https://www.instagram.com/castora.peru/",
    // En null se oculta en todo el sitio.
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
