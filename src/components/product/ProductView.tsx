"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, MapPin, Package } from "lucide-react";
import { availabilityLabel, type Product } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { FinishPicker } from "@/components/ui/FinishPicker";
import { ProductGallery, type GalleryItem } from "./ProductGallery";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);
}

export function ProductView({ product }: { product: Product }) {
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

  const waContext = { kind: "product", productName: product.name, variantName: variant.name } as const;

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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <ProductGallery items={items} activeIndex={imageIndex} onSelect={onSelectImage} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-4 text-5xl leading-none text-brand-deep md:text-6xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{product.shortDescription}</p>

          <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-line py-5">
            <span className="font-serif text-3xl text-brand-deep">
              {product.price !== null ? formatPrice(product.price) : "Precio a cotizar"}
            </span>
            {product.price === null && <span className="text-sm text-muted">Te respondemos por WhatsApp</span>}
          </div>

          <FinishPicker finishes={product.variants} value={variant.id} onChange={(id) => selectVariant(id)} className="mt-7" />

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-brand-deep">
            <Clock size={16} className="text-brand" />
            Disponibilidad: <strong className="font-semibold">{availabilityLabel[variant.availability]}</strong>
          </p>

          <div ref={mainCtaRef} className="mt-7">
            <WhatsAppLink context={waContext} location="product_main" size="lg" className="w-full">
              Pedir {variant.name} por WhatsApp
            </WhatsAppLink>
            <p className="mt-3 text-center text-sm text-muted">Te enviamos precio y fecha de entrega sin compromiso.</p>
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
          <WhatsAppLink context={waContext} location="product_sticky">
            Cotizar
          </WhatsAppLink>
        </div>
      </div>
    </>
  );
}
