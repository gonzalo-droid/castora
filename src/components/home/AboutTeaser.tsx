import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutTeaser() {
  return (
    <section className="bg-sand/60 py-20 md:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/products/zapatero-melina/nogal-ambiente.jpg"
              alt="Zapatero Melina color Nogal con zapatos ordenados"
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Sobre Castora"
            title="Muebles pensados para el día a día"
            description="Castora nace en Lima con una idea simple: que ordenar la casa sea más fácil y que los muebles que lo hacen posible también se vean bien. Diseñamos piezas funcionales, de líneas limpias, para espacios reales."
          />
          <ButtonLink href="/nosotros" variant="ghost" className="mt-8 !px-0">
            Conoce nuestra historia <ArrowRight size={16} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
