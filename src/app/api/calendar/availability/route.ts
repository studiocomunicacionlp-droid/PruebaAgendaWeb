import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBusySlots } from "@/lib/google-calendar";
import { getBusySlotsFromStore } from "@/lib/bookings-store";
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

    // Always read from our local store (blocks confirmed bookings)
    const busyFromStore = getBusySlotsFromStore(professionalId, date);

    // Also read from Google Calendar if configured
    let busyFromCalendar: { start: Date; end: Date }[] = [];
    try {
      const session = await auth();
      if (session?.accessToken && process.env.GOOGLE_CLIENT_ID) {
        busyFromCalendar = await getBusySlots(
          session.accessToken,
          professional.calendarId,
          date
        );
      }
    } catch {
      // Non-fatal — fall back to store only
    }

    const allBusy = [...busyFromStore, ...busyFromCalendar];
    const selectedDate = new Date(`${date}T12:00:00`);
    const slots = generateTimeSlots(selectedDate, service.duration, allBusy);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
