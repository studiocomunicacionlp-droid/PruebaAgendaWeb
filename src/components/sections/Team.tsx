"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { professionals } from "@/lib/data";

export default function Team() {
  return (
    <section id="equipo" className="py-24 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Nuestro equipo"
          title="Profesionales que te cuidan"
          description="Cada integrante del equipo está especializada en su área y comprometida con tu bienestar y resultados."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {professionals.map((pro, i) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#DDBEA9]/20 hover:border-[#DDBEA9]/50 hover:shadow-xl hover:shadow-[#DDBEA9]/15 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={pro.image}
                  alt={pro.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A3A3A]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Bio overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white text-sm leading-relaxed">{pro.bio}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-playfair text-xl text-[#3A3A3A] mb-1">{pro.name}</h3>
                <p className="text-[#A98467] text-sm font-medium mb-1">{pro.specialty}</p>
                <p className="text-[#3A3A3A]/50 text-xs mb-4">{pro.experience}</p>

                {pro.instagram && (
                  <a
                    href={pro.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#6B705C] hover:text-[#A98467] transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>{pro.instagram_handle}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
