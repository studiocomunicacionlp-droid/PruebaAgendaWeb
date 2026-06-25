import nodemailer from "nodemailer";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendBookingConfirmation(params: {
  clientEmail: string;
  clientName: string;
  serviceName: string;
  professionalName: string;
  date: string;
  time: string;
  duration: number;
}) {
  const { clientEmail, clientName, serviceName, professionalName, date, time, duration } = params;
  const formattedDate = format(
    new Date(`${date}T${time}:00`),
    "EEEE d 'de' MMMM, yyyy",
    { locale: es }
  );

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; color: #3A3A3A; margin: 0; padding: 0; background: #F8F5F0;">
  <div style="max-width: 600px; margin: 0 auto; background: white;">
    <div style="background: #6B705C; color: white; padding: 40px; text-align: center;">
      <h1 style="font-family: Georgia; font-size: 28px; margin: 0; letter-spacing: 3px; font-weight: normal;">LUMIÈRE</h1>
      <p style="margin: 6px 0 0; opacity: 0.8; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Estética Premium</p>
    </div>
    <div style="padding: 40px;">
      <p style="font-size: 18px; margin-bottom: 16px;">¡Hola, ${clientName}! ✨</p>
      <p style="line-height: 1.7; color: #555; margin-bottom: 24px;">
        Tu turno ha sido confirmado exitosamente. Te esperamos con todo preparado para que disfrutes tu experiencia Lumière.
      </p>
      <div style="background: #F8F5F0; border-left: 4px solid #DDBEA9; padding: 24px; border-radius: 8px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B705C; font-weight: bold; font-size: 14px; width: 120px;">Servicio</td><td style="padding: 8px 0; font-size: 14px;">${serviceName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B705C; font-weight: bold; font-size: 14px;">Profesional</td><td style="padding: 8px 0; font-size: 14px;">${professionalName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B705C; font-weight: bold; font-size: 14px;">Fecha</td><td style="padding: 8px 0; font-size: 14px; text-transform: capitalize;">${formattedDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B705C; font-weight: bold; font-size: 14px;">Hora</td><td style="padding: 8px 0; font-size: 14px;">${time} hs</td></tr>
          <tr><td style="padding: 8px 0; color: #6B705C; font-weight: bold; font-size: 14px;">Duración</td><td style="padding: 8px 0; font-size: 14px;">${duration} minutos</td></tr>
        </table>
      </div>
      <p style="line-height: 1.7; color: #555; font-size: 14px;">
        📍 Si necesitás cancelar o reagendar tu turno, hacelo con al menos <strong>24 horas de anticipación</strong> respondiendo este email o contactándonos por Instagram.
      </p>
      <p style="margin-top: 32px; line-height: 1.7;">
        ¡Nos vemos pronto!<br/>
        <strong>El equipo de Lumière Estética</strong> 💚
      </p>
    </div>
    <div style="background: #F8F5F0; padding: 24px; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0 0 4px;">Lumière Estética Premium | @lumiere.estetica</p>
      <p style="margin: 0;">Este email fue generado automáticamente. Por favor no respondas a este mensaje.</p>
    </div>
  </div>
</body>
</html>`;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Lumière Estética <noreply@lumiere.com>",
      to: clientEmail,
      subject: `✨ Turno confirmado – ${serviceName} | Lumière Estética`,
      html,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
