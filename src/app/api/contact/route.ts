import { siteConfig } from "@/data/site-config";

/**
 * Envía el formulario de contacto por correo usando Resend.
 * Necesita RESEND_API_KEY y CONTACT_TO_EMAIL. Sin ellas responde 503
 * y el formulario ofrece continuar por WhatsApp.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Castora Web <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 160);
  const message = String(body.message ?? "").trim().slice(0, 3000);
  const honeypot = String(body.company ?? "");

  if (honeypot) return Response.json({ ok: true });
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nuevo mensaje web de ${name}`,
      html: `<p><strong>Nombre:</strong> ${escape(name)}</p><p><strong>Correo:</strong> ${escape(email)}</p><p>${escape(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
