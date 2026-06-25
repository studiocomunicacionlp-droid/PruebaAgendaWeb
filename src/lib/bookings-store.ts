// In-memory booking store — persists while the server is running
// Bookings survive deploys only if a volume is attached; for production add a DB

export interface StoredBooking {
  id: string;
  professionalId: string;
  serviceId: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:MM
  durationMin: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __bookingsStore: StoredBooking[] | undefined;
}

function getStore(): StoredBooking[] {
  if (!global.__bookingsStore) {
    global.__bookingsStore = [];
  }
  return global.__bookingsStore;
}

export function saveBooking(booking: Omit<StoredBooking, "id" | "createdAt">): StoredBooking {
  const store = getStore();
  const newBooking: StoredBooking = {
    ...booking,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  store.push(newBooking);
  return newBooking;
}

export function getBookingsForDate(professionalId: string, date: string): StoredBooking[] {
  return getStore().filter(
    (b) => b.professionalId === professionalId && b.date === date
  );
}

export function isSlotTaken(
  professionalId: string,
  date: string,
  time: string,
  durationMin: number
): boolean {
  const bookings = getBookingsForDate(professionalId, date);
  const [reqH, reqM] = time.split(":").map(Number);
  const reqStart = reqH * 60 + reqM;
  const reqEnd = reqStart + durationMin;

  return bookings.some((b) => {
    const [bH, bM] = b.time.split(":").map(Number);
    const bStart = bH * 60 + bM;
    const bEnd = bStart + b.durationMin;
    return reqStart < bEnd && reqEnd > bStart;
  });
}

export function getBusySlotsFromStore(
  professionalId: string,
  date: string
): { start: Date; end: Date }[] {
  const bookings = getBookingsForDate(professionalId, date);
  return bookings.map((b) => {
    const start = new Date(`${b.date}T${b.time}:00`);
    const end = new Date(start.getTime() + b.durationMin * 60 * 1000);
    return { start, end };
  });
}

export function getAllBookings(): StoredBooking[] {
  return [...getStore()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
