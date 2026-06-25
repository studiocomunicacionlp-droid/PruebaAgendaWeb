import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "data", "bookings.db");

function getDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      professional_id TEXT NOT NULL,
      service_id TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      duration_min INTEGER NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(professional_id, date);
  `);

  return db;
}

export interface StoredBooking {
  id: string;
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  durationMin: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}

export function saveBooking(booking: Omit<StoredBooking, "id" | "createdAt">): StoredBooking {
  const db = getDb();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  db.prepare(`
    INSERT INTO bookings
      (id, professional_id, service_id, date, time, duration_min,
       client_name, client_email, client_phone, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, booking.professionalId, booking.serviceId, booking.date, booking.time,
    booking.durationMin, booking.clientName, booking.clientEmail,
    booking.clientPhone, booking.notes ?? null, createdAt
  );

  db.close();
  return { ...booking, id, createdAt };
}

export function isSlotTaken(
  professionalId: string,
  date: string,
  time: string,
  durationMin: number
): boolean {
  const db = getDb();
  const bookings = db.prepare(
    "SELECT time, duration_min FROM bookings WHERE professional_id = ? AND date = ?"
  ).all(professionalId, date) as { time: string; duration_min: number }[];
  db.close();

  const [reqH, reqM] = time.split(":").map(Number);
  const reqStart = reqH * 60 + reqM;
  const reqEnd = reqStart + durationMin;

  return bookings.some((b) => {
    const [bH, bM] = b.time.split(":").map(Number);
    const bStart = bH * 60 + bM;
    const bEnd = bStart + b.duration_min;
    return reqStart < bEnd && reqEnd > bStart;
  });
}

export function getBusySlotsFromStore(
  professionalId: string,
  date: string
): { start: Date; end: Date }[] {
  const db = getDb();
  const bookings = db.prepare(
    "SELECT time, duration_min FROM bookings WHERE professional_id = ? AND date = ?"
  ).all(professionalId, date) as { time: string; duration_min: number }[];
  db.close();

  return bookings.map((b) => {
    const start = new Date(`${date}T${b.time}:00`);
    const end = new Date(start.getTime() + b.duration_min * 60 * 1000);
    return { start, end };
  });
}

export function getAllBookings(): StoredBooking[] {
  const db = getDb();
  const rows = db.prepare(
    "SELECT * FROM bookings ORDER BY date DESC, time ASC"
  ).all() as Record<string, unknown>[];
  db.close();

  return rows.map((r) => ({
    id: r.id as string,
    professionalId: r.professional_id as string,
    serviceId: r.service_id as string,
    date: r.date as string,
    time: r.time as string,
    durationMin: r.duration_min as number,
    clientName: r.client_name as string,
    clientEmail: r.client_email as string,
    clientPhone: r.client_phone as string,
    notes: r.notes as string | undefined,
    createdAt: r.created_at as string,
  }));
}
