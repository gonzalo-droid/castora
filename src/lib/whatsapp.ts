import { siteConfig } from "@/data/site-config";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "home" }
  | { kind: "product"; productName: string; variantName?: string }
  | { kind: "availability"; productName: string }
  | { kind: "contact" }
  | { kind: "topic"; topic: ContactTopic; productName: string };

/** Temas de la página de contacto: cada uno abre WhatsApp con su mensaje listo. */
export type ContactTopic = "quote" | "delivery" | "shipping" | "other";

export function whatsappMessage(ctx: WhatsAppContext): string {
  switch (ctx.kind) {
    case "home":
      return "Hola, estoy interesado en el Zapatero Melina. ¿Podrían brindarme información sobre precio, colores y envío?";
    case "product":
      return `Hola, estoy interesado en el ${ctx.productName}${
        ctx.variantName ? ` en color ${ctx.variantName}` : ""
      }. ¿Podrían brindarme información sobre precio, disponibilidad y envío?`;
    case "availability":
      return `Hola, quisiera consultar la disponibilidad del ${ctx.productName}. ¿Qué colores tienen y en cuánto tiempo lo entregan?`;
    case "contact":
      return "Hola Castora, quisiera recibir más información sobre sus productos.";
    case "topic":
      return {
        quote: `Hola, quisiera cotizar el ${ctx.productName}. Me interesa el acabado: `,
        delivery: `Hola, quisiera saber en cuánto tiempo me llegaría el ${ctx.productName} si lo pido hoy.`,
        shipping: `Hola, ¿hacen envío del ${ctx.productName} a mi distrito? Estoy en: `,
        other: "Hola Castora, tengo una consulta: ",
      }[ctx.topic];
    default:
      return "Hola Castora, quisiera más información.";
  }
}

export function whatsappUrl(ctxOrText: WhatsAppContext | string = { kind: "general" }): string {
  const text = typeof ctxOrText === "string" ? ctxOrText : whatsappMessage(ctxOrText);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
