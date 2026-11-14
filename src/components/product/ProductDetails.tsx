import { Check } from "lucide-react";
import type { Product } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductDimensions } from "./ProductDimensions";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="border-t border-line bg-sand/60 py-20 md:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">El diseño</p>
          <h2 className="text-4xl leading-tight text-brand-deep md:text-5xl">Orden a la vista, en poco espacio</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {product.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-10 font-sans text-sm font-semibold tracking-wide text-brand-deep uppercase">Entrega y armado</h3>
          <ul className="mt-4 space-y-3">
            {product.delivery.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <Check size={18} className="mt-0.5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="grid gap-6 content-start">
          <ProductDimensions dimensions={product.dimensions} />
          <h2 className="sr-only">Especificaciones</h2>
          <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-cream">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-5 sm:grid-cols-[10rem_1fr] md:px-8">
                <dt className="text-sm text-muted">{spec.label}</dt>
                <dd className="text-sm font-medium text-brand-deep">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
