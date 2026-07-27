"use client";

import { Smartphone } from "lucide-react";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const CASES = ["Huele a Brujas", "Pink Beauty", "Lumiere", "Amora"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wine via-wine to-wine-dark pb-16 pt-14 text-cream sm:pt-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-strong/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-rose-light/10 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-float-slow opacity-20"
      >
        <Smartphone className="absolute right-10 top-24 h-16 w-16 -rotate-12 text-rose-light sm:right-20" />
      </div>

      <Container className="relative">
        <AnimatedSection>
          <Eyebrow className="bg-cream/10 text-rose-light">
            Lanzamiento · solo 5 cupos
          </Eyebrow>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="mt-6 max-w-3xl text-balance font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Soltá el celular y vendé en{" "}
            <span className="font-script font-semibold text-rose-light">
              automático,
            </span>{" "}
            con una web que habla por vos
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-6 max-w-xl text-balance text-lg text-cream/85 sm:text-xl">
            Tiendas online y landings a medida para emprendedoras que ya
            venden, pero están cansadas de que todo dependa de ellas.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <CTAButton href={whatsappLink(WHATSAPP_MESSAGES.hero)}>
              Quiero mi web
            </CTAButton>
            <CTAButton
              href={whatsappLink(WHATSAPP_MESSAGES.final)}
              variant="outline"
              className="border-cream/40 text-cream hover:bg-cream hover:text-wine"
            >
              Aplicar a los 5 cupos de lanzamiento
            </CTAButton>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-14 border-t border-cream/15 pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
              Marcas que ya confiaron
            </p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {CASES.map((brand) => (
                <span
                  key={brand}
                  className="font-script text-2xl text-rose-light/90"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
