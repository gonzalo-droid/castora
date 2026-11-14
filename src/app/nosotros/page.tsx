import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteButton } from "@/components/quote/QuoteButton";

export const metadata = pageMetadata({
  title: "Nosotros: muebles para organizar tu hogar",
  description:
    "Castora es una marca peruana de muebles para organizar el hogar. Diseñamos en Lima piezas funcionales, de líneas limpias, para espacios reales.",
  path: "/nosotros",
});

// «Del tablero a tu casa»: es una secuencia real, por eso va numerada.
// Todo el texto sale de lo ya aprobado por Castora (antes, la sección de valores).
const process = [
  { title: "Diseño", text: "Cada medida responde a un uso concreto: si no hace la vida más fácil, no entra en el diseño." },
  { title: "Tablero de 18 mm", text: "Melamina Pelíkano con cantos bien terminados, en tonos cálidos que se integran con tu casa." },
  { title: "Armado y revisión", text: "Cada pieza se arma y se revisa antes de salir." },
  { title: "Entrega en Lima", text: "Llega a tu casa armada, lista para usar." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="container-page pt-10 pb-16 text-center md:pt-16 md:pb-24">
        <h1 className="animate-fade-up mx-auto mt-5 max-w-3xl text-5xl leading-[1.02] text-brand-deep [animation-delay:80ms] md:text-7xl">
          Diseñamos el orden que tu casa necesita
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
          <SectionHeading title="Empezó con una entrada llena de zapatos" className="mb-8" />
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

      <section aria-labelledby="proceso" className="border-y border-line bg-sand py-16 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <h2 id="proceso" className="text-4xl leading-tight text-brand-deep md:text-5xl">
              Del tablero a tu casa
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              Un buen mueble no se nota por lo que ocupa, sino por todo lo que ordena. Así llega la Melina a tu casa.
            </p>
          </Reveal>
          <ol className="border-l border-brand/40">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="relative pb-8 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[0.4rem] h-3 w-3 rounded-full bg-brand ring-4 ring-sand"
                />
                <h3 className="font-sans text-lg font-semibold text-brand-deep">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
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
              <SectionHeading title="Conoce el Zapatero Melina" description="Hasta 16 pares en 46 cm de ancho, en cuatro acabados. Se entrega armado en Lima." />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/productos/zapatero-melina" size="lg">
                  Ver producto 
                </ButtonLink>
                <QuoteButton location="about_cta" variant="secondary" size="lg">
                  Cotizar
                </QuoteButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
