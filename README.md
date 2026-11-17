# Castora Perú — sitio web

Sitio comercial de Castora (muebles de organización para el hogar). Primer producto: **Zapatero Melina**. Las ventas se cierran por WhatsApp.

## Stack

Next.js 16 (App Router, export estático) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.

## Publicación: GitHub Pages

- Cada push a `main` corre `.github/workflows/deploy.yml`: lint, build y publicación en https://gonzalo-lozg.me/castora.
- El sitio es 100% estático (`output: "export"` en `next.config.ts`); no hay servidor ni API.
- Las fotos se optimizan en el build: `scripts/optimize-images.mjs` genera versiones WebP en `public/_img/` (ignorada en git) y `src/lib/image-loader.ts` elige la del ancho pedido. Corre solo antes de `dev` y `build`.
- `castora-alpha.vercel.app` redirige con 301 a GitHub Pages (`vercel.json`).
- Sin analítica por ahora: los eventos quedan en `window.dataLayer` (`src/lib/analytics.ts`), listos para GA4/GTM u otra herramienta.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # exporta a ./out
# Probar como en GitHub Pages:
NEXT_PUBLIC_BASE_PATH=/castora NEXT_PUBLIC_SITE_URL=https://gonzalo-lozg.me/castora npm run build
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

Ver `.env.example`. El contacto es solo por WhatsApp y redes (no hay formulario).

## Pendiente de confirmar con Castora

- Correo: oculto (`email: null` en `site-config.ts`); poner el real para mostrarlo.
- Nombres de los acabados (salvo Macadamia).
- Logo en SVG y fotos en mayor resolución (las actuales miden 549 × 840 px).
- Dominio `castorape.com`: al tenerlo, en `deploy.yml` poner `NEXT_PUBLIC_SITE_URL=https://castorape.com` y `NEXT_PUBLIC_BASE_PATH` vacío, agregar el dominio en Settings → Pages y cambiar el destino de `vercel.json`.
