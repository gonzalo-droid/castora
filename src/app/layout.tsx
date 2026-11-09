import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site-config";
import { defaultOgImage } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Castora Perú · Muebles para organizar tu hogar",
    template: "%s · Castora Perú",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f8f3ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" data-scroll-behavior="smooth" className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-cream"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
