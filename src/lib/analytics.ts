type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Registra un evento en window.dataLayer y gtag si existen. Hoy el sitio no tiene
 * analítica (GitHub Pages no soporta Vercel Analytics): los eventos quedan listos
 * para cuando se agregue GA4, GTM u otra herramienta.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
}
