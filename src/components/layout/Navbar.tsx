"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotras", href: "#nosotras" },
  { label: "Equipo", href: "#equipo" },
  { label: "Galería", href: "#galeria" },
  { label: "Testimonios", href: "#testimonios" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#DDBEA9]/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles
                className={`w-5 h-5 transition-colors ${
                  scrolled ? "text-[#6B705C]" : "text-[#DDBEA9]"
                }`}
              />
              <div>
                <span
                  className={`font-playfair text-2xl tracking-widest font-medium transition-colors ${
                    scrolled ? "text-[#3A3A3A]" : "text-white"
                  }`}
                >
                  LUMIÈRE
                </span>
                <p
                  className={`text-[9px] tracking-[0.3em] uppercase -mt-1 transition-colors ${
                    scrolled ? "text-[#A98467]" : "text-white/70"
                  }`}
                >
                  Estética Premium
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-70 cursor-pointer ${
                    scrolled ? "text-[#3A3A3A]" : "text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#reservar")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  scrolled
                    ? "bg-[#6B705C] text-white hover:bg-[#5a5f4d]"
                    : "bg-white/20 border border-white/50 text-white hover:bg-white/30 backdrop-blur-sm"
                }`}
              >
                Reservar Turno
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#3A3A3A]" : "text-white"
              }`}
              aria-label="Menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-md shadow-lg border-b border-[#DDBEA9]/30 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[#3A3A3A] font-medium py-2 border-b border-[#F8F5F0] last:border-0 tracking-wide"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#reservar")}
                className="mt-2 bg-[#6B705C] text-white py-3 rounded-full font-medium text-sm tracking-wide"
              >
                Reservar Turno
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
