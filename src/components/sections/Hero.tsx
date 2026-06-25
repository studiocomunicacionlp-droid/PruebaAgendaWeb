"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&h=1080&fit=crop"
          alt="Tratamiento de estética premium"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3A3A3A]/70 via-[#3A3A3A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A3A3A]/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#DDBEA9] rounded-full" />
                Centro de Estética Premium
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] font-medium"
            >
              Tu espacio para{" "}
              <em className="not-italic text-[#DDBEA9]">verte</em> y{" "}
              <em className="not-italic text-[#DDBEA9]">sentirte</em> mejor
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl font-light"
            >
              Tratamientos personalizados que potencian tu belleza natural. Profesionales certificadas, ambiente exclusivo y resultados visibles.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollTo("#reservar")}
                className="bg-[#6B705C] hover:bg-[#5a5f4d] text-white px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#6B705C]/30 active:scale-95"
              >
                Reservar Turno
              </button>
              <button
                onClick={() => scrollTo("#servicios")}
                className="border-2 border-white/60 text-white hover:bg-white hover:text-[#6B705C] px-8 py-4 rounded-full font-medium text-base transition-all duration-300 backdrop-blur-sm active:scale-95"
              >
                Ver Servicios
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image src={src} alt="Cliente" width={36} height={36} className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-xs mt-0.5">+500 clientas satisfechas</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#beneficios")}
      >
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase">Descubrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
