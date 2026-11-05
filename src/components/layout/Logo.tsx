import Image from "next/image";
import Link from "next/link";

type Props = {
  tone?: "brown" | "cream";
  layout?: "horizontal" | "stacked";
  className?: string;
};

// Versiones derivadas del logo oficial (public/brand). Reemplazar por SVG cuando esté disponible.
export function Logo({ tone = "brown", layout = "horizontal", className = "" }: Props) {
  const horizontal = layout === "horizontal";
  return (
    <Link href="/" aria-label="Castora, ir al inicio" className={`inline-flex shrink-0 ${className}`}>
      <Image
        src={`/brand/logo-${horizontal ? "horizontal-" : ""}${tone}.png`}
        alt="Castora"
        width={horizontal ? 622 : 376}
        height={horizontal ? 140 : 312}
        priority={horizontal}
        className={horizontal ? "h-8 w-auto md:h-9" : "h-24 w-auto"}
      />
    </Link>
  );
}
