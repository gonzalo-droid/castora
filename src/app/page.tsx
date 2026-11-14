import { jsonLdScript, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({
  title: "Zapatero de melamina en Lima · Zapatero Melina | Castora Perú",
  description:
    "Zapatero Melina de Castora: zapatero o zapatera vertical de melamina de 18 mm para 16 pares, en cuatro colores. Llega armado en Lima. Cotiza por WhatsApp.",
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())} />
      <Hero />
      <Benefits />
      <FeaturedProduct />
      <AboutTeaser />
      <FinalCta />
    </>
  );
}
