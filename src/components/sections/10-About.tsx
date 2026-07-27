import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-wine py-20 text-cream sm:py-28">
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-rose-strong/20 blur-3xl" />

      <Container className="relative grid items-center gap-10 md:grid-cols-[220px_1fr] md:gap-14">
        <AnimatedSection direction="left">
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-4 border-rose-light/40 bg-cream/10 sm:h-52 sm:w-52 md:mx-0">
            <span className="font-script text-6xl text-rose-light">LP</span>
          </div>
        </AnimatedSection>

        <div>
          <AnimatedSection>
            <Eyebrow className="bg-cream/10 text-rose-light">
              Sobre Lucía
            </Eyebrow>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mt-5 text-balance text-lg leading-relaxed text-cream/90 sm:text-xl">
              Vengo del periodismo deportivo, y antes de dedicarme a esto
              tuve mi propia tienda de e-commerce y un local físico — sé lo
              que es vender en carne propia, no solo diseñar para otras.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-balance text-lg leading-relaxed text-cream/90 sm:text-xl">
              Hoy soy Partner certificada de Tiendanube y ayudo a otras
              emprendedoras a no pasar por lo que a mí me costó resolver
              sola.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="mt-7 font-script text-4xl text-rose-light">
              Sos Libre.
            </p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
