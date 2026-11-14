"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { featuredProduct } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import { quoteMessage, whatsappUrl, type ContactTopic } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

export type QuoteOptions = {
  /** Acabado ya elegido (id de variante). */
  variantId?: string;
  /** Tema desde la página de contacto. */
  topic?: ContactTopic;
  /** Dónde se abrió, para analítica. */
  location: string;
};

type QuoteContextValue = { openQuote: (opts: QuoteOptions) => void };

const QuoteContext = createContext<QuoteContextValue | null>(null);

/** Devuelve null fuera del provider: los botones caen a su enlace directo a WhatsApp. */
export function useQuote() {
  return useContext(QuoteContext);
}

const product = featuredProduct;
const whenOptions = [
  { value: "lo antes posible", label: "Lo antes posible" },
  { value: "este mes", label: "Este mes" },
  { value: "sin apuro", label: "Sin apuro" },
];

/**
 * Hoja «Arma tu consulta»: antes de abrir WhatsApp junta acabado, distrito y plazo
 * para que el primer mensaje llegue completo. Todo es opcional salvo el acabado.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [opts, setOpts] = useState<QuoteOptions>({ location: "" });
  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [district, setDistrict] = useState("");
  const [when, setWhen] = useState("");
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  const openQuote = useCallback((o: QuoteOptions) => {
    setOpts(o);
    if (o.variantId) setVariantId(o.variantId);
    setShowComment(o.topic === "other");
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    trackEvent("quote_open", { location: o.location, topic: o.topic });
  }, []);

  // Enfoca el campo que corresponde al tema (ej. «Envío a mi distrito» → distrito).
  useEffect(() => {
    if (!dialogRef.current?.open) return;
    if (opts.topic === "shipping") districtRef.current?.focus();
    else if (opts.topic === "other") commentRef.current?.focus();
  }, [opts]);

  const close = () => dialogRef.current?.close();
  const onClose = () => {
    document.documentElement.style.overflow = "";
  };

  const finish = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const message = quoteMessage({ productName: product.name, finishName: finish.name, district, when, comment, topic: opts.topic });
  const skipMessage = quoteMessage({ productName: product.name, finishName: finish.name, topic: opts.topic });

  const chip =
    "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-brand/35 px-4 text-sm text-brand-deep transition-colors " +
    "peer-checked:border-brand-deep peer-checked:bg-brand-deep peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-brand";

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={onClose}
        aria-labelledby="quote-title"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-3xl bg-cream p-0 text-ink shadow-2xl backdrop:bg-brand-deep/45 max-sm:mb-0 max-sm:max-w-none max-sm:rounded-b-none"
      >
        <form method="dialog" className="grid gap-6 px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-7 sm:pt-6">
          <span className="mx-auto h-1 w-10 rounded-full bg-line sm:hidden" aria-hidden="true" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="quote-title" className="text-3xl leading-tight text-brand-deep">
                Arma tu consulta
              </h2>
              <p className="mt-1 text-sm text-muted">Te respondemos por WhatsApp con precio y fecha, sin compromiso.</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="-mt-1 -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-deep hover:bg-sand"
            >
              <X size={20} />
            </button>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-brand-deep">Acabado</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <label key={v.id} className="relative">
                  <input
                    type="radio"
                    name="quote-finish"
                    value={v.id}
                    checked={v.id === variantId}
                    onChange={() => setVariantId(v.id)}
                    className="peer sr-only"
                  />
                  <span className={`${chip} gap-2 pl-2`}>
                    <span className="h-6 w-6 rounded-full ring-1 ring-black/30" style={{ background: v.swatch }} aria-hidden="true" />
                    {v.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-brand-deep">
              Distrito <span className="font-normal text-muted">(opcional)</span>
            </span>
            <input
              ref={districtRef}
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Ej. Miraflores"
              maxLength={60}
              autoComplete="off"
              className="h-12 rounded-xl border border-brand/35 bg-white px-4 text-base text-ink outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-semibold text-brand-deep">
              ¿Para cuándo lo necesitas? <span className="font-normal text-muted">(opcional)</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {whenOptions.map((o) => (
                <label key={o.value} className="relative">
                  <input
                    type="radio"
                    name="quote-when"
                    value={o.value}
                    checked={when === o.value}
                    onChange={() => setWhen(o.value)}
                    className="peer sr-only"
                  />
                  <span className={chip}>{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {showComment ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-deep">
                Tu consulta <span className="font-normal text-muted">(opcional)</span>
              </span>
              <textarea
                ref={commentRef}
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={400}
                className="rounded-xl border border-brand/35 bg-white px-4 py-3 text-base text-ink outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
              />
            </label>
          ) : (
            <button
              type="button"
              onClick={() => setShowComment(true)}
              className="justify-self-start text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-deep"
            >
              Agregar un comentario
            </button>
          )}

          <div className="grid gap-2">
            <span className="text-xs text-muted">Así llegará tu mensaje</span>
            <p aria-live="polite" className="rounded-2xl rounded-bl-sm bg-[#e7f2e1] px-4 py-3 text-sm leading-relaxed text-[#1d2a19]">
              {message}
            </p>
          </div>

          {/* En móvil el botón queda fijo al pie de la hoja para no tener que buscarlo. */}
          <div className="sticky bottom-0 -mx-5 -mb-[max(1.5rem,env(safe-area-inset-bottom))] grid gap-1 border-t border-line bg-cream px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:mb-0 sm:border-0 sm:px-0 sm:pt-0 sm:pb-0">
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("whatsapp_click", { location: `quote_${opts.location}`, context: "quote", variant: finish.name });
                trackEvent("quote_send", {
                  location: opts.location,
                  topic: opts.topic,
                  district: district.trim() ? "yes" : "no",
                  when: when || "none",
                });
                close();
              }}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[0.95rem] font-medium text-cream transition-colors hover:bg-brand-dark"
            >
              <WhatsAppIcon size={19} /> Enviar por WhatsApp
              <span className="sr-only"> (abre WhatsApp)</span>
            </a>
            <a
              href={whatsappUrl(skipMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("whatsapp_click", { location: `quote_skip_${opts.location}`, context: "quote", variant: finish.name });
                close();
              }}
              className="justify-self-center py-2 text-sm text-muted underline underline-offset-4 hover:text-brand-deep"
            >
              o abre WhatsApp sin completar nada
            </a>
          </div>
        </form>
      </dialog>
    </QuoteContext.Provider>
  );
}
