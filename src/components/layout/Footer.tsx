import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const linkClass = "text-cream/75 transition-colors hover:text-cream";

export function Footer() {
  const { social } = siteConfig;
  return (
    <footer className="bg-brand-deep text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="cream" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/70">
            Muebles y soluciones de organización para el hogar. Diseño funcional hecho en Lima.
          </p>
        </div>

        <div>
          <h2 className="eyebrow !text-beige mb-5 font-sans">Navegación</h2>
          <ul className="space-y-3 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-beige mb-5 font-sans">Contacto</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={whatsappUrl({ kind: "contact" })} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <WhatsAppIcon size={16} /> {siteConfig.whatsapp.display}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail size={16} strokeWidth={1.7} /> {siteConfig.email}
                </a>
              </li>
            )}
            <li className="text-cream/55">Envíos en {siteConfig.shipping.coverage}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-beige mb-5 font-sans">Síguenos</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <InstagramIcon size={16} /> Instagram
              </a>
            </li>
            {social.tiktok && (
              <li>
                <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <TikTokIcon size={16} /> TikTok
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="container-page py-6 text-xs text-cream/55">
          © 2026 Castora Perú. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
