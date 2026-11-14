"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { Check, Clock, MapPin, Package } from "lucide-react";
import { availabilityLabel, type Product } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { ProductGallery, type GalleryItem } from "./ProductGallery";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);
}

export function ProductView({ product, breadcrumb }: { product: Product; breadcrumb?: ReactNode }) {
  const items: GalleryItem[] = useMemo(
    () => product.variants.flatMap((v) => v.images.map((img) => ({ ...img, variantId: v.id, variantName: v.name }))),
    [product],
  );

  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [imageIndex, setImageIndex] = useState(() => Math.max(0, items.findIndex((i) => i.variantId === product.defaultVariantId)));

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const selectVariant = (id: string, track = true) => {
    setVariantId(id);
    const idx = items.findIndex((i) => i.variantId === id);
    if (idx >= 0) setImageIndex(idx);
    history.replaceState(null, "", `#${id}`);
    if (track) trackEvent("select_variant", { product: product.id, variant: id });
  };

  // Permite enlazar directo a un color: /productos/zapatero-melina#nogal
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (product.variants.some((v) => v.id === id)) selectVariant(id, false);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectImage = (i: number) => {
    setImageIndex(i);
    const id = items[i]?.variantId;
    if (id && id !== variantId) {
      setVariantId(id);
      history.replaceState(null, "", `#${id}`);
    }
  };


  // Selector de acabado: una sola parada de Tab; flechas, Inicio y Fin cambian el color.
  const onSwatchKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const variants = product.variants;
    const current = variants.findIndex((v) => v.id === variant.id);
    let next = -1;
    if (e.key in steps) next = (current + steps[e.key] + variants.length) % variants.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = variants.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectVariant(variants[next].id);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
  };


  // La barra fija de móvil aparece solo después de pasar el botón principal:
  // antes tapaba las miniaturas de la galería y repetía un CTA aún no visto.
  // Se oculta al llegar al footer para no tapar su última línea.
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const el = mainCtaRef.current;
    if (!el) return;
    // Scroll en vez de IntersectionObserver: un salto directo arriba (tocar la
    // barra de estado en iPhone) no cruza el botón y el observer no se entera.
    let frame = 0;
    const update = () => {
      frame = 0;
      // Visible entre el botón principal y el footer (que ya tiene WhatsApp).
      const footer = document.querySelector("footer");
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShowBar(el.getBoundingClientRect().bottom < 0 && !footerInView);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* La parte superior toma el tinte del acabado elegido, como en el hero. */}
      <section
        className="bg-[var(--tint)] transition-colors duration-500 motion-reduce:transition-none"
        style={{ "--tint": variant.tint } as CSSProperties}
      >
        <div className="container-page pt-4 pb-16 md:pb-24">
          {breadcrumb}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <ProductGallery items={items} activeIndex={imageIndex} onSelect={onSelectImage} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="mt-4 text-5xl leading-none text-brand-deep md:text-6xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{product.shortDescription}</p>

          <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-line py-5">
            <span className="font-serif text-3xl text-brand-deep">
              {product.price !== null ? formatPrice(product.price) : "Precio a cotizar"}
            </span>
            {product.price === null && <span className="text-sm text-muted">Te respondemos por WhatsApp</span>}
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm text-muted">
              Acabado: <span className="font-semibold text-brand-deep">{variant.name}</span>
            </legend>
            {/* Cada color muestra su nombre: así se distinguen Macadamia y Roble Natural sin tocarlos. */}
            <div className="mt-4 flex flex-wrap gap-x-2 gap-y-3" role="radiogroup" aria-label="Acabado" onKeyDown={onSwatchKey}>
              {product.variants.map((v) => {
                const selected = v.id === variant.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectVariant(v.id)}
                    className="group flex w-[4.75rem] flex-col items-center gap-2 rounded-xl py-1 text-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative h-12 w-12 rounded-full ring-offset-[3px] ring-offset-[var(--tint)] transition ${
                        selected ? "ring-2 ring-brand" : "ring-1 ring-black/45 group-hover:ring-brand"
                      }`}
                      style={{ background: v.swatch }}
                    >
                      {selected && (
                        <Check
                          size={16}
                          className={`absolute inset-0 m-auto ${isLight(v.swatch) ? "text-brand-deep" : "text-cream"}`}
                        />
                      )}
                    </span>
                    <span
                      className={`text-xs leading-tight ${selected ? "font-semibold text-brand-deep" : "text-muted group-hover:text-brand-deep"}`}
                    >
                      {v.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-brand-deep">
            <Clock size={16} className="text-brand" />
            Disponibilidad: <strong className="font-semibold">{availabilityLabel[variant.availability]}</strong>
          </p>

          <div ref={mainCtaRef} className="mt-7">
            <QuoteButton variantId={variant.id} location="product_main" size="lg" className="w-full">
              Cotizar en {variant.name}
            </QuoteButton>
            <p className="mt-3 text-center text-xs text-muted">Te enviamos precio y fecha de entrega por WhatsApp, sin compromiso.</p>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <li className="flex items-center gap-2.5">
              <Package size={17} className="shrink-0 text-brand" /> Se entrega armado
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={17} className="shrink-0 text-brand" /> Envíos en {siteConfig.shipping.coverage}
            </li>
          </ul>
        </div>
      </div>

        </div>
      </section>

      {/* Barra fija en móvil */}
      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 ease-out md:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 shrink-0 rounded-full ring-1 ring-black/45" style={{ background: variant.swatch }} aria-hidden="true" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold text-brand-deep">{product.name}</p>
            <p className="text-xs text-muted">{variant.name}</p>
          </div>
          <QuoteButton variantId={variant.id} location="product_sticky">
            Cotizar
          </QuoteButton>
        </div>
      </div>
    </>
  );
}

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}
