"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Tag, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/lib/data";
import { formatPrice, formatDuration } from "@/lib/utils";

const categories = ["Todos", "Facial", "Corporal", "Cejas & Pestañas"];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      sessionStorage.setItem("selectedService", serviceId);
    }
    const el = document.querySelector("#reservar");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Lo que ofrecemos"
          title="Tratamientos para tu bienestar"
          description="Cada servicio está diseñado con los mejores protocolos y productos para maximizar tu resultado."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#6B705C] text-white shadow-md"
                  : "bg-white text-[#3A3A3A]/60 hover:text-[#6B705C] border border-[#DDBEA9]/40 hover:border-[#6B705C]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              layout
              className="group bg-white rounded-2xl overflow-hidden border border-[#DDBEA9]/20 hover:border-[#DDBEA9]/60 hover:shadow-xl hover:shadow-[#DDBEA9]/20 transition-all duration-400 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#6B705C] text-xs font-medium px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-playfair text-lg text-[#3A3A3A] mb-2 leading-snug">
                  {service.name}
                </h3>
                <p className="text-sm text-[#3A3A3A]/60 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {service.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-[#F8F5F0]">
                  <div className="flex items-center gap-1.5 text-[#A98467] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B705C] font-semibold text-sm">
                    <Tag className="w-4 h-4" />
                    <span>{formatPrice(service.price)}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => scrollToBooking(service.id)}
                  className="w-full bg-[#F8F5F0] hover:bg-[#6B705C] text-[#6B705C] hover:text-white border border-[#DDBEA9]/60 hover:border-[#6B705C] rounded-xl py-2.5 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Reservar
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
