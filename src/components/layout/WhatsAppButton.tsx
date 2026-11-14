"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { featuredProduct } from "@/data/products";

/**
 * Botón flotante de WhatsApp.
 * - Aparece al pasar el primer pantallazo: arriba ya están los botones del hero
 *   y así no tapa la foto principal.
 * - En la página de producto se oculta en móvil porque ya está la barra "Cotizar".
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const onProduct = pathname.startsWith("/productos/");
  const context = pathname.startsWith("/contacto")
    ? ({ kind: "contact" } as const)
    : ({ kind: "availability", productName: featuredProduct.name } as const);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <WhatsAppLink
      context={context}
      location="floating"
      icon={false}
      unstyled
      aria-label="Escríbenos por WhatsApp (abre WhatsApp)"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-[opacity,transform] duration-300 hover:scale-105 md:right-6 md:bottom-6 ${
        onProduct ? "hidden md:inline-flex" : "inline-flex"
      } ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <WhatsAppIcon size={28} />
    </WhatsAppLink>
  );
}
