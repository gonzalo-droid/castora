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

/** Datos de la hoja «Arma tu consulta». Todo es opcional salvo el producto. */
export type QuoteDetails = {
  productName: string;
  finishName?: string;
  district?: string;
  when?: string;
  comment?: string;
  topic?: ContactTopic;
};

/** Arma el mensaje de cotización con lo que el cliente completó en la hoja. */
export function quoteMessage({ productName, finishName, district, when, comment, topic }: QuoteDetails): string {
  const parts = [`Hola Castora, quiero cotizar el ${productName}${finishName ? ` en ${finishName}` : ""}.`];
  if (district?.trim()) parts.push(`Es para ${district.trim()}.`);
  if (when) parts.push(`Lo necesito ${when}.`);
  if (comment?.trim()) parts.push(comment.trim());
  parts.push(
    topic === "delivery"
      ? "¿En cuánto tiempo me llegaría y a qué precio?"
      : topic === "shipping"
        ? "¿Hacen envío a mi distrito y cuánto cuesta?"
        : "¿Me pasan precio y fecha de entrega?",
  );
  return parts.join(" ");
}

