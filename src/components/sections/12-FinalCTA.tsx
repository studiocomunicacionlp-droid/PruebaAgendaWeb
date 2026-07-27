import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-strong via-wine to-wine-dark py-24 text-center text-cream sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/5 blur-3xl" />

      <Container className="relative">
        <AnimatedSection>
          <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Tu negocio ya vende. Ahora hacé que venda sin vos pegada al
            celular.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-10">
            <CTAButton
              href={whatsappLink(WHATSAPP_MESSAGES.final)}
              variant="dark"
              className="bg-cream !text-wine hover:bg-rose-light px-10 py-5 text-lg"
            >
              Quiero ser una de las 5
            </CTAButton>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
