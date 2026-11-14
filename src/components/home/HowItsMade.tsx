import Image from "next/image";
import { featuredProduct as p } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";

const { height, width, levels } = p.dimensions;

// Puntos señalados sobre la foto (posiciones relativas a la imagen de ambiente).
const pins = [
  { label: "Repisa con bordes", top: "7%", left: "50%" },
  { label: `${levels} niveles alternados`, top: "40%", left: "6%" },
  { label: "Tablero de 18 mm", top: "66%", left: "44%" },
];

const facts = [
  { value: `${height} cm`, text: "de alto: aprovecha la pared en lugar del piso." },
  { value: `${width} cm`, text: "de ancho: entra junto a la puerta o al lado del clóset." },
  { value: `${levels} niveles`, text: "alternados a cada lado: cada par queda a la vista." },
  { value: "18 mm", text: "de melamina Pelíkano, firme y fácil de limpiar." },
];

/** «Cómo está hecho»: la foto del mueble con puntos señalados y sus medidas reales. */
export function HowItsMade() {
  return (
    <section aria-labelledby="como-esta-hecho" className="py-16 md:py-24">
      <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
            <Image
              src="/products/zapatero-melina/macadamia-ambiente-2.jpg"
              alt={`Zapatero Melina: repisa superior con bordes, ${levels} niveles alternados y tablero de 18 mm`}
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover object-[50%_30%]"
            />
            {pins.map((pin) => (
              <span
                key={pin.label}
                aria-hidden="true"
                className="absolute flex items-center gap-1.5 text-xs font-semibold text-brand-deep"
                style={{ top: pin.top, left: pin.left }}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand ring-4 ring-white/75" />
                <span className="rounded-full bg-cream/95 px-2.5 py-1 shadow-sm">{pin.label}</span>
              </span>
            ))}
          </div>
          {/* Cota del ancho, como en un plano */}
          <p className="mt-4 flex items-center gap-3 text-xs font-semibold text-brand-deep" aria-hidden="true">
            <span className="h-px flex-1 bg-brand-deep" />
            {width} cm de ancho
            <span className="h-px flex-1 bg-brand-deep" />
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h2 id="como-esta-hecho" className="text-4xl leading-tight text-brand-deep md:text-5xl">
            Cómo está hecho
          </h2>
          <dl className="mt-8 border-t border-line">
            {facts.map((f) => (
              <div key={f.value} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-4">
                <dt className="font-serif text-3xl leading-none text-brand-deep">{f.value}</dt>
                <dd className="text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
