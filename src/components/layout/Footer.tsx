import { Instagram, MapPin, Phone, Mail, Sparkles, Heart } from "lucide-react";

const services = [
  "Limpieza Facial Profunda",
  "Dermaplaning",
  "Radiofrecuencia Facial",
  "Masaje Descontracturante",
  "Drenaje Linfático",
  "Lash Lifting",
  "Perfilado de Cejas",
];

export default function Footer() {
  return (
    <footer className="bg-[#3A3A3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#DDBEA9]" />
              <div>
                <span className="font-playfair text-2xl tracking-widest">LUMIÈRE</span>
                <p className="text-[9px] tracking-[0.3em] uppercase -mt-1 text-[#DDBEA9]/70">
                  Estética Premium
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Tu espacio para verte y sentirte mejor. Tratamientos personalizados que potencian tu belleza natural con calidez y profesionalismo.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#DDBEA9] hover:text-white transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @lumiere.estetica
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg mb-5 text-[#DDBEA9]">Servicios</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-white/60 text-sm hover:text-white transition-colors cursor-pointer">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg mb-5 text-[#DDBEA9]">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#DDBEA9] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Av. Santa Fe 1234, Piso 3<br />
                  Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#DDBEA9] shrink-0" />
                <a href="tel:+541112345678" className="text-white/60 text-sm hover:text-white transition-colors">
                  +54 11 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#DDBEA9] shrink-0" />
                <a href="mailto:hola@lumiere.com" className="text-white/60 text-sm hover:text-white transition-colors">
                  hola@lumiere.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-playfair text-lg mb-5 text-[#DDBEA9]">Horarios</h4>
            <ul className="space-y-2.5">
              {[
                ["Lunes – Viernes", "9:00 – 19:00"],
                ["Sábados", "9:00 – 14:00"],
                ["Domingos", "Cerrado"],
              ].map(([day, hours]) => (
                <li key={day} className="flex justify-between text-sm">
                  <span className="text-white/50">{day}</span>
                  <span className="text-white/80">{hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-[#6B705C]/30 rounded-xl border border-[#6B705C]/40">
              <p className="text-xs text-white/60 text-center">
                Turnos exclusivos con reserva previa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © 2024 Lumière Estética Premium. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-[#DDBEA9]" /> en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
