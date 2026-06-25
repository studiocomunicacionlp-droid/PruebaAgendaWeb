"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const values = ["Autenticidad", "Excelencia", "Calidez", "Innovación"];

const stats = [
  { value: "+500", label: "Clientas satisfechas" },
  { value: "6", label: "Años de trayectoria" },
  { value: "3", label: "Profesionales" },
  { value: "+20", label: "Tratamientos" },
];

export default function About() {
  return (
    <section id="nosotras" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=900&fit=crop"
                alt="Centro Lumière Estética"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A3A3A]/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl border border-[#DDBEA9]/20 max-w-[200px]"
            >
              <p className="font-playfair text-3xl text-[#6B705C] font-medium">6</p>
              <p className="text-sm text-[#3A3A3A]/60 leading-tight mt-1">
                años transformando vidas
              </p>
              <div className="flex mt-2 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right">
            <p className="font-cormorant text-lg tracking-[0.2em] uppercase text-[#A98467] mb-3">
              Nuestra historia
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#3A3A3A] mb-6 leading-tight">
              Más que estética, un refugio de bienestar
            </h2>
            <div className="space-y-4 text-[#3A3A3A]/65 leading-relaxed mb-8">
              <p>
                Lumière nació en 2018 con una misión clara: crear un espacio donde cada mujer se sienta cuidada, valorada y bella. No solo desde afuera, sino desde adentro.
              </p>
              <p>
                Hoy somos un equipo de profesionales apasionadas por lo que hacemos, comprometidas con la formación continua y los resultados reales. Cada tratamiento es diseñado de manera personalizada, porque entendemos que ninguna piel es igual.
              </p>
              <p>
                Creemos que el bienestar no es un lujo. Es una necesidad. Y en Lumière lo hacemos posible con elegancia, calidez y precios accesibles.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {values.map((v) => (
                <div key={v} className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#6B705C] shrink-0" />
                  <span className="text-sm font-medium text-[#3A3A3A]/70">{v}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-[#F8F5F0]">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-playfair text-2xl md:text-3xl text-[#6B705C] font-medium">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#3A3A3A]/50 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
