import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const metadata = pageMetadata({
  title: "Contacto y cotizaciones",
  description:
    "Cotiza tu Zapatero Melina por WhatsApp o escríbenos por Instagram. Hacemos envíos en Lima Metropolitana y el mueble llega armado.",
  path: "/contacto",
});

export default function ContactoPage() {
  const { social, email } = siteConfig;
  const channels = [
    { icon: InstagramIcon, label: "Instagram", value: "@castora.peru", href: social.instagram },
    ...(social.tiktok ? [{ icon: TikTokIcon, label: "TikTok", value: "@castora.peru", href: social.tiktok }] : []),
    ...(email ? [{ icon: Mail, label: "Correo", value: email, href: `mailto:${email}` }] : []),
  ];

  return (
    <section className="container-page pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow animate-fade-up">Contacto</p>
          <h1 className="animate-fade-up mt-5 text-6xl leading-none text-brand-deep [animation-delay:80ms] md:text-7xl">
            Contáctanos
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-muted [animation-delay:160ms]">
            ¿Quieres cotizar tu Zapatero Melina o tienes alguna duda? Escríbenos y te respondemos con gusto.
          </p>

          <div className="animate-fade-up mt-9 [animation-delay:240ms]">
            <WhatsAppLink context={{ kind: "contact" }} location="contact_main" size="lg">
              Escríbenos por WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <ul className="animate-fade-up divide-y divide-line border-y border-line [animation-delay:320ms]">
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
          <li className="flex items-center gap-4 py-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand text-brand">
              <MapPin size={19} />
            </span>
            <span>
              <span className="block text-xs tracking-wide text-muted uppercase">Envíos</span>
              <span className="text-brand-deep">{siteConfig.shipping.coverage}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
