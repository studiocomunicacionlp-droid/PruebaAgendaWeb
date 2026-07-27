import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const IDENTIFICATION_PHRASES = [
  "Si hoy contestás lo mismo cien veces por día...",
  "Si tenés miedo de soltar el celular un rato porque “y si me escribe alguien”...",
  "Si sentís que tu negocio te devoró el tiempo que antes era tuyo...",
];

export default function ProblemPointA() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>¿Te suena conocido?</Eyebrow>
        </AnimatedSection>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatedSection direction="left">
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-ink p-7 text-cream shadow-card">
              <MessageCircle className="h-8 w-8 text-rose-light" />
              <p className="font-heading text-xl font-semibold leading-snug text-balance">
                “No tengo una tienda o landing que venda sola, todo pasa por
                mis DMs y mi WhatsApp.”
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-rose-light p-7 shadow-card">
              <span className="font-script text-4xl text-wine">💭</span>
              <p className="font-heading text-xl font-semibold leading-snug text-wine text-balance">
                “Estoy cansada de estar pegada al celular. Me pierdo momentos
                con mis hijos, con mi pareja, conmigo misma, por estar
                respondiendo consultas.”
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-14 space-y-5 border-l-2 border-rose-strong pl-6">
          {IDENTIFICATION_PHRASES.map((phrase, i) => (
            <AnimatedSection key={phrase} delay={0.15 + i * 0.08}>
              <p className="font-heading text-lg font-medium italic text-ink/80 sm:text-xl">
                {phrase}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
