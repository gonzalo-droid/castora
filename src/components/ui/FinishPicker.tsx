"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Check } from "lucide-react";

type Finish = { id: string; name: string; swatch: string };

type Props = {
  finishes: readonly Finish[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

/**
 * Selector de acabado (círculos de color con su nombre).
 * Grupo de radios accesible: una sola parada de Tab; flechas, Inicio y Fin cambian el acabado.
 * Cada color muestra su nombre para distinguir Macadamia y Roble Natural sin tocarlos.
 */
export function FinishPicker({ finishes, value, onChange, className = "" }: Props) {
  const index = Math.max(0, finishes.findIndex((f) => f.id === value));
  const current = finishes[index];

  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = -1;
    if (e.key in steps) next = (index + steps[e.key] + finishes.length) % finishes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = finishes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(finishes[next].id);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
  };

  return (
    <fieldset className={className}>
      <legend className="text-sm text-muted">
        Acabado: <span className="font-semibold text-brand-deep">{current.name}</span>
      </legend>
      {/* Columnas iguales: los nombres a 14 px ("Macadamia" en negrita mide ~78 px) entran desde 375 px de ancho. */}
      <div
        className="mt-3 grid gap-x-1 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${finishes.length}, minmax(0, 5.5rem))` }}
        role="radiogroup"
        aria-label="Acabado"
        onKeyDown={onKey}
      >
        {finishes.map((f) => {
          const selected = f.id === current.id;
          return (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(f.id)}
              className="group flex w-full flex-col items-center gap-2 rounded-xl py-1 text-center"
            >
              <span
                aria-hidden="true"
                className={`relative h-12 w-12 rounded-full ring-offset-[3px] ring-offset-cream transition ${
                  selected ? "ring-2 ring-brand" : "ring-1 ring-black/45 group-hover:ring-brand"
                }`}
                style={{ background: f.swatch }}
              >
                {selected && (
                  <Check size={16} className={`absolute inset-0 m-auto ${isLight(f.swatch) ? "text-brand-deep" : "text-cream"}`} />
                )}
              </span>
              <span className={`text-sm leading-tight ${selected ? "font-semibold text-brand-deep" : "text-muted group-hover:text-brand-deep"}`}>
                {f.name}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}
