import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { ArrowRight, Gem, LayoutGrid, Leaf, Ruler } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { featuredProduct } from "@/data/products";

export const metadata = pageMetadata({
  title: "Nosotros: muebles para organizar tu hogar",
  description:
    "Castora es una marca peruana de muebles para organizar el hogar. Diseñamos en Lima piezas funcionales, de líneas limpias, para espacios reales.",
  path: "/nosotros",
});

const values = [
  { icon: Ruler, title: "Funcionalidad", text: "Cada medida responde a un uso concreto. Si no hace la vida más fácil, no entra en el diseño." },
  { icon: Leaf, title: "Estética", text: "Líneas limpias y tonos cálidos que se integran con tu casa en lugar de competir con ella." },
  { icon: Gem, title: "Calidad", text: "Tableros de 18 mm, cantos bien terminados y piezas que se entregan armadas y revisadas." },
  { icon: LayoutGrid, title: "Organización", text: "Creemos que un espacio ordenado se siente más amplio, más tranquilo y más tuyo." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="container-page pt-10 pb-16 text-center md:pt-16 md:pb-24">
        <p className="eyebrow animate-fade-up">Sobre Castora</p>
        <h1 className="animate-fade-up mx-auto mt-5 max-w-3xl text-5xl leading-[1.02] text-brand-deep [animation-delay:80ms] md:text-7xl">
          Diseñamos el orden <em className="text-brand">que tu casa necesita</em>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted [animation-delay:160ms]">
          Somos una marca peruana de muebles y soluciones de organización para el hogar.
        </p>
      </section>

      <section className="container-page grid items-center gap-12 pb-20 md:grid-cols-2 md:pb-28 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-beige/60 md:-inset-6" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/products/zapatero-melina/macadamia-ambiente-2.jpg"
              alt="Zapatero Melina color Macadamia en un dormitorio"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-5 leading-relaxed text-muted">
          <SectionHeading eyebrow="Nuestra historia" title="Empezó con una entrada llena de zapatos" className="mb-8" />
          <p>
            Castora nació en Lima de una escena que se repite en muchas casas: zapatos acumulados junto a la puerta, sin un lugar
            propio. Buscamos un mueble que resolviera eso sin ocupar medio pasillo y que, además, se viera bien. Como no lo
            encontramos, decidimos diseñarlo.
          </p>
          <p>
            Así llegó la Melina, nuestro primer lanzamiento: un zapatero vertical que aprovecha la altura y deja cada par a la
            vista. Es el comienzo de una colección de muebles pensados para ordenar el hogar con calma y buen gusto.
          </p>        
        </Reveal>
      </section>

      <section className="bg-brand-deep py-16 text-cream md:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow !text-beige">Filosofía de diseño</p>
            <blockquote className="mt-6 font-serif text-3xl leading-snug md:text-5xl">
              “Un buen mueble no se nota por lo que ocupa, sino por todo lo que ordena.”
            </blockquote>
            <p className="mx-auto mt-8 max-w-xl text-cream/70">
              Partimos de cómo se usa cada espacio, eliminamos lo que sobra y cuidamos que la forma acompañe a la función.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Lo que nos guía" title="Nuestros valores" align="center" />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="border-t border-line pt-8">
                <Icon size={24} strokeWidth={1.5} className="text-brand" />
                <h3 className="mt-5 text-2xl text-brand-deep">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-sm">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <Reveal className="grid items-center overflow-hidden rounded-[2rem] bg-sand md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src="/products/zapatero-melina/nogal-ambiente.jpg"
                alt="Zapatero Melina color Nogal"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div className="px-6 py-12 md:px-14">
              <SectionHeading eyebrow="Primer lanzamiento" title="Conoce el Zapatero Melina" description="Hasta 16 pares en 46 cm de ancho, en cuatro acabados. Se entrega armado en Lima." />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/productos/zapatero-melina" size="lg">
                  Ver producto <ArrowRight size={17} />
                </ButtonLink>
                <WhatsAppLink
                  context={{ kind: "availability", productName: featuredProduct.name }}
                  location="about_cta"
                  variant="secondary"
                  size="lg"
                >
                  Consultar por WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
