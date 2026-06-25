import { Professional, Service } from "@/types";

export const professionals: Professional[] = [
  {
    id: "p1",
    name: "Valentina Rossi",
    specialty: "Estética Facial",
    experience: "8 años de experiencia",
    bio: "Especialista en tratamientos faciales avanzados, dermapen y radiofrecuencia. Formada en Buenos Aires y Madrid, con certificaciones internacionales en estética clínica.",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=500&fit=crop&crop=face",
    calendarId: process.env.CALENDAR_ID_P1 || "primary",
    instagram: "https://instagram.com",
    instagram_handle: "@valentina.rossi",
  },
  {
    id: "p2",
    name: "Sofía Medina",
    specialty: "Masajes y Drenaje",
    experience: "6 años de experiencia",
    bio: "Terapeuta corporal especializada en drenaje linfático manual y masajes descontracturantes. Certificada por la escuela DLM Internacional en técnica Vodder.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face",
    calendarId: process.env.CALENDAR_ID_P2 || "primary",
    instagram: "https://instagram.com",
    instagram_handle: "@sofia.medina",
  },
  {
    id: "p3",
    name: "Camila Torres",
    specialty: "Cejas & Pestañas",
    experience: "5 años de experiencia",
    bio: "Artista especializada en diseño y arquitectura de cejas y lash lifting. Técnica precisa y mirada única para resultados completamente naturales y personalizados.",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=500&fit=crop&crop=face",
    calendarId: process.env.CALENDAR_ID_P3 || "primary",
    instagram: "https://instagram.com",
    instagram_handle: "@camila.torres",
  },
];

export const services: Service[] = [
  {
    id: "s1",
    name: "Limpieza Facial Profunda",
    description:
      "Tratamiento completo que elimina impurezas, células muertas y puntos negros con vapor, extracción y mascarilla calmante. Piel renovada y luminosa.",
    duration: 60,
    price: 8500,
    category: "Facial",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
    professionals: ["p1"],
  },
  {
    id: "s2",
    name: "Dermaplaning",
    description:
      "Exfoliación mecánica con bisturí que elimina el vello facial y las células muertas. Piel perfectamente lisa, luminosa y preparada para absorber mejor los activos.",
    duration: 45,
    price: 7000,
    category: "Facial",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop",
    professionals: ["p1"],
  },
  {
    id: "s3",
    name: "Radiofrecuencia Facial",
    description:
      "Tecnología de última generación que estimula la producción de colágeno desde adentro, reafirma tejidos y rejuvenece la piel de forma no invasiva.",
    duration: 50,
    price: 12000,
    category: "Facial",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop",
    professionals: ["p1"],
  },
  {
    id: "s4",
    name: "Masaje Descontracturante",
    description:
      "Técnica de presión profunda que libera tensiones musculares acumuladas por estrés o mala postura. Alivio inmediato del dolor y sensación de bienestar total.",
    duration: 60,
    price: 9000,
    category: "Corporal",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    professionals: ["p2"],
  },
  {
    id: "s5",
    name: "Drenaje Linfático Manual",
    description:
      "Masaje suave y rítmico que activa el sistema linfático, reduce la retención de líquidos, mejora la circulación y potencia el sistema inmune.",
    duration: 60,
    price: 9500,
    category: "Corporal",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop",
    professionals: ["p2"],
  },
  {
    id: "s6",
    name: "Tratamiento Corporal Reafirmante",
    description:
      "Ritual completo de exfoliación corporal, envoltura nutritiva y masaje reafirmante. Piel firme, hidratada y luminosa de pies a cabeza.",
    duration: 90,
    price: 15000,
    category: "Corporal",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
    professionals: ["p2"],
  },
  {
    id: "s7",
    name: "Perfilado de Cejas",
    description:
      "Diseño personalizado con hilo, cera y pinza según tu arquitectura facial. Cejas que enmarcan y realzan tu mirada de forma completamente natural.",
    duration: 30,
    price: 4500,
    category: "Cejas & Pestañas",
    image:
      "https://images.unsplash.com/photo-1560750133-ebe8e58d8ad9?w=600&h=400&fit=crop",
    professionals: ["p3"],
  },
  {
    id: "s8",
    name: "Lash Lifting",
    description:
      "Tratamiento que riza y eleva tus pestañas naturales desde la raíz con permanente suave. Efecto máscara sin esfuerzo que dura hasta 8 semanas.",
    duration: 60,
    price: 11000,
    category: "Cejas & Pestañas",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=400&fit=crop",
    professionals: ["p3"],
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "María González",
    treatment: "Limpieza Facial Profunda",
    text: "Increíble experiencia. Mi piel quedó completamente transformada después de la primera sesión. Valentina es una profesional excepcional, muy detallista y atenta. Ya no puedo imaginar mi rutina sin venir al centro.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "t2",
    name: "Laura Fernández",
    treatment: "Drenaje Linfático",
    text: "Llevaba meses con retención de líquidos terrible y después de 4 sesiones con Sofía noté un cambio radical. Perdí 3 kilos de líquido retenido. El ambiente del centro es hermoso, da paz solo entrar.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "t3",
    name: "Ana Martínez",
    treatment: "Lash Lifting",
    text: "¡Camila es un genio! Mis pestañas quedaron perfectas, duró más de 6 semanas y el resultado es completamente natural. Mis amigas pensaron que eran extensiones. Ya tengo turno para el próximo mes.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "t4",
    name: "Carolina López",
    treatment: "Radiofrecuencia Facial",
    text: "Vine por recomendación de una amiga y fue la mejor decisión. El equipo es moderno, la atención es personalizada y los resultados son visibles desde la primera sesión. Reafirmó mi piel notablemente.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "t5",
    name: "Valentina Cruz",
    treatment: "Masaje Descontracturante",
    text: "Trabajo frente a la computadora todo el día y el dolor de espalda era insoportable. Después de la primera sesión con Sofía salí caminando en nubes. El mejor masaje de mi vida, sin exagerar.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face",
  },
];

export const galleryImages = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop",
    alt: "Tratamiento facial",
    category: "Tratamientos",
    tall: true,
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop",
    alt: "Instalaciones del centro",
    category: "Instalaciones",
    tall: false,
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop",
    alt: "Masaje relajante",
    category: "Tratamientos",
    tall: false,
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1560750133-ebe8e58d8ad9?w=600&h=800&fit=crop",
    alt: "Diseño de cejas",
    category: "Cejas",
    tall: true,
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop",
    alt: "Radiofrecuencia",
    category: "Tecnología",
    tall: false,
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop",
    alt: "Cuidado de piel",
    category: "Facial",
    tall: false,
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
    alt: "Tratamiento corporal",
    category: "Corporal",
    tall: false,
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    alt: "Masaje descontracturante",
    category: "Corporal",
    tall: false,
  },
];
