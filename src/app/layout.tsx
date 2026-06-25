import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumière Estética Premium | Tu espacio para verte y sentirte mejor",
  description:
    "Centro de estética premium. Tratamientos faciales, corporales, masajes, drenaje linfático, cejas y pestañas. Profesionales certificadas. Reservá tu turno online.",
  keywords:
    "estética, facial, corporal, masajes, belleza, limpieza facial, radiofrecuencia, drenaje linfático, cejas, lash lifting",
  openGraph: {
    title: "Lumière Estética Premium",
    description: "Tu espacio para verte y sentirte mejor",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
