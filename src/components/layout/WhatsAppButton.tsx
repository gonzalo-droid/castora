"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { featuredProduct } from "@/data/products";

/**
 * Botón flotante de WhatsApp.
 * - Aparece al pasar el primer pantallazo: arriba ya están los botones del hero.
 * - No se muestra en /contacto (toda la página ya es WhatsApp) ni en móvil en el
 *   producto (ya está la barra "Cotizar").
 * - En móvil se esconde al bajar (mientras se lee, para no tapar el final de las
 *   líneas), vuelve al subir, y se esconde si otro botón de WhatsApp está a la vista.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const onProduct = pathname.startsWith("/productos/");
  const onContact = pathname.startsWith("/contacto");
  const context = { kind: "availability", productName: featuredProduct.name } as const;

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const self = document.getElementById("whatsapp-flotante");
    // Otros botones de WhatsApp a la vista (el del menú lateral está fuera de pantalla si está cerrado).
    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      }
      onScroll();
    });
    document.querySelectorAll('main a[href*="wa.me"]').forEach((a) => a !== self && io.observe(a));

    let frame = 0;
    let lastY = window.scrollY;
    let goingUp = false;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        goingUp = y < lastY;
        lastY = y;
      }
      const pastHero = y > window.innerHeight * 0.6;
      setVisible(mobile.matches ? pastHero && goingUp && inView.size === 0 : pastHero);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (onContact) return null;

  return (
    <WhatsAppLink
      context={context}
      id="whatsapp-flotante"
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
