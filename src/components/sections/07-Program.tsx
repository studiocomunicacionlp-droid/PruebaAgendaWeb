import {
  Phone,
  ClipboardList,
  Search,
  Hammer,
  PackageCheck,
  Headset,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const STAGES = [
  {
    icon: Phone,
    title: "1. Llamada inicial",
    text: "Nos conocemos: entiendo qué vendés, cómo vendés hoy y qué necesitás.",
  },
  {
    icon: ClipboardList,
    title: "2. Formulario y relevamiento",
    text: "Me pasás fotos, logo, paleta, productos o servicios y precios.",
  },
  {
    icon: Search,
    title: "3. Diagnóstico",
    text: "Vemos juntas dónde estás perdiendo tiempo y ventas hoy.",
  },
  {
    icon: Hammer,
    title: "4. Implementación",
    text: "Armo tu tienda o landing a medida, con todo lo que necesita para vender sola.",
  },
  {
    icon: PackageCheck,
    title: "5. Entrega",
    text: "Recibís tu tienda o landing funcionando, con manual de criterio y videos.",
  },
  {
    icon: Headset,
    title: "6. Acompañamiento",
    text: "1 mes de soporte por WhatsApp para resolver dudas de uso.",
  },
];

export default function Program() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>Etapas del servicio</Eyebrow>
        </AnimatedSection>

        <div className="mt-9 space-y-5">
          {STAGES.map(({ icon: Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.06}>
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
