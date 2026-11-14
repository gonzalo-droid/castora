import type { ProductDimensions as Dimensions } from "@/data/products";

/**
 * "¿Entra en tu espacio?": dibujo de frente y de lado a escala real, más las cifras.
 * El dibujo se calcula desde las medidas, así que se ajusta solo si cambian.
 */
export function ProductDimensions({ dimensions }: { dimensions: Dimensions }) {
  const { height, width, depth, levels, pairs } = dimensions;

  // Escala: el alto ocupa 170 px del dibujo.
  const scale = 170 / height;
  const h = height * scale;
  const fw = width * scale;
  const sw = depth * scale;
  const top = 34;
  const frontX = 92;
  const sideX = frontX + fw + 70;
  const viewW = sideX + sw + 40;
  const ground = top + h;
  const mid = fw / 2;
  // Estantes alternados: a la izquierda en pasos enteros, a la derecha a medio paso.
  const left = Array.from({ length: levels - 1 }, (_, i) => (h * (i + 1)) / levels);
  const right = Array.from({ length: levels }, (_, i) => (h * (i + 0.5)) / levels);

  const tiles = [
    { value: `${height} cm`, label: "de alto" },
    { value: `${width} cm`, label: "de ancho" },
    { value: `${depth} cm`, label: "de fondo" },
    { value: `${pairs}`, label: `pares en ${levels} niveles` },
  ];

  return (
    <div className="rounded-3xl border border-line bg-cream p-6 md:p-8">
      <p className="eyebrow">Medidas</p>
      <h2 className="mt-3 text-3xl leading-tight text-brand-deep md:text-4xl">¿Entra en tu espacio?</h2>

      <svg
        viewBox={`0 0 ${viewW} ${ground + 30}`}
        className="mt-6 h-auto w-full max-w-md font-sans"
        role="img"
        aria-label={`Dibujo del zapatero: ${height} cm de alto, ${width} cm de ancho y ${depth} cm de fondo`}
      >
        <line x1={24} y1={ground} x2={viewW - 24} y2={ground} className="stroke-line" strokeWidth={1.2} />

        {/* Frente */}
        <g transform={`translate(${frontX} ${top})`}>
          <rect width={fw} height={h} rx={2} className="fill-beige stroke-brand" strokeWidth={1.5} />
          <line x1={mid} y1={0} x2={mid} y2={h} className="stroke-brand" strokeWidth={1.2} />
          {left.map((y) => (
            <line key={`l${y}`} x1={0} y1={y} x2={mid} y2={y} className="stroke-brand" strokeWidth={1.2} />
          ))}
          {right.map((y) => (
            <line key={`r${y}`} x1={mid} y1={y} x2={fw} y2={y} className="stroke-brand" strokeWidth={1.2} />
          ))}
          {/* Alto */}
          <g className="stroke-brand-deep" strokeWidth={1}>
            <line x1={-16} y1={0} x2={-16} y2={h} />
            <line x1={-21} y1={0} x2={-11} y2={0} />
            <line x1={-21} y1={h} x2={-11} y2={h} />
          </g>
          <text x={-24} y={h / 2 + 4} textAnchor="end" fontSize={12} className="fill-brand-deep">
            {height} cm
          </text>
          {/* Ancho */}
          <g className="stroke-brand-deep" strokeWidth={1}>
            <line x1={0} y1={-12} x2={fw} y2={-12} />
            <line x1={0} y1={-16} x2={0} y2={-8} />
            <line x1={fw} y1={-16} x2={fw} y2={-8} />
          </g>
          <text x={fw / 2} y={-18} textAnchor="middle" fontSize={12} className="fill-brand-deep">
            {width} cm
          </text>
        </g>

        {/* Lado */}
        <g transform={`translate(${sideX} ${top})`}>
          <rect width={sw} height={h} rx={2} className="fill-beige stroke-brand" strokeWidth={1.5} />
          <g className="stroke-brand-deep" strokeWidth={1}>
            <line x1={0} y1={-12} x2={sw} y2={-12} />
            <line x1={0} y1={-16} x2={0} y2={-8} />
            <line x1={sw} y1={-16} x2={sw} y2={-8} />
          </g>
          <text x={sw / 2} y={-18} textAnchor="middle" fontSize={12} className="fill-brand-deep">
            {depth} cm
          </text>
        </g>

        <text x={frontX + fw / 2} y={ground + 20} textAnchor="middle" fontSize={11} className="fill-muted">
          Frente
        </text>
        <text x={sideX + sw / 2} y={ground + 20} textAnchor="middle" fontSize={11} className="fill-muted">
          Lado
        </text>
      </svg>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl border border-line bg-sand/60 px-4 py-3">
            <dt className="sr-only">{t.label}</dt>
            <dd className="font-serif text-3xl leading-none text-brand-deep">{t.value}</dd>
            <dd className="mt-1 text-sm text-muted">{t.label}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        Mide el rincón donde lo pondrías y deja unos centímetros libres a cada lado para sacar los zapatos con comodidad.
      </p>
    </div>
  );
}
