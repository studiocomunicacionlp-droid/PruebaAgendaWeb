import { Search, Hammer, GraduationCap, Headset } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const MODULES = [
  {
    icon: Search,
    title: "Módulo 1 — Diagnóstico",
    text: "Entendemos dónde estás perdiendo tiempo y ventas hoy.",
  },
  {
    icon: Hammer,
    title: "Módulo 2 — Implementación",
    text: "Armamos tu tienda o landing a medida.",
  },
  {
    icon: GraduationCap,
    title: "Módulo 3 — Autonomía",
    text: "Manual de criterio + 3 videos: cargar productos, modificar diseño, conectar medio de pago.",
  },
  {
    icon: Headset,
    title: "Módulo 4 — Acompañamiento",
    text: "1 mes de soporte por WhatsApp para dudas de uso.",
  },
];

export default function Program() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>Contenido del programa</Eyebrow>
        </AnimatedSection>

        <div className="mt-9 space-y-5">
          {MODULES.map(({ icon: Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="flex flex-col gap-4 rounded-3xl bg-rose-light/40 p-6 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wine">
                  <Icon className="h-6 w-6 text-rose-light" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-wine">
                    {title}
                  </h3>
                  <p className="mt-1 text-ink/75">{text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
