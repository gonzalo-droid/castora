import { availabilityLabel, products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

/**
 * /llms.txt: resumen en Markdown para asistentes de IA (formato llmstxt.org).
 * Se arma con los mismos datos del sitio, así que se actualiza solo al cambiar
 * productos, contacto o redes. Se prerenderiza en el build (no usa datos por request).
 */
export function GET() {
  const { name, url, whatsapp, social, email, shipping } = siteConfig;

  const productBlocks = products.map((p) => {
    const variantNames = p.variants.map((v) => v.name).join(", ");
    const availability = [...new Set(p.variants.map((v) => availabilityLabel[v.availability]))].join(" / ");
    const price = p.price !== null ? `S/ ${p.price} (${p.currency})` : "A cotizar por WhatsApp (no se publica precio)";
    const { height, width, depth, levels, pairs } = p.dimensions;
    return [
      `### ${p.name}`,
      "",
      `${p.shortDescription} También se le conoce como zapatera.`,
      "",
      `- Página: ${url}/productos/${p.slug}`,
      `- Medidas: ${height} × ${width} × ${depth} cm (alto × ancho × fondo)`,
      `- Capacidad: hasta ${pairs} pares en ${levels} niveles`,
      ...p.specs.filter((s) => ["Material", "Diseño"].includes(s.label)).map((s) => `- ${s.label}: ${s.value}`),
      `- Acabados: ${variantNames}`,
      `- Disponibilidad: ${availability}`,
      `- Precio: ${price}`,
      ...p.delivery.map((d) => `- ${d}`),
    ].join("\n");
  });

  const channels = [
    `- WhatsApp (canal principal para cotizar y comprar): ${whatsapp.display} · https://wa.me/${whatsapp.number}`,
    `- Instagram: ${social.instagram}`,
    ...(social.tiktok ? [`- TikTok: ${social.tiktok}`] : []),
    ...(email ? [`- Correo: ${email}`] : []),
  ];

  const body = [
    `# ${name}`,
    "",
    `> ${name} es una marca peruana de muebles y soluciones de organización para el hogar, con sede en Lima. Su primer producto es el ${products[0].name}. Las compras se coordinan por WhatsApp.`,
    "",
    "## Datos clave",
    "",
    `- Cobertura de envío: ${shipping.coverage}. ${shipping.note}`,
    "- Cómo comprar: elegir el producto y el acabado en la web y escribir por WhatsApp; Castora responde con precio y fecha de entrega.",
    "- No hay tienda online ni pago en la web.",
    "",
    "## Productos",
    "",
    ...productBlocks.flatMap((b) => [b, ""]),
    "## Contacto",
    "",
    ...channels,
    "",
    "## Páginas",
    "",
    `- [Inicio](${url}): presentación de la marca y del producto destacado.`,
    ...products.map((p) => `- [${p.name}](${url}/productos/${p.slug}): fotos, acabados, medidas y especificaciones.`),
    `- [Nosotros](${url}/nosotros): historia y valores de la marca.`,
    `- [Contacto](${url}/contacto): WhatsApp, redes y consultas frecuentes con mensaje listo.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
