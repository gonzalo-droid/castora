export type Availability = "in_stock" | "made_to_order" | "out_of_stock";

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "En stock",
  made_to_order: "A pedido",
  out_of_stock: "Agotado",
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Foto en ambiente (con zapatos, decoración) en vez de foto de catálogo. */
  lifestyle?: boolean;
};

export type ProductVariant = {
  id: string;
  name: string;
  /** Color de muestra para el selector. */
  swatch: string;
  images: ProductImage[];
  availability: Availability;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string;
  description: string[];
  /** null = no se publica precio, se cotiza por WhatsApp. */
  price: number | null;
  currency: "PEN";
  variants: ProductVariant[];
  defaultVariantId: string;
  specs: ProductSpec[];
  highlights: string[];
  delivery: string[];
};

const dir = "/products/zapatero-melina";
const hd = { width: 1086, height: 1448 };

export const products: Product[] = [
  {
    id: "zapatero-melina",
    slug: "zapatero-melina",
    name: "Zapatero Melina",
    category: "Organización · Zapateros",
    tagline: "Primer lanzamiento",
    shortDescription:
      "Zapatero vertical de melamina con estantes asimétricos. Ordena hasta 14 pares en muy poco espacio.",
    description: [
      "Melina nace para ese rincón de la entrada o del dormitorio donde los zapatos siempre terminan amontonados. Su estructura vertical aprovecha la altura y ocupa muy poco espacio en el piso.",
      "Los estantes alternados a cada lado de la columna central dejan cada par a la vista y fácil de tomar. La repisa superior, con bordes laterales, sirve para llaves, plantas o accesorios.",
    ],
    price: null,
    currency: "PEN",
    defaultVariantId: "macadamia",
    variants: [
      {
        id: "macadamia",
        name: "Macadamia",
        swatch: "#B8A48C",
        availability: "made_to_order",
        images: [
          { src: `${dir}/macadamia-ambiente.jpg`, alt: "Zapatero Melina color Macadamia con zapatos junto a la cama", width: 1051, height: 1400, lifestyle: true },
          { src: `${dir}/macadamia-ambiente-2.jpg`, alt: "Zapatero Melina color Macadamia visto de lado en un dormitorio", width: 1051, height: 1399, lifestyle: true },
          { src: `${dir}/macadamia-ambiente-3.jpg`, alt: "Zapatero Melina color Macadamia en diagonal, con zapatos ordenados", width: 1031, height: 1372, lifestyle: true },
        ],
      },
      {
        id: "nogal",
        name: "Nogal",
        swatch: "#5B4637",
        availability: "made_to_order",
        images: [
          { src: `${dir}/nogal.jpg`, alt: "Zapatero Melina color Nogal", ...hd },
          { src: `${dir}/nogal-ambiente.jpg`, alt: "Zapatero Melina color Nogal con zapatos", ...hd, lifestyle: true },
        ],
      },
      {
        id: "roble",
        name: "Roble Natural",
        swatch: "#D4B68A",
        availability: "made_to_order",
        images: [
          { src: `${dir}/roble.jpg`, alt: "Zapatero Melina color Roble Natural", ...hd },
          { src: `${dir}/roble-medidas.jpg`, alt: "Medidas del Zapatero Melina: 130 cm de alto, 46 cm de ancho y 30 cm de fondo", ...hd },
        ],
      },
      {
        id: "blanco",
        name: "Blanco",
        swatch: "#F5F4F1",
        availability: "made_to_order",
        images: [
          { src: `${dir}/blanco.jpg`, alt: "Zapatero Melina color Blanco", ...hd },
          { src: `${dir}/blanco-medidas.jpg`, alt: "Zapatero Melina color Blanco con su altura de 130 cm", ...hd },
        ],
      },
      {
        id: "blanco-veteado",
        name: "Blanco Veteado",
        swatch: "#ECE5D9",
        availability: "made_to_order",
        images: [{ src: `${dir}/blanco-veteado.png`, alt: "Zapatero Melina color Blanco Veteado", width: 549, height: 840 }],
      },
    ],
    specs: [
      { label: "Material", value: "Melamina Pelíkano de 18 mm" },
      { label: "Medidas", value: "130 × 46 × 30 cm (alto × ancho × fondo)" },
      { label: "Niveles", value: "7 niveles con estantes asimétricos" },
      { label: "Capacidad", value: "Hasta 14 pares" },
      { label: "Diseño", value: "Vertical y abierto, con repisa superior" },
      { label: "Entrega", value: "Armado, listo para usar" },
    ],
    highlights: [
      "Melamina Pelíkano de 18 mm",
      "Hasta 14 pares en 46 cm de ancho",
      "Se entrega armado",
      "Envíos en Lima",
    ],
    delivery: [
      "Se entrega armado, no necesitas herramientas.",
      "Envíos dentro de Lima Metropolitana.",
      "Se fabrica a pedido: coordinamos el tiempo de entrega por WhatsApp.",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getVariant(product: Product, variantId?: string): ProductVariant {
  return (
    product.variants.find((v) => v.id === variantId) ??
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0]
  );
}

export const featuredProduct = products[0];
