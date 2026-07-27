# Lucía Paz — Landing de una sola página

Landing mobile-first para la marca personal **Lucía Paz** (@luciapaz.digital),
diseñadora de tiendas online y landings para emprendedoras. Sitio 100%
estático (sin backend), pensado para publicarse en GitHub Pages y no
depender de un plan de hosting que pueda vencerse.

## Stack

- **Next.js 15** (App Router, `output: "export"` → sitio estático)
- **React 19** + **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion** — animaciones al hacer scroll
- **Lucide React** — iconos
- **next/font** — Poppins (bold) y Caveat (bold) auto-hosteadas, sin llamadas externas

## Instalación

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Build estático

```bash
npm run build
```

Genera el sitio estático en `out/`, listo para servir desde cualquier hosting
estático (GitHub Pages, Netlify, etc).

## Estructura

La página (`src/app/page.tsx`) arma las 13 secciones de la oferta, en orden:

1. Hero
2. Conexión con el problema (Punto A)
3. Por qué lo que hiciste hasta ahora no funcionó
4. El Punto B
5. La solución / Método (Libre e Impacto)
6. Qué vas a lograr
7. Contenido del programa (módulos)
8. Bono exclusivo de lanzamiento
9. Prueba social
10. Presentación personal
11. Garantía y urgencia
12. Cierre + CTA final
13. Resumen de la oferta

```
src/
├── app/
│   ├── layout.tsx       # fuentes (Poppins/Caveat) + metadata
│   ├── page.tsx         # ensambla las 13 secciones
│   └── globals.css
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/          # las 13 secciones, numeradas 01–13
│   └── ui/                # Container, CTAButton, Eyebrow, WhatsAppFloat, AnimatedSection
└── lib/
    ├── utils.ts
    └── whatsapp.ts        # número de WhatsApp y mensajes prearmados por CTA
```

## Personalización

### WhatsApp
El número y los textos prearmados de cada botón viven en `src/lib/whatsapp.ts`.

### Colores y tipografías
- Paleta de marca en `tailwind.config.ts` (`rose`, `wine`, `ink`, `cream`).
- Tipografías: `font-heading` (Poppins) para títulos y textos, `font-script`
  (Caveat) para acentos cálidos/firma de marca.

### Contenido
Cada sección es un componente independiente en `src/components/sections/`,
con el copy embebido — se edita directamente ahí.

## Deploy en GitHub Pages

El repo incluye `.github/workflows/deploy.yml`, que compila y publica el
sitio automáticamente en cada push a `main`.

Pasos únicos (una sola vez, manual, desde la configuración del repo en GitHub):

1. Ir a **Settings → Pages**.
2. En **Source**, elegir **GitHub Actions**.
3. Hacer push a `main` (o correr el workflow manualmente desde la pestaña
   **Actions**) y esperar a que termine el deploy.

El sitio queda publicado en `https://<usuario>.github.io/<nombre-del-repo>/`.
Si más adelante se conecta un dominio propio (por ejemplo `luciapaz.digital`),
agregar un archivo `public/CNAME` con el dominio y configurar el DNS.
