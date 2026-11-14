# Componentes reutilizables

Antes de escribir markup nuevo, busca aquí. Si el inventario quedó desactualizado (`ls src/components/*`), actualiza este archivo como parte del cambio.

## Base (`src/components/ui/`)

| Componente | Para qué | Notas |
|---|---|---|
| `Button.tsx`: `buttonClass(variant, size, extra)` y `ButtonLink` | Todo botón o enlace con forma de botón | Variantes: `primary` (acción principal), `secondary` (borde), `ghost` (texto con subrayado al pasar el mouse) y `light` (sobre fondos `brand`). Tamaños: `md` (h-11) y `lg` (h-13). Para un `<button>` usa `className={buttonClass(...)}` |
| `WhatsAppLink.tsx` | Cualquier enlace a WhatsApp | Siempre con `context` (`home`, `contact`, `availability`, `product`) y `location` (para la analítica). Hereda las variantes y tamaños de `Button`. Con `unstyled` acepta clases propias |
| `SectionHeading.tsx` | Eyebrow + título + descripción de una sección | `as="h1"` en el encabezado de una página, `align="center"` para títulos centrados. No repitas este patrón a mano |
| `Reveal.tsx` | Entrada suave al hacer scroll | `as="li"` dentro de listas, `delay` escalonado de 70–120 ms. Solo decora: el contenido debe verse sin JavaScript |
| `icons.tsx` | Íconos de marca (WhatsApp, Instagram, TikTok) | Los demás íconos salen de `lucide-react`, con `strokeWidth` 1.5–1.7 en tamaños grandes |

## Layout (`src/components/layout/`)

| Componente | Para qué |
|---|---|
| `Header.tsx` | Barra fija arriba con navegación de escritorio y menú lateral en móvil y tablet (fuera del `<header>`, con overlay, cierre con Escape y bloqueo de scroll) |
| `Footer.tsx` | Navegación, contacto y redes; enlaces de 44 px de alto en móvil |
| `Logo.tsx` | Logo con `tone` (`brown`/`cream`) y `layout` |
| `WhatsAppButton.tsx` | Botón flotante de WhatsApp: aparece después del primer pantallazo y en móvil se oculta en el producto, donde ya está la barra "Cotizar". Revisa su lógica antes de agregar otro CTA fijo para que no se tapen |

## Secciones (`src/components/home/`, `product/`, `contact/`)

- `Hero`, `Benefits`, `FeaturedProduct`, `AboutTeaser`, `FinalCta`: secciones del inicio. `FinalCta` acepta `title`, `text`, `button`, `context` y `location`, así que reúsalo como cierre de cualquier página en vez de crear otro bloque marrón.
- `ProductView` (galería + selector de acabado + CTA + barra fija móvil), `ProductGallery`, `ProductDetails`, `ProductDimensions` (dibujo a escala calculado desde los datos).

## Clases utilitarias propias (`globals.css`)

- `.container-page`: ancho máximo de 80rem con márgenes laterales de 1.25rem (2.5rem desde md). Úsala en toda sección.
- `.eyebrow`: etiqueta en mayúsculas y color `brand` sobre el título.
- `animate-fade-up`: entrada del primer pantallazo, con `[animation-delay:80ms]` escalonado.

## Cuándo crear un componente nuevo

- El mismo bloque aparece en 2 o más lugares, o va a aparecer: extráelo a `components/ui` si es genérico, o a la carpeta de su dominio si no.
- Una variación pequeña (otro color u otro tamaño) se resuelve con una prop, no con un componente copiado.
- Los datos entran por props o se leen de `src/data/`, nunca escritos dentro del componente.
- Los nombres van en inglés y en PascalCase, como el resto. Los textos visibles y los comentarios, en español.
