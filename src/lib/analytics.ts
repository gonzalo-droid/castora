import { track } from "@vercel/analytics";

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Registra un evento en Vercel Web Analytics. También lo deja en
 * window.dataLayer / gtag por si más adelante se agrega GA4 o GTM.
 * Nota: los eventos personalizados en Vercel requieren el plan Pro;
 * en Hobby solo se ven las visitas.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) as Record<
    string,
    string | number
  >;
  track(name, clean);
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
}
