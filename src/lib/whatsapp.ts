// WhatsApp notifications via CallMeBot (free, no Twilio needed)
// Setup: wa.me/34611012909 → send "I allow callmebot to send me messages"
// Then you'll receive your API key via WhatsApp
// Add to Railway env vars: CALLMEBOT_APIKEY and WHATSAPP_NOTIFY_PHONE

import { format } from "date-fns";
import { es } from "date-fns/locale";

export async function sendWhatsAppNotification(params: {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceName: string;
  professionalName: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}) {
  const phone = process.env.WHATSAPP_NOTIFY_PHONE;
  const apiKey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apiKey) {
    console.log("WhatsApp not configured (WHATSAPP_NOTIFY_PHONE or CALLMEBOT_APIKEY missing)");
    return;
  }

  const formattedDate = format(
    new Date(`${params.date}T${params.time}:00`),
    "EEEE d 'de' MMMM",
    { locale: es }
  );

  const lines = [
    "🌿 *Nueva Reserva - Lumière Estética*",
    "",
    `👤 Cliente: ${params.clientName}`,
    `📱 Teléfono: ${params.clientPhone}`,
    `✨ Servicio: ${params.serviceName}`,
    `👩 Profesional: ${params.professionalName}`,
    `📅 Fecha: ${formattedDate}`,
    `🕐 Hora: ${params.time} hs (${params.duration} min)`,
  ];

  if (params.notes) {
    lines.push(`📝 Notas: ${params.notes}`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.error("CallMeBot error:", res.status, await res.text());
    }
  } catch (err) {
    console.error("WhatsApp notification failed (non-fatal):", err);
  }
}
