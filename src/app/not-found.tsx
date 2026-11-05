import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl text-brand-deep md:text-6xl">Esta página no existe</h1>
      <p className="mt-4 max-w-md text-muted">Puede que el enlace haya cambiado. Te invitamos a conocer nuestro primer lanzamiento.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Ir al inicio</ButtonLink>
        <ButtonLink href="/productos/zapatero-melina" variant="secondary">
          Ver Zapatero Melina
        </ButtonLink>
      </div>
    </section>
  );
}
