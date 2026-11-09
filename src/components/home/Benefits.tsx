import { Footprints, Layers, MoveVertical, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  { icon: Footprints, title: "Hasta 14 pares", text: "Siete niveles con espacio para cada par." },
  { icon: Layers, title: "Melamina de 18 mm", text: "Tablero Pelíkano firme y fácil de limpiar." },
  { icon: MoveVertical, title: "Diseño vertical", text: "Aprovecha la altura con solo 46 cm de ancho." },
  { icon: Sparkles, title: "Moderna y versátil", text: "Cinco acabados para cualquier ambiente." },
];

export function Benefits() {
  return (
    <section aria-labelledby="beneficios" className="border-y border-line bg-sand/60">
      <h2 id="beneficios" className="sr-only">
        Beneficios del Zapatero Melina
      </h2>
      <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:py-14 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 80} className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-brand">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="font-sans text-[1.05rem] font-semibold text-brand-deep md:text-[0.95rem]">{title}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted md:text-sm">{text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
