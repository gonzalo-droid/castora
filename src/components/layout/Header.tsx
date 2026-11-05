"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";
import { InstagramIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  // El menú queda asociado a la ruta donde se abrió: al navegar se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur" : "bg-cream"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.92rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-brand after:transition-transform ${
                      active ? "text-brand-deep after:scale-x-100" : "text-muted hover:text-brand-deep after:scale-x-0"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Castora en Instagram"
            onClick={() => trackEvent("social_click", { network: "instagram", location: "header" })}
            className="hidden h-11 w-11 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-beige/60 sm:inline-flex"
          >
            <InstagramIcon size={20} />
          </a>
          <WhatsAppLink context={{ kind: "home" }} location="header" className="max-sm:hidden">
            WhatsApp
          </WhatsAppLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-deep transition-colors hover:bg-beige/60 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-18 bottom-0 bg-cream transition-[opacity,visibility] duration-300 md:top-20 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menú móvil" className="container-page flex h-full flex-col pt-6 pb-10">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-5 font-serif text-3xl text-brand-deep aria-[current=page]:text-brand"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <WhatsAppLink context={{ kind: "home" }} location="mobile_menu" size="lg">
              Escríbenos por WhatsApp
            </WhatsAppLink>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-brand/40 text-brand-dark"
            >
              <InstagramIcon size={18} /> @castora.peru
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
