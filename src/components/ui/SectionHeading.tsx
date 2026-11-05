import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as: H = "h2", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <H className={`${H === "h1" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"} leading-[1.05] text-brand-deep`}>
        {title}
      </H>
      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </div>
  );
}
