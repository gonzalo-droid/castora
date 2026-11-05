"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock, MapPin, Package } from "lucide-react";
import { availabilityLabel, type Product } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
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

          <fieldset className="mt-7">
            <legend className="text-sm text-muted">
              Acabado: <span className="font-semibold text-brand-deep">{variant.name}</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Acabado">
              {product.variants.map((v) => {
                const selected = v.id === variant.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={v.name}
                    title={v.name}
                    onClick={() => selectVariant(v.id)}
                    className={`relative h-12 w-12 rounded-full ring-offset-[3px] ring-offset-cream transition ${
                      selected ? "ring-2 ring-brand" : "ring-1 ring-black/15 hover:ring-brand/50"
                    }`}
                    style={{ background: v.swatch }}
                  >
                    {selected && (
                      <Check
                        size={16}
                        className={`absolute inset-0 m-auto ${isLight(v.swatch) ? "text-brand-deep" : "text-cream"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-brand-deep">
            <Clock size={16} className="text-brand" />
            Disponibilidad: <strong className="font-semibold">{availabilityLabel[variant.availability]}</strong>
          </p>

          <div className="mt-7">
            <WhatsAppLink context={waContext} location="product_main" size="lg" className="w-full">
              Pedir {variant.name} por WhatsApp
            </WhatsAppLink>
            <p className="mt-3 text-center text-xs text-muted">Te enviamos precio y fecha de entrega sin compromiso.</p>
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
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: variant.swatch }} aria-hidden="true" />
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

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}
