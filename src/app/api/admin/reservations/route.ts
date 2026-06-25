import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCalendarClient } from "@/lib/google-calendar";
import { professionals } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get("professionalId");
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

    const filteredPros = professionalId
      ? professionals.filter((p) => p.id === professionalId)
      : professionals;

    if (!session.accessToken) {
      return NextResponse.json({
        reservations: [],
        message: "Conectá tu Google Calendar para ver reservas reales",
      });
    }

    const allEvents: object[] = [];

    for (const pro of filteredPros) {
      try {
        const calendar = await getCalendarClient(session.accessToken);
        const timeMin = new Date(`${date}T00:00:00`).toISOString();
        const timeMax = new Date(`${date}T23:59:59`).toISOString();

        const res = await calendar.events.list({
          calendarId: pro.calendarId,
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: "startTime",
        });

        const events = (res.data.items || []).map((e) => ({
          id: e.id,
          professional: pro.name,
          professionalId: pro.id,
          summary: e.summary,
          description: e.description,
          start: e.start?.dateTime,
          end: e.end?.dateTime,
        }));

        allEvents.push(...events);
      } catch (err) {
        console.error(`Error fetching events for ${pro.name}:`, err);
      }
    }

    return NextResponse.json({ reservations: allEvents });
  } catch (error) {
    console.error("Admin reservations error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
