"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FinishPicker } from "@/components/ui/FinishPicker";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { featuredProduct } from "@/data/products";
import { trackEvent } from "@/lib/analytics";

const p = featuredProduct;
// Una foto por acabado: la de ambiente si existe, si no la primera de estudio.
const finishes = p.variants.map((v) => ({ ...v, photo: v.images.find((i) => i.lifestyle) ?? v.images[0] }));
const { pairs, width } = p.dimensions;
const intro = "El zapatero vertical que aprovecha la altura. Elige el acabado que va con tu espacio y te lo llevamos armado en Lima.";

/**
 * Hero: el dato principal como titular ("16 pares en 46 cm") y un selector de
 * acabado que cambia la foto y el mensaje de WhatsApp.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  // Solo la primera foto carga de inicio; las demás se piden después para no frenar el LCP.
  const [preload, setPreload] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPreload(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  const current = finishes[index];

  const select = (i: number) => {
    setIndex(i);
    setPreload(true);
    trackEvent("select_variant", { product: p.id, variant: finishes[i].id, location: "home_hero" });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid gap-x-16 gap-y-6 pt-6 pb-14 sm:gap-y-8 sm:pt-8 md:pt-10 md:pb-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:pt-12 lg:pb-24">
        {/* Titular y texto (en móvil van antes de la foto) */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 className="text-brand-deep">
            <span className="eyebrow animate-fade-up inline-flex items-center gap-3 font-sans">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {p.name}
            </span>{" "}
            <span className="animate-fade-up mt-5 block text-[4.6rem] leading-[0.86] tracking-[-0.02em] [animation-delay:80ms] sm:text-8xl lg:text-[7.5rem]">
              {pairs} pares
            </span>{" "}
            <em className="animate-fade-up mt-2 block text-[2.6rem] leading-[0.95] text-brand [animation-delay:120ms] sm:text-6xl lg:text-[4.1rem]">
              en {width} cm de ancho.
            </em>
          </h1>
          {/* En escritorio el texto va bajo el titular; en móvil, después de los botones (ver abajo). */}
          <p className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-muted [animation-delay:180ms] max-lg:hidden">
            {intro}
          </p>
        </div>

        {/* Foto del acabado elegido */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden rounded-[1.75rem] bg-sand lg:aspect-[4/5]">
            {finishes.map((f, i) =>
              i === index || preload ? (
                <Image
                  key={f.id}
                  src={f.photo.src}
                  alt={i === index ? f.photo.alt : ""}
                  aria-hidden={i !== index}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 480px, calc(100vw - 2.5rem)"
                  className={`object-cover object-[50%_35%] transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
                />
              ) : null,
            )}
            <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-brand-deep">
              {current.name}
            </span>
          </div>
        </div>

        {/* Selector de acabado y botones */}
        <div className="lg:col-start-1 lg:row-start-2">
          <FinishPicker
            finishes={finishes}
            value={current.id}
            onChange={(id) => select(finishes.findIndex((f) => f.id === id))}
            className="animate-fade-up [animation-delay:240ms]"
          />

          <div className="animate-fade-up mt-7 flex flex-col gap-3 [animation-delay:300ms] sm:flex-row">
            <WhatsAppLink
              context={{ kind: "product", productName: p.name, variantName: current.name }}
              location="home_hero"
              size="lg"
            >
              Pedir {current.name} por WhatsApp
            </WhatsAppLink>
            <ButtonLink href={`/productos/${p.slug}#${current.id}`} variant="secondary" size="lg">
              Ver detalles <ArrowRight size={17} />
            </ButtonLink>
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted lg:hidden">{intro}</p>

          <ul className="animate-fade-up mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted [animation-delay:360ms]">
            {["Llega armado", "Envío en Lima", "Fabricado a pedido"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
