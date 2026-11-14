import { jsonLdScript, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { HowItsMade } from "@/components/home/HowItsMade";
import { HowToOrder } from "@/components/home/HowToOrder";
import { BeforeOrder } from "@/components/home/BeforeOrder";
import { AboutTeaser } from "@/components/home/AboutTeaser";

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
      <HowItsMade />
      <HowToOrder location="home_steps" />
      <BeforeOrder location="home_faq" />
      <AboutTeaser />
    </>
  );
}
