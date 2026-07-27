import { Instagram } from "lucide-react";
import Container from "@/components/ui/Container";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-cream/70">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="font-script text-4xl text-rose-light">Lucía Paz</span>
        <p className="max-w-sm text-sm">
          Tiendas online y landings a medida, para emprendedoras que quieren
          vender sin vivir pegadas al celular.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-rose-strong hover:text-rose-light"
            aria-label="Instagram de Lucía Paz"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold underline decoration-rose-strong decoration-2 underline-offset-4 transition-colors hover:text-rose-light"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>
        <p className="text-xs text-cream/40">
          © {new Date().getFullYear()} Lucía Paz. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
