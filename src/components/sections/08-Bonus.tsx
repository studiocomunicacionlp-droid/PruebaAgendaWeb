import { Gift } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Bonus() {
  return (
    <section className="bg-cream px-6 py-4 sm:py-8">
      <Container className="px-0">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-strong to-wine px-7 py-10 text-cream shadow-soft sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cream/10" />
            <span className="inline-block rounded-full bg-cream/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              Bono exclusivo de lanzamiento
            </span>
            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Gift className="h-12 w-12 shrink-0 text-rose-light" strokeWidth={1.5} />
              <div>
                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  Kit de arranque de contenido
                </h3>
                <p className="mt-2 max-w-xl text-balance text-cream/90">
                  Mini-set de plantillas de Canva (posts e historias) para
                  anunciar tu nueva tienda o landing en redes desde el día 1.
                  Exclusivo para las 5 clientas de esta edición de
                  lanzamiento.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
