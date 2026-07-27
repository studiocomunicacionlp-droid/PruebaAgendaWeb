import { Store } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const BRANDS = [
  "Bisnes",
  "La Boutique",
  "Mateando Santa Fe",
  "Relivia",
  "Whitening Pro",
  "Inspira",
];

export default function TrustedBrands() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="text-center">
            <Eyebrow>Marcas que ya confiaron</Eyebrow>
          </div>
        </AnimatedSection>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((brand, i) => (
            <AnimatedSection key={brand} delay={i * 0.05}>
              <div className="flex h-full flex-col items-center gap-2 rounded-2xl border-2 border-rose-light bg-white px-4 py-6 text-center shadow-card">
                <Store className="h-5 w-5 text-rose-strong" strokeWidth={1.75} />
                <span className="font-heading text-sm font-semibold text-wine">
                  {brand}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
