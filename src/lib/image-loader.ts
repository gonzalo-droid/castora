"use client";

// Loader de next/image para el export estático: apunta a las versiones WebP que
// genera scripts/optimize-images.mjs (mismos anchos que deviceSizes + imageSizes).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const WIDTHS = [96, 128, 256, 384, 640, 828, 1080, 1200];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // Solo las imágenes locales de /products y /brand tienen versiones generadas.
  if (!/^\/(products|brand)\/.+\.(jpe?g|png)$/i.test(src)) return `${BASE_PATH}${src}`;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${BASE_PATH}/_img${src.replace(/\.(jpe?g|png)$/i, "")}-${w}.webp`;
}
