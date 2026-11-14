# Checklist de revisión UX/UI

Úsala al terminar un cambio visible o cuando pidan "revisa el sitio" o una auditoría. Revisa en **390 px** (iPhone) y **1280 px**, y en 768 px si hay dos columnas.

## Rápida (en cada cambio)
- [ ] Compila (`npm run build`) y pasa `npx eslint src`.
- [ ] Sin scroll horizontal en 390 px (`capturas.js` lo informa).
- [ ] Una sola acción primaria por pantalla; WhatsApp con `WhatsAppLink` y el `context` correcto.
- [ ] Los textos nuevos cumplen el contraste de `paleta.md` (mide si usas opacidad o un fondo nuevo).
- [ ] Áreas táctiles de al menos 44 px; enlaces de lista con `min-h-11`.
- [ ] Encabezados en orden; un `h1`.
- [ ] Los datos (teléfono, cifras, colores) salen de `src/data/`; busca las copias en metadata y SEO con `grep`.
- [ ] Reutilizaste componentes existentes; nada duplicado.
- [ ] Viste las capturas tú mismo.

## Completa (auditoría)
Pon un puntaje de 1 a 5 a cada área: Usabilidad, Accesibilidad, Diseño visual, Responsive, Estados, Contenido, Rendimiento percibido y Consistencia del sistema de diseño.

Interacciones a probar con Playwright: abrir y cerrar el menú (X, overlay, Escape, navegar), elegir un color en el producto y revisar el `#hash` y el mensaje de WhatsApp, enviar el formulario vacío y lleno, y hacer scroll para ver la barra fija del producto.

## Formato del reporte
Guárdalo en `docs/ux-audit-AAAA-MM-DD.md` (sigue el ejemplo de `docs/ux-audit-2026-11-08.md`):

```
# Auditoría UX/UI — Castora Perú (<alcance>, <fecha>)
## Resumen            ← puntaje general y los 3 hallazgos más importantes
## Puntaje por área   ← tabla Área | Puntaje | Nota
## Hallazgos          ← ### [Alto|Medio|Bajo] Título — Dónde (ruta + archivo:línea), Evidencia (medida), Problema, Arreglo
## Lo que está bien
## No verificado
## Backlog sugerido   ← tandas por esfuerzo
```

La evidencia lleva números (ratio de contraste, píxeles, segundos) y el arreglo dice el cambio concreto. Cuando se corrija, agrega una tabla "Antes / Después".
