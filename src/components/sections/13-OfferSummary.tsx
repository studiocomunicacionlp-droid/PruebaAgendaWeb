import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const INCLUDES = [
  "Tienda online o landing a medida (Método Libre o Método Impacto)",
  "Manual de criterio para mantener tu web sola",
  "3 videos tutoriales: cargar productos, modificar diseño, conectar medio de pago",
  "Acompañamiento de 1 mes por WhatsApp",
  "Bono de lanzamiento: kit de arranque de contenido",
];

export default function OfferSummary() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border-2 border-rose bg-white p-8 shadow-soft sm:p-12">
          <AnimatedSection>
            <span className="inline-block rounded-full bg-wine px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream">
              Resumen de la oferta
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mt-5 text-balance text-lg leading-relaxed text-ink/80">
              En Método Libre o Método Impacto, ayudo a emprendedoras que
              venden por Instagram y WhatsApp a dejar de ser esclavas de su
              negocio, mediante un proceso de diagnóstico, implementación y
              acompañamiento, en 30 días. Vas a vender sin estar pegada al
              celular, vas a recuperar tu tiempo y vas a sentirte
              profesional.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ul className="mt-7 space-y-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-rose-strong" strokeWidth={2.5} />
                  <span className="text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-8 border-t border-rose-light pt-6">
              <p className="font-heading text-lg font-bold text-wine">
                Precio de lanzamiento
              </p>
              <p className="text-sm text-ink/60">Cupos: 5</p>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
