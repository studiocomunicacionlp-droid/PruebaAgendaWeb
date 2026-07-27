"use client";

import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import Container from "@/components/ui/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-rose-light/60 bg-cream/85 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3">
        <span className="font-script text-3xl leading-none text-wine">
          Lucía Paz
        </span>
        <a
          href={whatsappLink(WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-wine px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-rose-strong sm:px-5 sm:py-2.5"
        >
          Quiero mi web
        </a>
      </Container>
    </header>
  );
}
