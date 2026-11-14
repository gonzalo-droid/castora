"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteButton } from "@/components/quote/QuoteButton";
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

  // Grupo de radios: una sola parada de Tab; flechas, Inicio y Fin cambian el acabado.
  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = -1;
    if (e.key in steps) next = (index + steps[e.key] + finishes.length) % finishes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = finishes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
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
          <fieldset className="animate-fade-up [animation-delay:240ms]">
            <legend className="text-sm text-muted">
              Acabado: <span className="font-semibold text-brand-deep">{current.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-3" role="radiogroup" aria-label="Acabado" onKeyDown={onKey}>
              {finishes.map((f, i) => {
                const selected = i === index;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className="group flex w-[4.75rem] flex-col items-center gap-2 rounded-xl py-1 text-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-12 w-12 rounded-full ring-offset-[3px] ring-offset-cream transition ${
                        selected ? "ring-2 ring-brand" : "ring-1 ring-black/45 group-hover:ring-brand"
                      }`}
                      style={{ background: f.swatch }}
                    />
                    <span className={`text-xs leading-tight ${selected ? "font-semibold text-brand-deep" : "text-muted group-hover:text-brand-deep"}`}>
                      {f.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="animate-fade-up mt-7 flex flex-col gap-3 [animation-delay:300ms] sm:flex-row">
            <QuoteButton variantId={current.id} location="home_hero" size="lg">
              Cotizar en {current.name}
            </QuoteButton>
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
