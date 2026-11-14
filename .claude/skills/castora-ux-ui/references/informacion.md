# Qué información mostrar y cómo organizarla

## Mostrar lo necesario

Antes de agregar un dato, pregúntate: **¿esto ayuda a decidir o a escribir por WhatsApp?** Si no, va a un segundo nivel (detalle, acordeón, otra página) o se elimina.

Lo que una persona necesita para pedir un mueble, en orden:
1. **Qué es y cómo se ve:** nombre, una foto buena y una frase de beneficio.
2. **Si le sirve:** capacidad (pares), medidas (alto × ancho × fondo) y colores disponibles.
3. **Cuánto y cuándo:** precio o "Precio a cotizar", disponibilidad del color y forma de entrega.
4. **Confianza:** se entrega armado, envíos en Lima, material (melamina de 18 mm) y canales reales (Instagram, TikTok).
5. **Cómo pedir:** un botón de WhatsApp con el producto y el color ya escritos en el mensaje.

No muestres datos marcados como PROVISIONAL en `src/data/` como si fueran definitivos. Si un dato falta, pregunta en vez de inventarlo.

## Jerarquía dentro de una pantalla

1. **Punto focal:** un solo elemento dominante (título o foto). En móvil, que el primer pantallazo responda "qué es" y deje ver la acción principal o el inicio de la siguiente sección.
2. **Apoyo:** descripción breve y datos clave como cifras grandes, no escondidas en un párrafo.
3. **Acción:** botón primario y, como mucho, uno secundario.
4. **Detalle:** especificaciones, entrega y preguntas frecuentes, más abajo y en listas escaneables.

Los títulos llevan la información al inicio ("Hasta 16 pares", no "Una gran capacidad para tus zapatos"). Los enlaces dicen a dónde llevan ("Ver producto", "Escríbenos por WhatsApp"), nunca "clic aquí".

## Organización de las secciones

- **Agrupa por tarea**, no por tipo de dato: todo lo de "¿entra en mi espacio?" (medidas y dibujo) junto, y todo lo de "¿cómo lo recibo?" (entrega, envío y armado) junto.
- **Orden del inicio:** hero (qué es + CTA) → beneficios (por qué) → producto y colores (elige) → marca (confía) → CTA final (actúa). Si agregas una sección, ubícala según esa secuencia.
- **En móvil, el orden sigue la lectura:** las acciones van **después** del contenido que las justifica (por ejemplo, los botones debajo del carrusel de colores). Con dos columnas en escritorio, revisa cómo se apilan en móvil y reordena con grid o `order` si hace falta.
- **Formularios:** van cerca del inicio de la página de contacto, no después de largas listas.
- **Divulgación progresiva:** muestra primero lo esencial y deja lo secundario a un toque. No escondas lo que decide la compra (medidas, colores, precio).
- **Consistencia:** el mismo dato se ve igual en todas partes ("16 pares", "Lima Metropolitana", "+51 941 808 373"), siempre leído desde `src/data/`.

## Formularios

- Usa una etiqueta visible por campo; el placeholder solo da un ejemplo y nunca reemplaza a la etiqueta.
- Usa el `type` y el `autocomplete` correctos (`name`, `email`, `tel`), con `inputmode` cuando el `type` no alcance. Así el celular muestra el teclado adecuado y el autocompletado funciona.
- Valida al salir del campo o al enviar, no en cada tecla. Los mensajes de error dicen qué corregir, junto al campo, y anuncian el cambio con `aria-live`.
- No deshabilites el botón de envío para "obligar" a corregir. Muestra el estado de envío ("Enviando…") y un resultado claro (enviado, error o alternativa por WhatsApp).
- Pide pocos campos: nombre, correo y mensaje. Cada campo extra hace que más gente abandone.

## Estados que siempre hay que diseñar

Carga, vacío, error, éxito, sin JavaScript, sin imagen (fondo `sand` mientras carga) y texto largo (nombres de color o mensajes extensos que no deben romper el layout).
