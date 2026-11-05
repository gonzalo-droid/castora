"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

const field =
  "mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-muted/60 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackText, setFallbackText] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        trackEvent("contact_form_submit", { result: "sent" });
        form.reset();
        return;
      }
      if (res.status === 503) {
        // Correo aún no configurado: se ofrece enviar el mismo mensaje por WhatsApp.
        setFallbackText(`Hola, soy ${data.name} (${data.email}). ${data.message}`);
        setStatus("fallback");
        trackEvent("contact_form_submit", { result: "fallback_whatsapp" });
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-cream p-8" role="status">
        <CheckCircle2 size={32} className="text-brand" />
        <h3 className="text-3xl text-brand-deep">¡Gracias por escribirnos!</h3>
        <p className="text-muted">Recibimos tu mensaje y te responderemos pronto.</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm text-brand underline underline-offset-4">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-sand/50 p-6 md:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-brand-deep">
          Nombre
          <input name="name" required autoComplete="name" maxLength={120} className={field} placeholder="Tu nombre" />
        </label>
        <label className="block text-sm font-medium text-brand-deep">
          Correo
          <input name="email" type="email" required autoComplete="email" maxLength={160} className={field} placeholder="tu@correo.com" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-brand-deep">
        Mensaje
        <textarea name="message" required rows={5} maxLength={3000} className={`${field} resize-y`} placeholder="¿En qué te podemos ayudar?" />
      </label>
      {/* Campo trampa para bots */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "lg")}>
          {status === "sending" && <Loader2 size={18} className="animate-spin" />}
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </button>
        <div aria-live="polite" className="text-sm">
          {status === "error" && <p className="text-red-700">No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.</p>}
          {status === "fallback" && (
            <p className="text-muted">
              Por ahora atendemos por WhatsApp.{" "}
              <a href={whatsappUrl(fallbackText)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
                Enviar este mensaje por WhatsApp
              </a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
