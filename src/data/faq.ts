import { featuredProduct } from "./products";
import { siteConfig } from "./site-config";

const { height, width, depth, pairs, levels } = featuredProduct.dimensions;

/**
 * Preguntas frecuentes. Solo datos confirmados por Castora: lo que todavía no está
 * definido (precio, plazo, costo de envío) se responde «te lo confirmamos al cotizar».
 * Cuando Castora pase esos datos, se actualizan aquí y se reflejan en el sitio y en el JSON-LD.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Llega armado?",
    a: "Sí. Lo entregamos armado y revisado, listo para usar. No necesitas herramientas.",
  },
  {
    q: "¿Hacen envíos a mi distrito?",
    a: `Hacemos envíos dentro de ${siteConfig.shipping.coverage}. Cuéntanos tu distrito al cotizar y te confirmamos el costo.`,
  },
  {
    q: "¿En cuánto tiempo llega?",
    a: "Se fabrica a pedido. Te confirmamos la fecha de entrega al cotizar, según el acabado y tu distrito.",
  },
  {
    q: "¿Cuánto mide?",
    a: `${height} cm de alto, ${width} cm de ancho y ${depth} cm de fondo. Guarda hasta ${pairs} pares en ${levels} niveles.`,
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del acabado y del envío a tu distrito. Arma tu consulta y te respondemos por WhatsApp con el precio, sin compromiso.",
  },
];
