import { jsonLdScript, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { ProductView } from "@/components/product/ProductView";
import { ProductDetails } from "@/components/product/ProductDetails";
import { FinalCta } from "@/components/home/FinalCta";

const product = getProduct("zapatero-melina");

export const metadata = pageMetadata({
  title: "Zapatero Melina, zapatero de melamina en Lima",
  description:
    "Zapatero vertical de melamina Pelíkano de 18 mm: 130 × 46 × 30 cm, 7 niveles, hasta 14 pares. Cinco colores, se entrega armado en Lima. Cotiza por WhatsApp.",
  path: "/productos/zapatero-melina",
  image: { url: "/og-zapatero-melina.jpg", width: 1200, height: 630, alt: "Zapatero Melina en cuatro colores" },
});

export default function ProductPage() {
  if (!product) notFound();

  // Sin precio confirmado no se incluye "offers".
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": `${siteConfig.url}/#organization` },
    material: "Melamina",
    category: product.category,
    url: `${siteConfig.url}/productos/${product.slug}`,
    image: product.variants.flatMap((v) => v.images.map((i) => `${siteConfig.url}${i.src}`)),
    color: product.variants.map((v) => v.name).join(", "),
    height: { "@type": "QuantitativeValue", value: 130, unitCode: "CMT" },
    width: { "@type": "QuantitativeValue", value: 46, unitCode: "CMT" },
    depth: { "@type": "QuantitativeValue", value: 30, unitCode: "CMT" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <div className="container-page pt-4 pb-16 md:pb-24">
        <nav aria-label="Ruta" className="mb-6 text-sm text-muted md:mb-8">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brand-deep">
                Inicio
              </Link>
            </li>
            <ChevronRight size={14} aria-hidden="true" />
            <li aria-current="page" className="text-brand-deep">
              {product.name}
            </li>
          </ol>
        </nav>
        <ProductView product={product} />
      </div>
      <ProductDetails product={product} />
      <FinalCta
        title="¿Tienes dudas sobre el Zapatero Melina?"
        text="Escríbenos y te ayudamos a elegir el acabado ideal para tu espacio."
        button="Consultar por WhatsApp"
        context={{ kind: "availability", productName: product.name }}
        location="product_final_cta"
      />
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
