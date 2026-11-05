"use client";

import { usePathname } from "next/navigation";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { featuredProduct } from "@/data/products";

/** Botón flotante. En la página de producto se oculta en móvil porque ya hay una barra fija con el pedido. */
export function WhatsAppButton() {
  const pathname = usePathname();
  const onProduct = pathname.startsWith("/productos/");
  const context = pathname.startsWith("/contacto")
    ? ({ kind: "contact" } as const)
    : ({ kind: "availability", productName: featuredProduct.name } as const);

  return (
    <WhatsAppLink
      context={context}
      location="floating"
      icon={false}
      unstyled
      aria-label="Escríbenos por WhatsApp"
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 md:right-6 md:bottom-6 ${
        onProduct ? "hidden md:inline-flex" : "inline-flex"
      }`}
    >
      <WhatsAppIcon size={28} />
    </WhatsAppLink>
  );
}
