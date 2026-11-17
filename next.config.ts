import type { NextConfig } from "next";

// GitHub Pages sirve el sitio en /castora (gonzalo-lozg.me/castora).
// Con dominio propio, NEXT_PUBLIC_BASE_PATH queda vacío.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Sitio 100% estático: GitHub Pages solo sirve archivos.
  output: "export",
  basePath,
  images: {
    // Sin servidor de imágenes: scripts/optimize-images.mjs genera las versiones WebP
    // en el build y src/lib/image-loader.ts elige la del ancho pedido.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
