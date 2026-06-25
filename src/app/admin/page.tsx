"use client";
import { useState, useEffect } from "react";
import { Calendar, Users, TrendingUp, Clock, RefreshCw } from "lucide-react";
import { professionals, services } from "@/lib/data";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Reservation {
  id: string;
  professional: string;
  summary: string;
  description: string;
  start: string;
  end: string;
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reservations?date=${selectedDate}`);
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const stats = [
    {
      label: "Turnos hoy",
      value: reservations.length,
      icon: Calendar,
      color: "bg-[#6B705C]",
    },
    {
      label: "Profesionales activas",
      value: professionals.length,
      icon: Users,
      color: "bg-[#A98467]",
    },
    {
      label: "Servicios",
      value: services.length,
      icon: TrendingUp,
      color: "bg-[#DDBEA9]",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#3A3A3A] mb-1">Dashboard</h1>
        <p className="text-[#3A3A3A]/50 text-sm">
          {format(new Date(), "EEEE d 'de' MMMM, yyyy", { locale: es })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-5 border border-[#DDBEA9]/20 flex items-center gap-4"
            >
              <div className={`${s.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-playfair text-[#3A3A3A]">{s.value}</p>
                <p className="text-sm text-[#3A3A3A]/50">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reservations table */}
      <div className="bg-white rounded-2xl border border-[#DDBEA9]/20 overflow-hidden">
        <div className="p-5 border-b border-[#F8F5F0] flex items-center justify-between">
          <h2 className="font-playfair text-xl text-[#3A3A3A]">Reservas del día</h2>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm border border-[#DDBEA9]/40 rounded-lg px-3 py-1.5 text-[#3A3A3A] focus:outline-none focus:border-[#6B705C]"
            />
            <button
              onClick={fetchReservations}
              className="p-1.5 text-[#6B705C] hover:bg-[#6B705C]/10 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-[#3A3A3A]/40">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-sm">Cargando reservas...</span>
          </div>
        ) : reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Calendar className="w-10 h-10 text-[#DDBEA9]" />
            <p className="text-[#3A3A3A]/50 text-sm">No hay reservas para esta fecha</p>
            <p className="text-[#3A3A3A]/30 text-xs">
              Conectá Google Calendar para ver reservas en tiempo real
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F5F0]">
                <tr>
                  {["Horario", "Servicio", "Profesional", "Cliente"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-medium text-[#3A3A3A]/50 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {reservations.map((r) => {
                  const startTime = r.start
                    ? format(new Date(r.start), "HH:mm")
                    : "–";
                  const endTime = r.end
                    ? format(new Date(r.end), "HH:mm")
                    : "–";
                  const parts = r.summary?.split(" - ");
                  const clientName = parts?.[1] || "–";
                  const serviceName = parts?.[0] || r.summary || "–";

                  return (
                    <tr key={r.id} className="hover:bg-[#F8F5F0]/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Clock className="w-3.5 h-3.5 text-[#A98467]" />
                          <span className="font-medium text-[#3A3A3A]">{startTime}</span>
                          <span className="text-[#3A3A3A]/40">→ {endTime}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-[#3A3A3A]">{serviceName}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-[#6B705C]">{r.professional}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-[#3A3A3A]/70">{clientName}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
