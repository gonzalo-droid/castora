import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { featuredProduct as p } from "@/data/products";
import { siteConfig } from "@/data/site-config";

// Es una secuencia real, por eso lleva números.
const steps = [
  { title: "Elige el acabado", text: p.variants.map((v) => v.name).join(", ").replace(/, ([^,]*)$/, " o $1") + "." },
  { title: "Arma tu consulta", text: "Cuéntanos tu distrito y para cuándo lo necesitas. Te enviamos precio y fecha por WhatsApp." },
  { title: "Lo recibes armado", text: `Listo para usar, con envío en ${siteConfig.shipping.coverage}.` },
];

/** «Así se pide»: los tres pasos del pedido, con el botón que abre la hoja de consulta. */
export function HowToOrder({ location }: { location: string }) {
  return (
    <section aria-labelledby="asi-se-pide" className="border-y border-line bg-sand py-16 md:py-24">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="asi-se-pide" className="text-4xl leading-tight text-brand-deep md:text-5xl">
            Así se pide
          </h2>
          <QuoteButton location={location} size="lg" className="self-start md:self-auto">
            Arma tu consulta
          </QuoteButton>
        </Reveal>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand font-serif text-xl text-brand-ink"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-sans text-lg font-semibold text-brand-deep">{s.title}</h3>
                <p className="mt-1 text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
