export interface Professional {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  calendarId: string;
  instagram?: string;
  instagram_handle?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image: string;
  professionals: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
