"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl, type WhatsAppContext } from "@/lib/whatsapp";
import { buttonClass } from "./Button";
import { WhatsAppIcon } from "./icons";

type Props = {
  context: WhatsAppContext;
  /** Dónde está el botón, para analítica (ej. "home_hero"). */
  location: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
  /** Clase completa para usar un estilo propio en vez del botón. */
  unstyled?: boolean;
  "aria-label"?: string;
  id?: string;
  "aria-hidden"?: boolean;
  tabIndex?: number;
};

export function WhatsAppLink({
  context,
  location,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon = true,
  unstyled = false,
  ...rest
}: Props) {
  const href = whatsappUrl(context);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={unstyled ? className : buttonClass(variant, size, className)}
      onClick={() =>
        trackEvent("whatsapp_click", {
          location,
          context: context.kind,
          variant: context.kind === "product" ? context.variantName : undefined,
        })
      }
      {...rest}
    >
      {icon && <WhatsAppIcon size={size === "lg" ? 19 : 17} />}
      {children}
      {/* Avisa a lectores de pantalla que sale del sitio (con aria-label propio, lo incluye ese texto). */}
      {!rest["aria-label"] && <span className="sr-only"> (abre WhatsApp)</span>}
    </a>
  );
}
