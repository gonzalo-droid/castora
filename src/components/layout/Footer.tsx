import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

// En móvil cada enlace ocupa 44 px de alto para tocarlo con comodidad.
const linkClass = "inline-flex min-h-11 items-center text-cream/75 transition-colors hover:text-cream md:min-h-0";

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
          <ul className="text-sm md:space-y-3">
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
          <ul className="text-sm md:space-y-3">
            <li>
              <a href={whatsappUrl({ kind: "contact" })} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <WhatsAppIcon size={16} /> {siteConfig.whatsapp.display}
                <span className="sr-only"> (abre WhatsApp)</span>
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail size={16} strokeWidth={1.7} /> {siteConfig.email}
                </a>
              </li>
            )}
            <li className="flex min-h-11 items-center text-cream/55 md:min-h-0">Envíos en {siteConfig.shipping.coverage}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-beige mb-5 font-sans">Síguenos</h2>
          <ul className="text-sm md:space-y-3">
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
        {/* Todo alineado a la izquierda: a la derecha queda el botón flotante de WhatsApp. */}
        <div className="container-page flex flex-col gap-1 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:gap-3">
          <p>© 2026 Castora Perú. Todos los derechos reservados.</p>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <p>
            Desarrollado por{" "}
            <a
              href="https://cobayatech.com"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1 text-cream/75 underline-offset-4 transition-colors hover:text-cream hover:underline sm:min-h-0"
            >
              CobayaTech
              <ArrowUpRight size={12} aria-hidden="true" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
