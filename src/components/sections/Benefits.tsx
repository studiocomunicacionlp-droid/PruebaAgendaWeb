"use client";
import { motion } from "framer-motion";
import { Heart, Award, Zap, TrendingUp } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const benefits = [
  {
    icon: Heart,
    title: "Atención Personalizada",
    description:
      "Cada tratamiento se adapta de forma única a tus necesidades, tipo de piel y objetivos personales.",
    color: "bg-[#DDBEA9]/20",
    iconColor: "text-[#A98467]",
  },
  {
    icon: Award,
    title: "Profesionales Certificadas",
    description:
      "Nuestro equipo cuenta con formación continua en técnicas de vanguardia y certificaciones internacionales.",
    color: "bg-[#6B705C]/10",
    iconColor: "text-[#6B705C]",
  },
  {
    icon: Zap,
    title: "Equipamiento Moderno",
    description:
      "Tecnología de última generación que garantiza resultados óptimos de forma segura y eficaz.",
    color: "bg-[#DDBEA9]/20",
    iconColor: "text-[#A98467]",
  },
  {
    icon: TrendingUp,
    title: "Resultados Visibles",
    description:
      "Transformaciones reales y medibles desde la primera sesión, con protocolos diseñados para cada objetivo.",
    color: "bg-[#6B705C]/10",
    iconColor: "text-[#6B705C]",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Por qué elegirnos"
          title="Una experiencia que va más allá del tratamiento"
          description="Cada visita a Lumière es un momento para vos. Creamos un ambiente donde te sentís cuidada, escuchada y en confianza."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group p-7 bg-[#F8F5F0] rounded-2xl border border-[#DDBEA9]/20 hover:border-[#DDBEA9]/60 hover:shadow-lg hover:shadow-[#DDBEA9]/20 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>
                <h3 className="font-playfair text-xl text-[#3A3A3A] mb-3">{benefit.title}</h3>
                <p className="text-sm text-[#3A3A3A]/60 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
