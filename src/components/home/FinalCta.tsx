import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { WhatsAppContext } from "@/lib/whatsapp";

type Props = {
  title?: string;
  text?: string;
  button?: string;
  context?: WhatsAppContext;
  location?: string;
};

export function FinalCta({
  title = "¿Listo para transformar tu espacio?",
  text = "Cuéntanos qué acabado te gusta y te enviamos la cotización y los tiempos de entrega.",
  button = "Escríbenos por WhatsApp",
  context = { kind: "home" },
  location = "final_cta",
}: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-center text-cream md:px-16 md:py-20">
          <Image
            src="/brand/isotipo-cream.png"
            alt=""
            width={304}
            height={194}
            className="pointer-events-none absolute -right-10 -bottom-12 w-64 opacity-[0.08] md:w-96"
          />
          <h2 className="relative mx-auto max-w-2xl text-4xl leading-tight md:text-6xl">{title}</h2>
          <p className="relative mx-auto mt-5 max-w-lg text-cream">{text}</p>
          <WhatsAppLink context={context} location={location} variant="light" size="lg" className="relative mt-9">
            {button}
          </WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
