"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wine text-cream shadow-soft transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
