"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { ProductImage } from "@/data/products";

export type GalleryItem = ProductImage & { variantId: string; variantName: string };

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProductGallery({ items, activeIndex, onSelect }: Props) {
  const active = items[activeIndex] ?? items[0];
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const go = (delta: number) => onSelect((activeIndex + delta + items.length) % items.length);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (!d.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="flex min-w-0 flex-col-reverse gap-4 md:flex-row">
      {/* Miniaturas */}
      <ul
        className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] md:max-h-[42rem] md:flex-col md:overflow-y-auto md:pb-0"
        aria-label="Fotos del producto"
      >
        {items.map((item, i) => {
          const selected = i === activeIndex;
          return (
            <li key={item.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Ver foto ${i + 1}: ${item.variantName}`}
                aria-current={selected}
                className={`relative block h-24 w-16 overflow-hidden rounded-xl bg-sand ring-offset-2 ring-offset-cream transition md:h-28 md:w-20 ${
                  selected ? "ring-2 ring-brand" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Imagen principal con zoom */}
      <div className="relative min-w-0 flex-1">
        <div
          className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-3xl bg-sand"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
          onClick={() => dialogRef.current?.showModal()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div key={active.src} className="absolute inset-0 animate-fade-in">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 560px, calc(100vw - 2.5rem)"
              className="object-cover transition-transform duration-200 ease-out"
              style={
                zoom
                  ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : { transformOrigin: "50% 50%" }
              }
            />
          </div>
          <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-brand-deep backdrop-blur">
            {active.variantName}
          </span>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-brand-deep shadow-sm backdrop-blur transition hover:bg-cream"
          aria-label="Ampliar foto"
        >
          <Expand size={18} />
        </button>
      </div>

      {/* Visor a pantalla completa */}
      <dialog
        ref={dialogRef}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-brand-deep/90"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-label="Foto ampliada"
      >
        <div className="flex h-full items-center justify-center p-4" onClick={() => dialogRef.current?.close()}>
          <div className="relative h-full max-h-[92dvh] w-full max-w-[min(92vw,calc(92dvh*0.75))]" onClick={(e) => e.stopPropagation()}>
            <Image src={active.src} alt={active.alt} fill sizes="92vw" className="rounded-2xl object-contain" />
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute top-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream text-brand-deep"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
      </dialog>
    </div>
  );
}
