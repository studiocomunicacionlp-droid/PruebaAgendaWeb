import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBusySlots } from "@/lib/google-calendar";
import { generateTimeSlots } from "@/lib/utils";
import { professionals, services } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get("professionalId");
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");

    if (!professionalId || !serviceId || !date) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 });
    }

    const professional = professionals.find((p) => p.id === professionalId);
    const service = services.find((s) => s.id === serviceId);

    if (!professional || !service) {
      return NextResponse.json({ error: "Profesional o servicio no encontrado" }, { status: 404 });
    }

    // Try to get real availability from Google Calendar
    const session = await auth();
    let busySlots: { start: Date; end: Date }[] = [];

    if (session?.accessToken) {
      busySlots = await getBusySlots(
        session.accessToken,
        professional.calendarId,
        date
      );
    }

    const selectedDate = new Date(`${date}T12:00:00`);
    const slots = generateTimeSlots(selectedDate, service.duration, busySlots);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
