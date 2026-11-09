import Image from "next/image";
import Link from "next/link";

type Props = {
  tone?: "brown" | "cream";
  layout?: "horizontal" | "stacked";
  /** Solo el logo del header: se carga de inmediato. El resto (footer) es diferido. */
  eager?: boolean;
  className?: string;
};

// Versiones derivadas del logo oficial (public/brand). Reemplazar por SVG cuando esté disponible.
// width/height son el tamaño en pantalla (no el del archivo), así Next sirve una versión
// pequeña en vez de la de 1920 px.
export function Logo({ tone = "brown", layout = "horizontal", eager = false, className = "" }: Props) {
  const horizontal = layout === "horizontal";
  return (
    <Link href="/" aria-label="Castora, ir al inicio" className={`inline-flex shrink-0 ${className}`}>
      <Image
        src={`/brand/logo-${horizontal ? "horizontal-" : ""}${tone}.png`}
        alt="Castora"
        width={horizontal ? 160 : 116}
        height={horizontal ? 36 : 96}
        loading={eager ? "eager" : "lazy"}
        className={horizontal ? "h-8 w-auto md:h-9" : "h-24 w-auto"}
      />
    </Link>
  );
}
