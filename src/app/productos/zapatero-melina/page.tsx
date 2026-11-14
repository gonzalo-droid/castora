import { jsonLdScript, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { ProductView } from "@/components/product/ProductView";
import { ProductDetails } from "@/components/product/ProductDetails";
import { HowToOrder } from "@/components/home/HowToOrder";
import { BeforeOrder } from "@/components/home/BeforeOrder";
import { faqs } from "@/data/faq";

const product = getProduct("zapatero-melina");

export const metadata = pageMetadata({
  title: "Zapatero Melina, zapatero de melamina en Lima",
  description:
    "Zapatero o zapatera vertical de melamina de 18 mm: 130 × 46 × 30 cm, 7 niveles, hasta 16 pares. Cuatro colores, llega armado en Lima. Cotiza por WhatsApp.",
  path: "/productos/zapatero-melina",
  image: { url: "/og-zapatero-melina.jpg", width: 1200, height: 630, alt: "Zapatero Melina en cuatro colores" },
});

export default function ProductPage() {
  if (!product) notFound();

  const url = `${siteConfig.url}/productos/${product.slug}`;
  const { dimensions: d } = product;
  // Sin precio confirmado no se incluye "offers".
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.shortDescription,
        brand: { "@type": "Brand", name: siteConfig.name },
        manufacturer: { "@id": `${siteConfig.url}/#organization` },
        material: "Melamina",
        category: product.category,
        url,
        image: product.variants.flatMap((v) => v.images.map((i) => `${siteConfig.url}${i.src}`)),
        color: product.variants.map((v) => v.name).join(", "),
        height: { "@type": "QuantitativeValue", value: d.height, unitCode: "CMT" },
        width: { "@type": "QuantitativeValue", value: d.width, unitCode: "CMT" },
        depth: { "@type": "QuantitativeValue", value: d.depth, unitCode: "CMT" },
      },
      // Las mismas preguntas y respuestas que se ven en «Antes de pedir».
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      // Misma ruta que las migas visibles ("Inicio › Zapatero Melina").
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: product.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <ProductView
        product={product}
        breadcrumb={
          <nav aria-label="Ruta" className="mb-6 text-sm text-muted md:mb-8">
          <ol className="flex items-center gap-1.5">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-brand-deep">
                Inicio
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
            </li>
            <li aria-current="page" className="text-brand-deep">
              {product.name}
            </li>
          </ol>
          </nav>
        }
      />
      <ProductDetails product={product} />
      <HowToOrder location="product_steps" />
      <BeforeOrder location="product_faq" />
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
