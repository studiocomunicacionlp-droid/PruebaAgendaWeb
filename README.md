# Lumière Estética Premium

Centro de estética premium con sistema de reservas integrado con Google Calendar.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion** – animaciones
- **Lucide React** – iconos
- **NextAuth.js v5** – autenticación Google OAuth
- **Google Calendar API** – gestión de turnos
- **react-hook-form** + **zod** – formularios
- **Nodemailer** – emails de confirmación

## Instalación

```bash
# 1. Clonar / entrar al directorio
cd lumiere-estetica

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Completar las variables en .env.local (ver sección abajo)

# 5. Iniciar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Variables de entorno

Editar `.env.local` con tus valores reales:

### NextAuth
```
NEXTAUTH_SECRET=      # openssl rand -base64 32
NEXTAUTH_URL=         # http://localhost:3000 en dev / tu dominio en prod
```

### Google OAuth + Calendar
1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear un proyecto nuevo
3. Habilitar **Google Calendar API**
4. Crear credenciales OAuth 2.0 (tipo: "Aplicación web")
5. Agregar URI de redirección: `http://localhost:3000/api/auth/callback/google`
6. Copiar Client ID y Client Secret

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### IDs de calendarios por profesional
Obtenerlos en Google Calendar → Configuración → [Nombre del calendario] → ID del calendario

```
CALENDAR_ID_P1=profesional1@gmail.com
CALENDAR_ID_P2=profesional2@gmail.com
CALENDAR_ID_P3=profesional3@gmail.com
```

### Admin
```
ADMIN_EMAIL=admin@lumiere.com
ADMIN_PASSWORD=       # contraseña segura para el panel admin
```

### Email (Gmail + App Password)
1. Habilitar verificación en 2 pasos en Gmail
2. Ir a Seguridad → Contraseñas de aplicaciones
3. Generar una contraseña para "Correo"

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=           # App password de 16 caracteres
SMTP_FROM=Lumière Estética <noreply@lumiere.com>
```

## Personalización

### Datos del centro
Editar `src/lib/data.ts`:
- `professionals` – profesionales, fotos, especialidades, ID de calendario
- `services` – servicios, precios, duración, descripción
- `testimonials` – reseñas de clientes
- `galleryImages` – fotos de la galería

### Colores y estilos
Editar `tailwind.config.ts` y `src/app/globals.css`

Paleta actual:
- Primary (Olive Green): `#6B705C`
- Secondary (Warm Beige): `#DDBEA9`
- Tertiary (Soft Brown): `#A98467`
- Background: `#F8F5F0`

### Tipografías
Google Fonts cargadas en `globals.css`:
- Títulos: **Playfair Display**
- Subtítulos: **Cormorant Garamond**
- Textos: **Inter**

## Estructura de carpetas

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Landing principal
│   ├── admin/
│   │   ├── layout.tsx        # Layout del panel admin
│   │   └── page.tsx          # Dashboard admin
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── calendar/
│       │   ├── availability/route.ts   # GET disponibilidad
│       │   └── book/route.ts           # POST crear reserva
│       └── admin/
│           └── reservations/route.ts   # GET reservas (admin)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Team.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Gallery.tsx
│   │   └── Booking.tsx       ⭐ Sistema de reservas completo
│   └── ui/
│       ├── Button.tsx
│       ├── SectionTitle.tsx
│       └── AnimatedSection.tsx
├── lib/
│   ├── data.ts               # Datos del centro
│   ├── utils.ts              # Helpers
│   ├── google-calendar.ts    # Integración Google Calendar
│   └── email.ts              # Envío de emails
├── types/
│   └── index.ts
├── auth.ts                   # Configuración NextAuth
└── middleware.ts             # Protección rutas admin
```

## Flujo de reserva

1. **Elegir profesional** – foto, nombre, especialidad
2. **Elegir servicio** – filtrado por profesional, con precio y duración
3. **Elegir fecha** – selector de fecha (mín. mañana, máx. 60 días)
4. **Elegir horario** – consulta disponibilidad real en Google Calendar
5. **Completar datos** – nombre, email, teléfono, observaciones
6. **Confirmar** – resumen completo antes de confirmar
7. **Éxito** – email de confirmación automático

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel Dashboard
# Cambiar NEXTAUTH_URL al dominio de producción
```

## Panel Admin

URL: `/admin`

Login con las credenciales de `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

Funciones disponibles:
- Ver reservas del día por fecha
- Filtrar por profesional
- Ver detalles de cada turno (sincronizado con Google Calendar)

---

Desarrollado con ❤️ para Lumière Estética Premium
