import { Moon, TrendingUp, Award, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const RESULTS = [
  {
    icon: Moon,
    text: "Vas a vender mientras dormís, sin estar pendiente del celular.",
  },
  {
    icon: TrendingUp,
    text: "Vas a dejar de perder ventas por demoras en responder.",
  },
  {
    icon: Award,
    text: "Vas a sentirte profesional, con una web a la altura de tu producto.",
  },
  {
    icon: Clock,
    text: "Vas a recuperar tiempo real para vos, sin culpa.",
  },
];

export default function Results() {
  return (
    <section className="bg-rose-light py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow className="bg-cream text-wine">Qué vas a lograr</Eyebrow>
        </AnimatedSection>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {RESULTS.map(({ icon: Icon, text }, i) => (
            <AnimatedSection key={text} delay={i * 0.08}>
              <div className="flex items-start gap-4 rounded-3xl bg-cream p-6 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine">
                  <Icon className="h-5 w-5 text-rose-light" strokeWidth={1.75} />
                </div>
                <p className="pt-1.5 text-balance font-medium text-ink/85">
                  {text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
