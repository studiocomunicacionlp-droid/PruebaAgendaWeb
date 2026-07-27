import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const CASES = ["Huele a Brujas", "Pink Beauty", "Lumiere", "Amora"];

export default function SocialProof() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>Casos reales</Eyebrow>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mt-6 max-w-2xl text-balance text-lg text-ink/75">
            Marcas que ya confiaron en mí para dejar de depender del celular
            y empezar a vender con una tienda o landing propia.
          </p>
        </AnimatedSection>

        <div className="mt-8 flex flex-wrap gap-4">
          {CASES.map((brand, i) => (
            <AnimatedSection key={brand} delay={0.15 + i * 0.06}>
              <span className="inline-block rounded-2xl border-2 border-rose bg-rose-light/30 px-6 py-4 font-script text-2xl text-wine">
                {brand}
              </span>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
