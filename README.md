# Castora Perú — sitio web

Sitio comercial de Castora (muebles de organización para el hogar). Primer producto: **Zapatero Melina**. Las ventas se cierran por WhatsApp.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react. Despliegue en Vercel.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, correo, redes, cobertura de envío | `src/data/site-config.ts` |
| Productos, colores, fotos, medidas, precio, disponibilidad | `src/data/products.ts` |
| Mensajes de WhatsApp por contexto | `src/lib/whatsapp.ts` |
| Eventos de analítica (`whatsapp_click`, `select_variant`, …) | `src/lib/analytics.ts` |
| Logo y fotos | `public/brand/`, `public/products/` |

- **Precio:** `price: null` muestra "Precio a cotizar". Si se pone un número (en soles), se muestra el precio.
- **Agregar un color:** sumar una variante en `products.ts` con sus fotos en `public/products/zapatero-melina/`.
- **Enlace directo a un color:** `/productos/zapatero-melina#nogal`.

## Variables de entorno

Ver `.env.example`. Sin `RESEND_API_KEY`, el formulario de contacto ofrece enviar el mensaje por WhatsApp.

## Pendiente de confirmar con Castora

- Correo (`hola@castora.pe`) y cuenta de TikTok: son de ejemplo.
- Textos de la página Nosotros: historia propuesta, sin validar.
- Nombres de los acabados (salvo Macadamia).
- Logo en SVG y fotos en mayor resolución (las actuales miden 549 × 840 px).
- Dominio: al tenerlo, configurar `NEXT_PUBLIC_SITE_URL` en Vercel.
