"use client";

import type { ReactNode } from "react";
import { featuredProduct } from "@/data/products";
import { quoteMessage, whatsappUrl, type ContactTopic } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { useQuote } from "./QuoteProvider";

type Props = {
  variantId?: string;
  topic?: ContactTopic;
  location: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  /** Clase completa para un estilo propio en vez del botón. */
  unstyled?: boolean;
};

/**
 * Botón «Cotizar»: abre la hoja «Arma tu consulta». Es un enlace real a WhatsApp,
 * así que sin JS (o fuera del provider) sigue funcionando.
 */
export function QuoteButton({ variantId, topic, location, children, variant = "primary", size = "md", className = "", unstyled }: Props) {
  const quote = useQuote();
  const finish = featuredProduct.variants.find((v) => v.id === variantId);
  const href = whatsappUrl(quoteMessage({ productName: featuredProduct.name, finishName: finish?.name, topic }));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      onClick={(e) => {
        if (!quote) return;
        e.preventDefault();
        quote.openQuote({ variantId, topic, location });
      }}
      className={unstyled ? className : buttonClass(variant, size, className)}
    >
      {children}
    </a>
  );
}
