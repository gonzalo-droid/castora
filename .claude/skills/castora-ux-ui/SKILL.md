---
name: castora-ux-ui
description: Guía de UX/UI del sitio de Castora Perú (Next.js 16 + Tailwind 4). Úsala siempre que vayas a crear, cambiar o revisar cualquier parte visible del sitio, aunque el pedido no diga "UX" ni "UI". Por ejemplo, una sección o página nueva, un componente, textos, colores, espaciado, orden de secciones, el menú, formularios, CTAs de WhatsApp, la versión móvil, contraste o accesibilidad, o "revisa cómo se ve". Cubre la reutilización de componentes, qué información mostrar, la paleta de colores, la jerarquía y la organización de la información, y cómo verificar en móvil y escritorio.
---

# UX/UI de Castora

Castora vende muebles de organización para el hogar en Lima. Hoy tiene un producto, el Zapatero Melina, y la venta se cierra por **WhatsApp**: el sitio no tiene carrito. La mayoría entra desde el celular, sobre todo desde Instagram y TikTok. Cada decisión de diseño responde a una pregunta: **¿ayuda a que alguien entienda el producto y escriba por WhatsApp con confianza?**

## Cómo trabajar

1. **Entiende el objetivo de la pantalla.** Define qué tiene que saber o hacer la persona al terminar: elegir un color, confiar en la marca, escribir. Eso fija qué va primero.
2. **Reutiliza antes de crear.** Revisa `references/componentes.md`. Si algo parecido ya existe, úsalo o extiéndelo con una prop. Un componente nuevo se justifica solo si el patrón se repite o no encaja en ninguno.
3. **Decide qué información mostrar.** Usa `references/informacion.md`: muestra solo lo que ayuda a decidir y deja el resto en un segundo nivel.
4. **Aplica jerarquía, paleta y espaciado** con los tokens de `references/paleta.md`. No uses colores sueltos: si falta uno, agrégalo como token en `src/app/globals.css`.
5. **Verifica de verdad.** Compila, saca capturas en móvil y escritorio, y mide el contraste (ver "Verificación"). No des algo por terminado si no lo viste en 390 px.

Para revisiones o auditorías, sigue `references/checklist.md` y su formato de reporte.

## Principios (el porqué en `references/principios-ux.md`)

- **Primero el celular.** Diseña para 375–390 px y luego amplía. Las acciones principales van al alcance del pulgar y ocupan el ancho completo en móvil.
- **La gente escanea, no lee.** Los títulos empiezan con la palabra que más informa. Usa párrafos cortos (2–3 líneas en móvil), cifras visibles ("16 pares", "46 cm") y listas en vez de bloques largos.
- **Una acción principal por pantalla.** El botón primario (`bg-brand`) es para la acción principal, normalmente WhatsApp. Las demás van en `secondary` o `ghost`. Dos primarios juntos compiten.
- **Jerarquía con pocas palancas.** Combina tamaño, peso, color y espacio, en ese orden. La serif (Cormorant) es para títulos y cifras; la sans (DM Sans) para lectura y la interfaz. Usa un solo `h1` por página y no saltes niveles de encabezado.
- **El espacio agrupa.** El espacio dentro de un grupo es menor que entre grupos. Las secciones usan el mismo ritmo vertical (`py-16 md:py-24`).
- **Los áreas táctiles miden al menos 44×44 px** (`h-11 w-11` o `min-h-11`), y los enlaces de lista también.
- **Contraste AA:** 4.5:1 para texto normal y 3:1 para texto grande, bordes de controles e íconos que dan información.
- **El contenido no depende de la animación.** `Reveal` solo decora: si el JavaScript falla, todo debe verse igual.
- **Cuida la confianza.** Los datos comerciales (teléfono, precio, colores, medidas, cobertura de envío) salen de `src/data/`, nunca del texto de un componente. Así un cambio se hace en un solo lugar y no hay datos contradictorios.

## Reglas específicas del proyecto

- **Datos:** `src/data/site-config.ts` guarda el teléfono, correo, redes, envíos y menú; `src/data/products.ts` guarda el producto, las variantes, las medidas, la capacidad y la ficha técnica. Si cambias una cifra, busca también sus apariciones en textos de SEO (`metadata` de cada página, `llms.txt`).
- **WhatsApp:** usa siempre `WhatsAppLink` con un `context` y un `location`, porque así arma el mensaje y registra la analítica. No escribas enlaces `wa.me` a mano.
- **Next.js 16:** lee la guía en `node_modules/next/dist/docs/` antes de usar una API que no conozcas (ver `AGENTS.md`).
- **Elementos `fixed` dentro del header:** el header usa `backdrop-blur`, que convierte al header en contenedor de sus hijos `fixed`. Por eso los overlays y paneles van fuera del `<header>`.
- **Swatches claros** (Blanco): llevan un borde marcado; con `ring-black/15` casi no se ven sobre `cream`.

## Verificación

```bash
npm run build && npx next start -p 3100 &
node .claude/skills/castora-ux-ui/scripts/capturas.js / /productos/zapatero-melina   # capturas móvil y escritorio
python3 .claude/skills/castora-ux-ui/scripts/contraste.py "#6f6359" "#f1e8dc"         # contraste de un par
```

`capturas.js` guarda las capturas por pantallazo (no de página completa, para que `Reveal` alcance a mostrarse) e informa si hay scroll horizontal. Míralas antes de terminar. Si el puerto 3100 ya está ocupado por otro servidor, ciérralo con `fuser -k 3100/tcp`: un servidor viejo sobre un build borrado devuelve CSS con error 500.

## Al entregar

Resume en lenguaje simple qué cambió, qué verificaste (con medidas: contraste, tamaños, anchos probados) y qué quedó pendiente. Si una decisión depende de Castora (textos, precios, datos), dilo en lugar de inventarlo.
