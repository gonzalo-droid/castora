type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Registra un evento. Hoy no hay analítica instalada: el evento queda en
 * window.dataLayer y se enviará solo cuando se agregue GA4 o GTM.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
}
