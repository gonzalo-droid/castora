import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { featuredProduct } from "@/data/products";

export function Hero() {
  const p = featuredProduct;
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 pt-8 pb-14 md:pt-10 md:pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-12 lg:pb-24">
        <div>
          <p className="eyebrow animate-fade-up inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            {p.tagline}
          </p>
          <h1 className="animate-fade-up mt-5 text-[3.4rem] leading-[0.95] text-brand-deep [animation-delay:80ms] sm:text-7xl lg:text-[5.5rem]">
            Zapatero <em className="text-brand">Melina</em>
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Organiza tus zapatos con estilo. Diseño funcional y elegante para transformar tus espacios.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <WhatsAppLink context={{ kind: "home" }} location="home_hero" size="lg">
              Pedir por WhatsApp
            </WhatsAppLink>
            <ButtonLink href={`/productos/${p.slug}`} variant="secondary" size="lg">
              Conocer más <ArrowRight size={17} />
            </ButtonLink>
          </div>
          <dl className="animate-fade-up mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 [animation-delay:320ms]">
            {[
              ["14", "pares"],
              ["18 mm", "melamina"],
              [String(p.variants.length), "acabados"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl text-brand-deep">{value}</dd>
                <dd className="text-xs tracking-wide text-muted uppercase">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 top-10 bottom-0 rounded-t-[999px] bg-beige/70 lg:inset-x-10" aria-hidden="true" />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] sm:max-w-[26rem] lg:aspect-[3/4] lg:max-w-[30rem] overflow-hidden rounded-t-[999px] rounded-b-3xl">
            <Image
              src="/products/zapatero-melina/macadamia-ambiente.jpg"
              alt="Zapatero Melina color Macadamia con zapatos ordenados junto a la cama"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
