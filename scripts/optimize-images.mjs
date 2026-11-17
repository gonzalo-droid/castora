// Genera versiones WebP de las fotos y logos para el export estático (GitHub Pages
// no tiene optimizador de imágenes). Corre solo antes de `dev` y `build`.
//
// public/products/zapatero-melina/nogal.jpg → public/_img/products/zapatero-melina/nogal-640.webp, -828, …
// src/lib/image-loader.ts arma la misma ruta, así que los anchos deben coincidir
// con deviceSizes + imageSizes de next.config.ts.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const SOURCES = ["products", "brand"];
const OUT = path.join(ROOT, "_img");
const WIDTHS = [96, 128, 256, 384, 640, 828, 1080, 1200];
const QUALITY = 75;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let made = 0;
let skipped = 0;
for (const source of SOURCES) {
  for await (const file of walk(path.join(ROOT, source))) {
    const rel = path.relative(ROOT, file).replace(/\.(jpe?g|png)$/i, "");
    const srcTime = (await stat(file)).mtimeMs;
    await mkdir(path.dirname(path.join(OUT, rel)), { recursive: true });
    for (const w of WIDTHS) {
      const out = path.join(OUT, `${rel}-${w}.webp`);
      const done = await stat(out).catch(() => null);
      if (done && done.mtimeMs >= srcTime) {
        skipped++;
        continue;
      }
      // withoutEnlargement: si la foto es más chica que el ancho pedido, queda a su tamaño.
      await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
      made++;
    }
  }
}
console.log(`optimize-images: ${made} generadas, ${skipped} al día`);
