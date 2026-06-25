"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
  align?: "left" | "center";
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  className,
  light = false,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("max-w-2xl mb-16", alignClass, className)}
    >
      {subtitle && (
        <p
          className={cn(
            "font-cormorant text-lg tracking-[0.25em] uppercase mb-3",
            light ? "text-[#DDBEA9]" : "text-[#A98467]"
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-playfair text-4xl md:text-5xl leading-tight mb-4",
          light ? "text-white" : "text-[#3A3A3A]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed",
            light ? "text-white/75" : "text-[#3A3A3A]/65"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
