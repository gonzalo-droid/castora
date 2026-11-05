import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { featuredProduct as p } from "@/data/products";

export function FeaturedProduct() {
  const href = `/productos/${p.slug}`;
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Producto destacado"
              title={
                <>
                  Un mismo diseño, <em className="text-brand">cinco acabados</em>
                </>
              }
              description={p.shortDescription}
            />
          </Reveal>
          <Reveal delay={120} className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={href}>
              Ver producto <ArrowRight size={16} />
            </ButtonLink>
            <WhatsAppLink context={{ kind: "availability", productName: p.name }} location="home_featured" variant="secondary">
              Consultar disponibilidad
            </WhatsAppLink>
          </Reveal>
        </div>

        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
          {p.variants.map((v, i) => {
            const img = v.images.find((im) => !im.lifestyle) ?? v.images[0];
            return (
              <Reveal as="li" key={v.id} delay={i * 70} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
                <Link href={`${href}#${v.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 62vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full ring-1 ring-black/10 ring-offset-2 ring-offset-cream"
                      style={{ background: v.swatch }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-brand-deep">{v.name}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
