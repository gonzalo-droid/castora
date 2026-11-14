# Paleta, tipografía y espaciado

Los tokens viven en `src/app/globals.css` (`@theme`) y Tailwind los expone como `bg-brand`, `text-muted`, etc. **No uses hex sueltos** en componentes, salvo el color de cada variante (`swatch` en `products.ts`) y el verde oficial de WhatsApp.

## Tokens y uso

| Token | Hex | Rol |
|---|---|---|
| `cream` | #f8f3ea | Fondo base de la página (~60 %) |
| `sand` | #f1e8dc | Fondo de secciones alternas y tarjetas (se usa con `/50`–`/60`) |
| `beige` | #e8d7c5 | Formas decorativas, hover suave y selección de texto |
| `line` | #e4d9cb | Bordes y divisores (decorativos: no sirven como borde de un control) |
| `brand` | #8f5e36 | Acento (~10 %): botón primario, eyebrow, palabras en cursiva y enlace activo |
| `brand-dark` | #4b3021 | Hover del primario y texto de botones secundarios |
| `brand-deep` | #3a251a | Títulos, y fondo del footer y de bloques de énfasis (~30 % junto con `sand`) |
| `ink` | #292521 | Texto principal |
| `muted` | #6f6359 | Texto secundario, descripciones y etiquetas |

La regla 60-30-10 sirve como guía de peso visual, no como fórmula: neutros cálidos de base, marrones profundos de apoyo y el `brand` reservado para lo que se tiene que tocar o notar. Si el `brand` aparece en todos lados, deja de guiar.

## Contraste medido (WCAG AA: 4.5:1 texto normal, 3:1 texto grande ≥24 px o ≥18.5 px en negrita, y bordes de controles)

| Texto / fondo | Ratio | Uso |
|---|---|---|
| ink / cream | 13.8 | ✅ cuerpo |
| brand-deep / cream | 13.0 | ✅ títulos |
| muted / cream | 5.3 | ✅ texto secundario |
| muted / sand | 4.8 | ✅ justo |
| **muted / beige** | **4.15** | ❌ no pongas texto `muted` sobre `beige` |
| brand / cream | 4.97 | ✅ enlaces, eyebrow |
| brand / sand | 4.5 | ✅ al límite: no lo bajes con opacidad |
| cream / brand | 4.97 | ✅ botón primario; **sin** opacidad (`cream/80` baja a 3.8) |
| cream / brand-deep | 13.0 | ✅ footer |
| beige / brand-deep | 10.3 | ✅ eyebrow en el footer |
| line / cream | 1.26 | Solo decorativo |

Mide cualquier par nuevo con `scripts/contraste.py`. La opacidad (`/70`, `/80`) baja el contraste: calcula el resultado sobre el fondo real.

## Tipografía

- **Cormorant Garamond** (`font-serif`): `h1`–`h3` en 600 y cifras destacadas. Es fina, así que evita tamaños menores a 24 px y texto largo con ella.
- **DM Sans** (`font-sans`): cuerpo, botones, formularios, etiquetas. El cuerpo va a 16 px en móvil como mínimo (`text-base`) y los inputs a 16 px o más, porque con menos iOS hace zoom.
- Escala usada: h1 `text-5xl`→`md:text-7xl`, h2 `text-4xl`→`md:text-5xl`, cifras `text-3xl` serif, eyebrow 0.72rem con `tracking 0.22em`.
- La cursiva `<em className="text-brand">` sirve para una o dos palabras clave por título, no más.

## Espaciado y ritmo

- Secciones: `py-16 md:py-24`. Eyebrow → título: `mb-4`/`mt-5`. Título → descripción: `mt-5`/`mt-6`. Descripción → acciones: `mt-8`/`mt-9`.
- Grillas: `gap-10` en móvil y `lg:gap-16`/`lg:gap-20` entre columnas grandes. En listas de tarjetas, `gap-4` a `gap-6`.
- Radios: botones con `rounded-full`, tarjetas e imágenes con `rounded-2xl`/`rounded-3xl`, bloques destacados con `rounded-[2rem]`.
- El ancho de lectura va limitado con `max-w-md`–`max-w-2xl`; los párrafos no ocupan todo el ancho en escritorio.
