"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Galería"
          title="El arte del cuidado personal"
          description="Cada tratamiento, cada resultado, cada momento de bienestar. Bienvenida al mundo Lumière."
        />

        {/* Pinterest-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
              style={{ aspectRatio: img.tall ? "3/4" : "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A3A3A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <span className="text-white text-xs font-medium tracking-wide uppercase bg-[#6B705C]/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {img.category}
                </span>
                <p className="text-white text-sm mt-1.5 font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
