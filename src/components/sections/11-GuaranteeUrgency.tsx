import { ShieldCheck, Timer } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GuaranteeUrgency() {
  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <Container className="grid gap-8 md:grid-cols-2">
        <AnimatedSection direction="left">
          <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream/5 p-7">
            <Timer className="h-8 w-8 text-rose-light" strokeWidth={1.75} />
            <h3 className="font-heading text-xl font-bold">
              Urgencia real
            </h3>
            <p className="text-cream/75">
              Precio de lanzamiento, solo{" "}
              <span className="font-semibold text-rose-light">5 cupos</span>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.1}>
          <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream/5 p-7">
            <ShieldCheck className="h-8 w-8 text-rose-light" strokeWidth={1.75} />
            <h3 className="font-heading text-xl font-bold">
              Mi garantía de proceso
            </h3>
            <p className="text-balance text-cream/75">
              No te garantizo cuántas ventas vas a hacer — eso depende de tu
              producto, tu momento y tu mercado. Lo que sí te garantizo es
              que vas a tener una tienda o landing profesional, funcionando,
              y que vas a saber usarla sola cuando termine el
              acompañamiento.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
