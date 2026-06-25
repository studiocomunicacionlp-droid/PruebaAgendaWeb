import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCalendarEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";
import { professionals, services } from "@/lib/data";
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

    // Create calendar event if Google OAuth is configured
    const session = await auth();
    let eventId: string | undefined;

    if (session?.accessToken) {
      try {
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
      } catch (calError) {
        console.error("Google Calendar error (non-fatal):", calError);
        // Continue even if calendar fails — email confirmation still sent
      }
    }

    // Send confirmation email (non-blocking, errors are caught internally)
    await sendBookingConfirmation({
      clientEmail: data.clientEmail,
      clientName: data.clientName,
      serviceName: service.name,
      professionalName: professional.name,
      date: data.date,
      time: data.time,
      duration: service.duration,
    });

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
