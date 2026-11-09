"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur" : "bg-cream"
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

    </header>

      {/* Menú lateral (móvil y tablet). Va fuera del <header>: su backdrop-blur
          convertiría al header en el contenedor de los elementos "fixed". */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-brand-deep/40 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          inert={!open}
          className={`absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-cream transition-[translate,box-shadow] duration-300 ease-out ${
            open ? "translate-x-0 shadow-2xl shadow-black/20" : "translate-x-full shadow-none"
          }`}
        >
          <div className="flex h-18 shrink-0 items-center justify-between border-b border-line px-5 md:h-20">
            <span className="eyebrow">Menú</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-deep transition-colors hover:bg-beige/60"
            >
              <X size={22} />
            </button>
          </div>

          <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-serif text-[1.7rem] leading-tight transition-colors ${
                        active ? "text-brand" : "text-brand-deep hover:text-brand"
                      }`}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 flex-col gap-3 border-t border-line bg-sand/60 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <WhatsAppLink context={{ kind: "home" }} location="mobile_menu" size="lg" className="w-full">
              Escríbenos por WhatsApp
            </WhatsAppLink>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("social_click", { network: "instagram", location: "mobile_menu" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand/40 text-sm text-brand-dark transition-colors hover:border-brand"
            >
              <InstagramIcon size={18} /> @castora.peru <ArrowUpRight size={15} className="text-muted" />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
