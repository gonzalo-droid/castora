# Investigación: principios de UI/UX web y móvil

Resumen de la investigación hecha al crear esta skill (noviembre de 2026). Cada principio incluye el porqué, para aplicarlo con criterio y no como regla ciega. Las fuentes principales están al final; varias son secundarias, así que contrasta las cifras con la fuente original antes de citarlas.

## 1. Escaneo y jerarquía visual
- Según los estudios de eye-tracking de Nielsen Norman Group, la gente **escanea** antes de leer, y el patrón en **F** aparece cuando el texto no tiene formato que guíe la vista. Pasa en escritorio y en celular.
- Las primeras líneas y las primeras palabras de cada título reciben más atención. Por eso los títulos y subtítulos empiezan con la palabra que más informa.
- El buen formato (títulos claros, listas, cifras destacadas, negritas puntuales) cambia el patrón y hace que la gente encuentre lo que busca.
- La jerarquía se construye con tamaño, peso, color, contraste, espacio y posición. Un solo punto focal por bloque: si todo resalta, nada resalta.

## 2. Divulgación progresiva y organización
- Muestra primero lo esencial y deja el detalle a un paso, para reducir la carga mental sin esconder lo importante.
- Agrupa por proximidad: los elementos relacionados van juntos y separados de otros grupos por más espacio (ley de proximidad de la Gestalt).

## 3. Móvil
- **Áreas táctiles:** WCAG 2.2 (criterio 2.5.8, nivel AA) pide al menos 24×24 px CSS o suficiente separación. El nivel AAA (2.5.5), Apple (44×44 pt) y Material (48×48 dp) piden más. **En Castora usamos 44 px**, que cumple todas.
- **Zona del pulgar:** las acciones frecuentes van abajo o al ancho completo; los menús se cierran con un toque fuera, con una X grande y con Escape.
- **CTA fijo en producto:** una barra inferior discreta con producto, color y botón ayuda a no perder la acción al bajar. Hay estudios A/B con resultados mixtos: funciona si es discreta y no tapa contenido, y estorba si distrae o tapa. Por eso en Castora aparece solo entre el CTA principal y el footer.
- Usa texto de al menos 16 px y nada de scroll horizontal accidental. Prueba en 375–390 px.

## 4. Color y contraste
- WCAG AA pide 4.5:1 para texto normal y 3:1 para texto grande y para componentes de interfaz (bordes de controles, íconos que informan). Los placeholders también cuentan.
- Organiza los colores en tokens con nombre por rol (fondo, texto, acento). Así cada uso tiene un nombre y un cambio de marca se hace en un solo lugar.
- 60-30-10 es una guía de peso visual (base, apoyo y acento), no una norma. El acento se reserva para lo que se toca o se tiene que notar.
- El color no puede ser la única señal: el estado activo también lleva un subrayado, un punto o un check.

## 5. Formularios
- Usa etiquetas visibles: el placeholder desaparece al escribir y no sirve como etiqueta.
- El `type` y el `autocomplete` correctos activan el teclado adecuado y el autocompletado, con menos errores y menos abandono (guía de Chrome for Developers).
- Valida al salir del campo, no en cada tecla. No muestres errores antes de que la persona escriba. No deshabilites el botón de envío sin explicar qué falta.

## 6. Accesibilidad base
- Un `h1` por página, encabezados sin saltos, landmarks (`header`, `nav`, `main`, `footer`), enlace para saltar al contenido, `alt` descriptivo y foco visible.
- Respeta `prefers-reduced-motion`. Las animaciones no pueden ser necesarias para ver el contenido.

## Fuentes
- [NN/g – F-Shaped Pattern of Reading on the Web](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [NN/g – Web UX Study Guide](https://www.nngroup.com/articles/web-ux-study-guide/)
- [UX Planet – Designing for scanning](https://uxplanet.org/designing-for-scanning-a5b953a2ec46)
- [CareerFoundry – Visual hierarchy in UX](https://careerfoundry.com/blog/ux-design/what-is-visual-hierarchy)
- [Wayne State – Grouping items for on-page progressive disclosure](https://web-team-blog.apps.wayne.edu/2021/12/09/grouping-items-for-on-page-progressive-disclosure)
- [TetraLogical – Foundations: target sizes](https://tetralogical.com/blog/2022/12/20/foundations-target-size/)
- [Guía de WCAG 2.5.8 Target Size (Minimum)](https://allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide)
- [GoodUI – Sticky Call To Action](https://goodui.org/patterns/41)
- [Chrome for Developers – Color](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/color)
- [UXPin – Choosing a UI color palette](https://www.uxpin.com/studio/blog/choose-color-pallete/)
- [Chrome for Developers – Sign-up form best practices](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/autofill-sign-up-form)
- [Smashing Magazine – Designing efficient web forms](https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms)
