import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCalendarEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { professionals, services } from "@/lib/data";
import { saveBooking, isSlotTaken } from "@/lib/bookings-store";
import { z } from "zod";

const bookingSchema = z.object({
  professionalId: z.string(),
  serviceId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  clientName: z.string().min(2, "Nombre muy corto"),
  clientEmail: z.string().email("Email inválido"),
  clientPhone: z.string().min(8, "Teléfono inválido"),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const professional = professionals.find((p) => p.id === data.professionalId);
    const service = services.find((s) => s.id === data.serviceId);

    if (!professional || !service) {
      return NextResponse.json(
        { error: "Profesional o servicio no encontrado" },
        { status: 404 }
      );
    }

    // Check if slot is already taken in our store
    if (isSlotTaken(data.professionalId, data.date, data.time, service.duration)) {
      return NextResponse.json(
        { error: "Ese horario ya fue reservado. Por favor elegí otro." },
        { status: 409 }
      );
    }

    // Save booking to store immediately (blocks the slot)
    saveBooking({
      professionalId: data.professionalId,
      serviceId: data.serviceId,
      date: data.date,
      time: data.time,
      durationMin: service.duration,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      notes: data.notes,
    });

    let eventId: string | undefined;

    // Create Google Calendar event if configured
    try {
      const session = await auth();
      if (session?.accessToken && process.env.GOOGLE_CLIENT_ID) {
        const event = await createCalendarEvent(
          session.accessToken,
          professional.calendarId,
          {
            date: data.date,
            time: data.time,
            duration: service.duration,
            serviceName: service.name,
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
            notes: data.notes,
            professionalName: professional.name,
          }
        );
        eventId = event.id || undefined;
      }
    } catch (calError) {
      console.error("Google Calendar error (non-fatal):", calError);
    }

    // Send WhatsApp notification to the business
    await sendWhatsAppNotification({
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      serviceName: service.name,
      professionalName: professional.name,
      date: data.date,
      time: data.time,
      duration: service.duration,
      notes: data.notes,
    });

    // Send confirmation email to client if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendBookingConfirmation({
          clientEmail: data.clientEmail,
          clientName: data.clientName,
          serviceName: service.name,
          professionalName: professional.name,
          date: data.date,
          time: data.time,
          duration: service.duration,
        });
      } catch (emailError) {
        console.error("Email error (non-fatal):", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      eventId,
      message: "Turno reservado exitosamente",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
