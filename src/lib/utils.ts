import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMinutes, setHours, setMinutes, isBefore, isAfter, format } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function generateTimeSlots(
  date: Date,
  duration: number,
  busySlots: { start: Date; end: Date }[]
): { time: string; available: boolean }[] {
  const slots: { time: string; available: boolean }[] = [];
  const startHour = 9;
  const endHour = 19;

  let current = setMinutes(setHours(new Date(date), startHour), 0);
  const endTime = setMinutes(setHours(new Date(date), endHour), 0);

  while (isBefore(current, endTime)) {
    const slotEnd = addMinutes(current, duration);
    if (isAfter(slotEnd, endTime)) break;

    const isOverlapping = busySlots.some(
      (busy) => isBefore(current, busy.end) && isAfter(slotEnd, busy.start)
    );

    slots.push({
      time: format(current, "HH:mm"),
      available: !isOverlapping,
    });

    current = addMinutes(current, 30);
  }

  return slots;
}

export function formatDateES(date: Date): string {
  return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
}
