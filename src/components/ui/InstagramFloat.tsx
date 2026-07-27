"use client";

import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/social";

export default function InstagramFloat() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Seguir a Lucía Paz en Instagram"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wine text-cream shadow-soft transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
    >
      <Instagram className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
