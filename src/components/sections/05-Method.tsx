import { ShoppingBag, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const PROCESS = [
  "Llamada inicial",
  "Formulario y relevamiento",
  "Diagnóstico",
  "Implementación",
  "Entrega",
  "Acompañamiento de 1 mes",
];

export default function Method() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>La solución</Eyebrow>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mt-6 max-w-3xl text-balance font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Ayudo a emprendedoras que ya venden por Instagram y WhatsApp a
            dejar de ser esclavas de su negocio dependiente 100% del celular,
            mediante mis métodos{" "}
            <span className="text-rose-strong">Libre</span> (tiendas online)
            e <span className="text-wine">Impacto</span> (landings), para que
            en 30 días tengan un negocio que vende aunque no estén
            respondiendo mensajes.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatedSection direction="left" delay={0.15}>
            <div className="flex h-full flex-col gap-4 rounded-3xl border-2 border-rose bg-rose-light/40 p-7">
              <ShoppingBag className="h-8 w-8 text-rose-strong" strokeWidth={1.75} />
              <h3 className="font-heading text-xl font-bold text-wine">
                Método Libre
              </h3>
              <p className="text-ink/75">
                Para quien vende productos y necesita catálogo, stock, cobro
                y envío resueltos solos.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="flex h-full flex-col gap-4 rounded-3xl border-2 border-wine bg-wine p-7 text-cream">
              <Target className="h-8 w-8 text-rose-light" strokeWidth={1.75} />
              <h3 className="font-heading text-xl font-bold">
                Método Impacto
              </h3>
              <p className="text-cream/80">
                Para quien vende un servicio o producto puntual y necesita
                una página que explique, muestre y cierre la venta sin
                responder “cuánto sale” cien veces por día.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <p className="mx-auto mt-14 max-w-lg text-center font-script text-3xl text-wine sm:text-4xl">
            “Yo dejé de vender sola para construir algo que vende por mí. Hoy
            te ayudo a hacer lo mismo.”
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wine font-heading font-bold text-cream">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm font-medium text-ink/75">{step}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
