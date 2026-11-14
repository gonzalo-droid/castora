import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/quote/QuoteButton";

/** «Antes de pedir»: preguntas frecuentes con respuestas confirmadas y el botón de cotizar. */
export function BeforeOrder({ location }: { location: string }) {
  return (
    <section aria-labelledby="antes-de-pedir" className="py-16 md:py-24">
      <div className="container-page grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <h2 id="antes-de-pedir" className="text-4xl leading-tight text-brand-deep md:text-5xl">
            Antes de pedir
          </h2>
          <p className="mt-4 max-w-sm text-muted">¿Tu duda no está aquí? Escríbenos y te respondemos por WhatsApp.</p>
          <QuoteButton location={location} variant="secondary" size="lg" className="mt-7">
            Arma tu consulta
          </QuoteButton>
        </Reveal>
        <Reveal delay={120} className="border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-brand-deep [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={20} aria-hidden="true" className="shrink-0 text-brand transition-transform group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <p className="pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
