import { Coffee, Moon, Heart } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const MOMENTS = [
  { icon: Coffee, label: "Tomando un café" },
  { icon: Heart, label: "Con tus hijos" },
  { icon: Moon, label: "Durmiendo" },
];

export default function PointB() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-strong/20 blur-3xl" />

      <Container className="relative text-center">
        <AnimatedSection>
          <p className="mx-auto max-w-3xl text-balance font-heading text-2xl font-semibold leading-snug sm:text-4xl">
            Imaginá poder salir un sábado sin el celular pegado a la mano,
            sabiendo que tu tienda sigue vendiendo.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-balance font-script text-3xl text-rose-light sm:text-4xl">
            Visualizá tu negocio funcionando mientras estás...
          </p>
        </AnimatedSection>

        <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-6">
          {MOMENTS.map(({ icon: Icon, label }, i) => (
            <AnimatedSection key={label} delay={0.2 + i * 0.1}>
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-cream/5 px-6 py-5">
                <Icon className="h-7 w-7 text-rose-light" strokeWidth={1.5} />
                <span className="text-sm text-cream/80">{label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <p className="mx-auto mt-10 max-w-xl text-balance text-lg text-cream/85">
            Sin la culpa de “tengo que contestar”. Sentirte dueña de tu
            tiempo, no esclava de tu negocio.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
