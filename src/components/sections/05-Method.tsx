import {
  ShoppingBag,
  Target,
  Check,
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

const LIBRE_INCLUDES = [
  "Diagnóstico de tu venta actual",
  "Implementación a medida",
  "Manual de criterio",
  "3 videos tutoriales",
  "1 mes de acompañamiento",
];

const IMPACTO_INCLUDES = [
  "Diagnóstico de tu venta actual",
  "Implementación a medida",
  "Manual de criterio",
  "1 mes de acompañamiento",
];

const PROCESS = [
  { icon: Phone, label: "Llamada inicial" },
  { icon: ClipboardList, label: "Formulario y relevamiento" },
  { icon: Search, label: "Diagnóstico" },
  { icon: Hammer, label: "Implementación" },
  { icon: PackageCheck, label: "Entrega" },
  { icon: Headset, label: "Acompañamiento de 1 mes" },
];

export default function Method() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>La solución</Eyebrow>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mt-6 max-w-2xl text-balance font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Dos métodos, un mismo objetivo: que tu negocio venda sin que vos
            tengas que estar siempre disponible.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatedSection direction="left" delay={0.15}>
            <div className="flex h-full flex-col gap-5 rounded-3xl border-2 border-rose bg-rose-light/40 p-7">
              <ShoppingBag className="h-8 w-8 text-rose-strong" strokeWidth={1.75} />
              <div>
                <h3 className="font-heading text-xl font-bold text-wine">
                  Método Libre
                </h3>
                <p className="mt-1 text-ink/75">
                  Para quien vende productos y necesita catálogo, stock,
                  cobro y envío resueltos solos.
                </p>
              </div>
              <ul className="space-y-2">
                {LIBRE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-rose-strong"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-rose pt-4">
                <p className="text-xs uppercase tracking-[0.15em] text-wine/70">
                  Precio de lanzamiento
                </p>
                <p className="font-heading text-2xl font-extrabold text-wine">
                  Desde $250.000
                </p>
                <p className="text-xs text-ink/60">Varía según cantidad de productos</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="flex h-full flex-col gap-5 rounded-3xl border-2 border-wine bg-wine p-7 text-cream">
              <Target className="h-8 w-8 text-rose-light" strokeWidth={1.75} />
              <div>
                <h3 className="font-heading text-xl font-bold">
                  Método Impacto
                </h3>
                <p className="mt-1 text-cream/80">
                  Para quien vende un servicio o producto puntual y necesita
                  una landing individual a medida que explique, muestre y
                  cierre la venta sola.
                </p>
              </div>
              <ul className="space-y-2">
                {IMPACTO_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-rose-light"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-cream/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-cream/20 pt-4">
                <p className="text-xs uppercase tracking-[0.15em] text-rose-light/80">
                  Precio de lanzamiento
                </p>
                <p className="font-heading text-2xl font-extrabold text-cream">
                  Desde $150.000
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <p className="mx-auto mt-14 max-w-lg text-center font-script text-3xl text-wine sm:text-4xl">
            “Yo dejé de vender sola para construir algo que vende por mí. Hoy
            te ayudo a hacer lo mismo.”
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="relative mt-16">
            <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-rose-light lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-0.5 lg:w-auto" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-4">
              {PROCESS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="relative flex items-center gap-4 lg:flex-1 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-cream bg-wine shadow-card">
                    <Icon className="h-6 w-6 text-rose-light" strokeWidth={1.75} />
                  </div>
                  <p className="font-heading text-sm font-semibold text-ink/80 lg:max-w-[110px]">
                    <span className="text-rose-strong">{i + 1}.</span> {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
