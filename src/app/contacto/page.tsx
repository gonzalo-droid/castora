import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, CircleDot, Clock, Mail, MapPin, MessageCircle, Package, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { featuredProduct as product } from "@/data/products";
import type { ContactTopic } from "@/lib/whatsapp";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { QuoteButton } from "@/components/quote/QuoteButton";

export const metadata = pageMetadata({
  title: "Contacto y cotizaciones",
  description:
    "Cotiza tu Zapatero Melina por WhatsApp o escríbenos por Instagram. Hacemos envíos en Lima Metropolitana y el mueble llega armado.",
  path: "/contacto",
});

// Cada tema abre la hoja «Arma tu consulta» con ese tema (ver components/quote).
const topics: { id: ContactTopic; label: string; icon: LucideIcon }[] = [
  { id: "quote", label: "Cotizar un acabado", icon: CircleDot },
  { id: "delivery", label: "¿Cuándo me llegaría?", icon: Clock },
  { id: "shipping", label: "Envío a mi distrito", icon: MapPin },
  { id: "other", label: "Otra consulta", icon: MessageCircle },
];

export default function ContactoPage() {
  const { social, email, shipping } = siteConfig;
  const { dimensions: d } = product;
  const channels = [
    { icon: InstagramIcon, label: "Instagram", value: "@castora.peru", href: social.instagram },
    ...(social.tiktok ? [{ icon: TikTokIcon, label: "TikTok", value: "@castora.peru", href: social.tiktok }] : []),
    ...(email ? [{ icon: Mail, label: "Correo", value: email, href: `mailto:${email}` }] : []),
  ];
  const facts = [
    { icon: Package, text: "Se entrega armado, listo para usar" },
    { icon: MapPin, text: `Envíos en ${shipping.coverage}` },
    { icon: Clock, text: "Se fabrica a pedido" },
  ];
  const productHref = `/productos/${product.slug}`;

  return (
    <section className="container-page pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <h1 className="animate-fade-up mt-5 text-6xl leading-none text-brand-deep [animation-delay:80ms] md:text-7xl">
            Contáctanos
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-muted [animation-delay:160ms]">
            ¿Quieres cotizar tu Zapatero Melina o tienes alguna duda? Escríbenos y te respondemos con gusto.
          </p>

          <div className="animate-fade-up mt-9 [animation-delay:240ms]">
            <WhatsAppLink context={{ kind: "contact" }} location="contact_main" size="lg" className="max-sm:w-full">
              Escríbenos por WhatsApp
            </WhatsAppLink>
            <p className="mt-3 text-sm text-muted">Te respondemos por WhatsApp, sin compromiso.</p>
          </div>

          <div className="animate-fade-up mt-10 [animation-delay:320ms]">
            <h2 id="temas" className="font-sans text-sm font-semibold text-brand-deep">
              O elige un tema y te dejamos el mensaje listo:
            </h2>
            <ul aria-labelledby="temas" className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
              {topics.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <QuoteButton
                    topic={id}
                    location={`contact_topic_${id}`}
                    unstyled
                    className="inline-flex min-h-11 w-full items-center gap-2 rounded-full border border-brand/40 bg-cream px-4 text-sm text-brand-deep transition-colors hover:border-brand hover:bg-sand"
                  >
                    <Icon size={16} className="shrink-0 text-brand" aria-hidden="true" />
                    {label}
                  </QuoteButton>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 space-y-3 border-t border-line pt-8">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-muted">
                <Icon size={18} className="shrink-0 text-brand" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid content-start gap-8">
          {/* Tarjeta del producto: da algo que ver y un camino de vuelta al catálogo. */}
          <Link
            href={productHref}
            className="group grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-5 rounded-3xl bg-sand p-4 transition-colors hover:bg-beige/70 sm:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/products/zapatero-melina/macadamia-ambiente.jpg"
                alt=""
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="min-w-0">
              <p className="eyebrow">Primer lanzamiento</p>
              <p className="mt-2 font-serif text-3xl leading-none text-brand-deep">{product.name}</p>
              <p className="mt-2 text-sm text-muted">
                Hasta {d.pairs} pares ·{" "}
                <span className="whitespace-nowrap">
                  {d.height} × {d.width} × {d.depth} cm
                </span>
              </p>
              <div className="mt-3 flex gap-1.5" aria-hidden="true">
                {product.variants.map((v) => (
                  <span key={v.id} className="h-4 w-4 rounded-full ring-1 ring-black/40" style={{ background: v.swatch }} />
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep">
                Ver producto <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          <ul className="divide-y divide-line border-y border-line">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand text-brand">
                    <Icon size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs tracking-wide text-muted uppercase">{label}</span>
                    <span className="text-brand-deep">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
