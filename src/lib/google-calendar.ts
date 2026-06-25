import { google } from "googleapis";
import { parseISO, addMinutes } from "date-fns";

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXTAUTH_URL + "/api/auth/callback/google"
  );
}

export async function getCalendarClient(accessToken: string) {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function getBusySlots(
  accessToken: string,
  calendarId: string,
  date: string
): Promise<{ start: Date; end: Date }[]> {
  try {
    const calendar = await getCalendarClient(accessToken);
    const timeMin = new Date(`${date}T00:00:00`).toISOString();
    const timeMax = new Date(`${date}T23:59:59`).toISOString();

    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    return events
      .filter((e) => e.start?.dateTime && e.end?.dateTime)
      .map((e) => ({
        start: parseISO(e.start!.dateTime!),
        end: parseISO(e.end!.dateTime!),
      }));
  } catch (error) {
    console.error("Error fetching busy slots:", error);
    return [];
  }
}

export async function createCalendarEvent(
  accessToken: string,
  calendarId: string,
  params: {
    date: string;
    time: string;
    duration: number;
    serviceName: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    notes?: string;
    professionalName: string;
  }
) {
  const calendar = await getCalendarClient(accessToken);
  const startDateTime = new Date(`${params.date}T${params.time}:00`);
  const endDateTime = addMinutes(startDateTime, params.duration);

  const descriptionLines = [
    `Cliente: ${params.clientName}`,
    `Teléfono: ${params.clientPhone}`,
    `Email: ${params.clientEmail}`,
    `Servicio: ${params.serviceName}`,
    `Duración: ${params.duration} minutos`,
  ];
  if (params.notes) descriptionLines.push(`Notas: ${params.notes}`);

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${params.serviceName} - ${params.clientName}`,
      description: descriptionLines.join("\n"),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      attendees: [{ email: params.clientEmail, displayName: params.clientName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
    sendUpdates: "all",
  });

  return event.data;
}
