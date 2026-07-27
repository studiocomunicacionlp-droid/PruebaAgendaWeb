import { PenTool, Megaphone, RefreshCcw } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const REASONS = [
  {
    icon: PenTool,
    text: "Intentaste armarlo vos misma, con Canva o el editor gratis de la plataforma.",
  },
  {
    icon: Megaphone,
    text: "Pagaste un community manager que no entendía de estructura de venta, solo de contenido.",
  },
  {
    icon: RefreshCcw,
    text: "Seguís dependiendo de WhatsApp porque nunca tuviste algo que reemplace ese ida y vuelta.",
  },
];

export default function WhyNotWorked() {
  return (
    <section className="bg-rose-light py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow className="bg-cream text-wine">
            Por qué lo que hiciste hasta ahora no funcionó
          </Eyebrow>
        </AnimatedSection>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {REASONS.map(({ icon: Icon, text }, i) => (
            <AnimatedSection key={text} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream p-6 shadow-card">
                <Icon className="h-7 w-7 text-rose-strong" strokeWidth={1.75} />
                <p className="text-balance font-medium text-ink/80">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.35}>
          <p className="mx-auto mt-14 max-w-2xl text-balance text-center font-heading text-2xl font-bold text-wine sm:text-3xl">
            El problema no sos vos. Es que nadie te armó algo pensado para
            que vendiera sin necesitarte todo el tiempo.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
