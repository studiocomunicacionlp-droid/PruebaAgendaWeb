"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Scissors,
  Calendar,
  Clock,
  ClipboardList,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  PartyPopper,
  MessageCircle,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { professionals, services } from "@/lib/data";
import { formatPrice, formatDuration, formatDateES } from "@/lib/utils";
import { Professional, Service, TimeSlot } from "@/types";

// ─── Types ──────────────────────────────────────────────────────────────────

interface BookingState {
  professional: Professional | null;
  service: Service | null;
  date: string;
  time: string;
}

const clientSchema = z.object({
  clientName: z.string().min(2, "Ingresá tu nombre completo"),
  clientEmail: z.string().email("Email inválido"),
  clientPhone: z
    .string()
    .min(8, "Ingresá un teléfono válido")
    .regex(/^[\d\s\+\-\(\)]+$/, "Solo números"),
  notes: z.string().optional(),
});
type ClientForm = z.infer<typeof clientSchema>;

// ─── Step indicators ─────────────────────────────────────────────────────────

const STEPS = [
  { label: "Profesional", icon: User },
  { label: "Servicio", icon: Scissors },
  { label: "Fecha", icon: Calendar },
  { label: "Horario", icon: Clock },
  { label: "Datos", icon: ClipboardList },
  { label: "Confirmar", icon: CheckCircle },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Booking() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingState>({
    professional: null,
    service: null,
    date: "",
    time: "",
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [confirmedClient, setConfirmedClient] = useState<ClientForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ClientForm>({ resolver: zodResolver(clientSchema) });

  // Pre-select service from sessionStorage (set by Services section CTA)
  useEffect(() => {
    const savedServiceId = sessionStorage.getItem("selectedService");
    if (savedServiceId) {
      const svc = services.find((s) => s.id === savedServiceId);
      if (svc) {
        const pro = professionals.find((p) => svc.professionals.includes(p.id));
        if (pro) {
          setBooking((b) => ({ ...b, professional: pro, service: svc }));
          setStep(2);
        }
      }
      sessionStorage.removeItem("selectedService");
    }
  }, []);

  // Fetch slots when date is selected
  useEffect(() => {
    if (!booking.professional || !booking.service || !booking.date) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSlotsError("");
      setSlots([]);
      try {
        const res = await fetch(
          `/api/calendar/availability?professionalId=${booking.professional!.id}&serviceId=${booking.service!.id}&date=${booking.date}`
        );
        const data = await res.json();
        if (data.slots) {
          setSlots(data.slots);
        } else {
          setSlotsError("No se pudo obtener disponibilidad. Intentá de nuevo.");
        }
      } catch {
        setSlotsError("Error de conexión. Verificá tu internet e intentá de nuevo.");
      } finally {
        setLoadingSlots(false);
      }
    };

    if (step === 3) fetchSlots();
  }, [step, booking.professional, booking.service, booking.date]);

  const openWhatsApp = (formData: ClientForm) => {
    const pro = booking.professional;
    const svc = booking.service;
    if (!pro || !svc) return;

    const dateStr = booking.date
      ? new Date(`${booking.date}T12:00`).toLocaleDateString("es-AR", {
          weekday: "long", day: "numeric", month: "long",
        })
      : "";

    const lines = [
      "🌿 *Nueva Reserva - Lumière Estética*",
      "",
      `👤 Cliente: ${formData.clientName}`,
      `📱 Teléfono: ${formData.clientPhone}`,
      `📧 Email: ${formData.clientEmail}`,
      `✨ Servicio: ${svc.name}`,
      `👩 Profesional: ${pro.name}`,
      `📅 Fecha: ${dateStr}`,
      `🕐 Hora: ${booking.time} hs`,
    ];
    if (formData.notes) lines.push(`📝 Notas: ${formData.notes}`);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/5493425478170?text=${text}`, "_blank");
  };

  const handleBook = async (formData: ClientForm) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professionalId: booking.professional!.id,
          serviceId: booking.service!.id,
          date: booking.date,
          time: booking.time,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedClient(formData);
        setSuccess(true);
      } else {
        setSubmitError(data.error || "Error al confirmar el turno. Intentá de nuevo.");
      }
    } catch {
      setSubmitError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep(0);
    setBooking({ professional: null, service: null, date: "", time: "" });
    setSlots([]);
    setSuccess(false);
    setSubmitError("");
  };

  const filteredServices = booking.professional
    ? services.filter((s) => s.professionals.includes(booking.professional!.id))
    : [];

  // Minimum date = tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  // Maximum date = 60 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  // ─── Success Screen ──────────────────────────────────────────────────────
  if (success) {
    return (
      <section id="reservar" className="py-24 bg-[#F8F5F0]">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 text-center shadow-xl border border-[#DDBEA9]/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-[#6B705C]/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <PartyPopper className="w-10 h-10 text-[#6B705C]" />
            </motion.div>
            <h2 className="font-playfair text-3xl text-[#3A3A3A] mb-3">¡Turno confirmado!</h2>
            <p className="text-[#3A3A3A]/60 mb-6 leading-relaxed">
              Te enviamos un email de confirmación con todos los detalles. ¡Te esperamos con todo listo!
            </p>

            <div className="bg-[#F8F5F0] rounded-2xl p-5 text-left mb-8 space-y-2.5">
              {[
                ["Servicio", booking.service?.name],
                ["Profesional", booking.professional?.name],
                ["Fecha", booking.date ? formatDateES(new Date(`${booking.date}T12:00`)) : ""],
                ["Hora", `${booking.time} hs`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[#6B705C] font-medium">{label}</span>
                  <span className="text-[#3A3A3A]/70 capitalize">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {confirmedClient && (
                <button
                  onClick={() => openWhatsApp(confirmedClient)}
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1ebe5d] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirmar por WhatsApp
                </button>
              )}
              <button
                onClick={resetBooking}
                className="bg-[#F8F5F0] text-[#6B705C] border border-[#6B705C]/30 px-7 py-3 rounded-full font-medium hover:bg-[#6B705C]/10 transition-colors"
              >
                Reservar otro turno
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="py-24 bg-[#F8F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Reservar turno"
          title="Tu momento de bienestar te espera"
          description="Completá el proceso en menos de 60 segundos. Confirmación inmediata por email."
        />

        <div className="bg-white rounded-3xl shadow-xl border border-[#DDBEA9]/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="px-6 pt-6 pb-4 border-b border-[#F8F5F0]">
            {/* Mobile: step number */}
            <div className="flex justify-between items-center mb-3 md:hidden">
              <span className="text-sm font-medium text-[#6B705C]">
                Paso {step + 1} de {STEPS.length}
              </span>
              <span className="text-sm text-[#3A3A3A]/50">{STEPS[step].label}</span>
            </div>
            {/* Desktop: all steps */}
            <div className="hidden md:flex items-center justify-between">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <div key={s.label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          done
                            ? "bg-[#6B705C] text-white"
                            : active
                            ? "bg-[#DDBEA9] text-[#3A3A3A]"
                            : "bg-[#F8F5F0] text-[#3A3A3A]/30"
                        }`}
                      >
                        {done ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] mt-1.5 font-medium tracking-wide transition-colors ${
                          active ? "text-[#6B705C]" : done ? "text-[#6B705C]/70" : "text-[#3A3A3A]/30"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 mb-4 transition-all duration-500 ${
                          i < step ? "bg-[#6B705C]" : "bg-[#F8F5F0]"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Mobile progress bar */}
            <div className="md:hidden h-1.5 bg-[#F8F5F0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#6B705C] rounded-full"
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 md:p-8 min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── STEP 0: Select Professional ── */}
                {step === 0 && (
                  <div>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      ¿Con quién querés atenderte?
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6">
                      Seleccioná una profesional según tu tratamiento.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {professionals.map((pro) => (
                        <button
                          key={pro.id}
                          onClick={() => {
                            setBooking((b) => ({ ...b, professional: pro, service: null }));
                            setStep(1);
                          }}
                          className={`group text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:border-[#6B705C] hover:shadow-md ${
                            booking.professional?.id === pro.id
                              ? "border-[#6B705C] bg-[#6B705C]/5"
                              : "border-[#DDBEA9]/30 bg-[#F8F5F0]"
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#DDBEA9]/40 group-hover:border-[#6B705C]/40 transition-colors">
                            <Image
                              src={pro.image}
                              alt={pro.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <p className="font-playfair text-base text-[#3A3A3A] text-center">{pro.name}</p>
                          <p className="text-[#A98467] text-xs text-center mt-0.5">{pro.specialty}</p>
                          <p className="text-[#3A3A3A]/40 text-xs text-center mt-0.5">{pro.experience}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Select Service ── */}
                {step === 1 && (
                  <div>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      ¿Qué tratamiento elegís?
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6">
                      Servicios disponibles con{" "}
                      <span className="font-medium text-[#6B705C]">{booking.professional?.name}</span>
                    </p>
                    <div className="space-y-3">
                      {filteredServices.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => {
                            setBooking((b) => ({ ...b, service: svc }));
                            setStep(2);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:border-[#6B705C] hover:shadow-sm flex items-center gap-4 ${
                            booking.service?.id === svc.id
                              ? "border-[#6B705C] bg-[#6B705C]/5"
                              : "border-[#DDBEA9]/30 bg-[#F8F5F0]"
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <Image
                              src={svc.image}
                              alt={svc.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-playfair text-[#3A3A3A] text-base">{svc.name}</p>
                            <p className="text-[#3A3A3A]/50 text-xs mt-0.5 line-clamp-1">{svc.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[#6B705C] font-semibold text-sm">{formatPrice(svc.price)}</p>
                            <p className="text-[#3A3A3A]/40 text-xs">{formatDuration(svc.duration)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Select Date ── */}
                {step === 2 && (
                  <div>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      ¿Qué día te viene mejor?
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6">
                      Disponibilidad de lunes a viernes, 9:00 – 19:00 hs. Sábados hasta las 14:00.
                    </p>

                    {/* Summary card */}
                    <div className="bg-[#F8F5F0] rounded-2xl p-4 mb-6 flex items-center gap-4 border border-[#DDBEA9]/30">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image src={booking.service!.image} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3A3A3A] text-sm">{booking.service?.name}</p>
                        <p className="text-[#A98467] text-xs">{booking.professional?.name} · {formatDuration(booking.service?.duration || 0)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label className="text-sm font-medium text-[#3A3A3A]/70">Seleccioná la fecha:</label>
                      <input
                        type="date"
                        min={minDateStr}
                        max={maxDateStr}
                        value={booking.date}
                        onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value, time: "" }))}
                        className="px-4 py-3 border-2 border-[#DDBEA9]/40 rounded-xl focus:outline-none focus:border-[#6B705C] text-[#3A3A3A] bg-white transition-colors w-full sm:w-auto"
                      />
                      {booking.date && (
                        <p className="text-sm text-[#6B705C] capitalize">
                          {formatDateES(new Date(`${booking.date}T12:00`))}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Select Time ── */}
                {step === 3 && (
                  <div>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      ¿A qué hora te viene bien?
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6 capitalize">
                      {booking.date && formatDateES(new Date(`${booking.date}T12:00`))}
                    </p>

                    {loadingSlots ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <Loader2 className="w-8 h-8 text-[#6B705C] animate-spin" />
                        <p className="text-[#3A3A3A]/50 text-sm">Consultando disponibilidad...</p>
                      </div>
                    ) : slotsError ? (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{slotsError}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => {
                              setBooking((b) => ({ ...b, time: slot.time }));
                              setStep(4);
                            }}
                            className={`py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                              slot.available
                                ? booking.time === slot.time
                                  ? "bg-[#6B705C] text-white"
                                  : "bg-[#F8F5F0] text-[#3A3A3A] hover:bg-[#DDBEA9]/40 hover:text-[#3A3A3A] border border-[#DDBEA9]/30"
                                : "bg-[#F8F5F0] text-[#3A3A3A]/25 cursor-not-allowed line-through"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                        {slots.length === 0 && !loadingSlots && (
                          <div className="col-span-full text-center py-8 text-[#3A3A3A]/40 text-sm">
                            No hay horarios disponibles para este día. Por favor elegí otra fecha.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 4: Personal Data ── */}
                {step === 4 && (
                  <form onSubmit={handleSubmit(() => setStep(5))}>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      Tus datos de contacto
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6">
                      Para confirmar tu turno y enviarte el recordatorio.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3A3A3A]/70 mb-1.5">
                          Nombre completo *
                        </label>
                        <input
                          {...register("clientName")}
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 border-2 border-[#DDBEA9]/40 rounded-xl focus:outline-none focus:border-[#6B705C] text-[#3A3A3A] bg-white transition-colors placeholder:text-[#3A3A3A]/30"
                        />
                        {errors.clientName && (
                          <p className="mt-1.5 text-red-500 text-xs">{errors.clientName.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3A3A3A]/70 mb-1.5">
                            Email *
                          </label>
                          <input
                            {...register("clientEmail")}
                            type="email"
                            placeholder="tu@email.com"
                            className="w-full px-4 py-3 border-2 border-[#DDBEA9]/40 rounded-xl focus:outline-none focus:border-[#6B705C] text-[#3A3A3A] bg-white transition-colors placeholder:text-[#3A3A3A]/30"
                          />
                          {errors.clientEmail && (
                            <p className="mt-1.5 text-red-500 text-xs">{errors.clientEmail.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3A3A3A]/70 mb-1.5">
                            Teléfono / WhatsApp *
                          </label>
                          <input
                            {...register("clientPhone")}
                            type="tel"
                            placeholder="+54 11 1234-5678"
                            className="w-full px-4 py-3 border-2 border-[#DDBEA9]/40 rounded-xl focus:outline-none focus:border-[#6B705C] text-[#3A3A3A] bg-white transition-colors placeholder:text-[#3A3A3A]/30"
                          />
                          {errors.clientPhone && (
                            <p className="mt-1.5 text-red-500 text-xs">{errors.clientPhone.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3A3A3A]/70 mb-1.5">
                          Observaciones (opcional)
                        </label>
                        <textarea
                          {...register("notes")}
                          rows={3}
                          placeholder="¿Alguna alergia, condición de salud o indicación especial?"
                          className="w-full px-4 py-3 border-2 border-[#DDBEA9]/40 rounded-xl focus:outline-none focus:border-[#6B705C] text-[#3A3A3A] bg-white transition-colors placeholder:text-[#3A3A3A]/30 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 bg-[#6B705C] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#5a5f4d] transition-colors w-full sm:w-auto"
                    >
                      Continuar →
                    </button>
                  </form>
                )}

                {/* ── STEP 5: Confirmation ── */}
                {step === 5 && (
                  <div>
                    <h3 className="font-playfair text-2xl text-[#3A3A3A] mb-2">
                      Confirmá tu turno
                    </h3>
                    <p className="text-[#3A3A3A]/55 text-sm mb-6">
                      Revisá los detalles y confirmá para reservar.
                    </p>

                    <div className="bg-[#F8F5F0] rounded-2xl p-5 space-y-3 mb-6 border border-[#DDBEA9]/20">
                      {[
                        ["Profesional", booking.professional?.name],
                        ["Servicio", booking.service?.name],
                        ["Duración", formatDuration(booking.service?.duration || 0)],
                        ["Precio", formatPrice(booking.service?.price || 0)],
                        [
                          "Fecha",
                          booking.date
                            ? formatDateES(new Date(`${booking.date}T12:00`))
                            : "",
                        ],
                        ["Hora", `${booking.time} hs`],
                        ["Nombre", getValues("clientName")],
                        ["Email", getValues("clientEmail")],
                        ["Teléfono", getValues("clientPhone")],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm border-b border-[#DDBEA9]/20 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-[#6B705C] font-medium">{label}</span>
                          <span className="text-[#3A3A3A]/70 text-right capitalize max-w-[60%]">{value}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-[#3A3A3A]/40 mb-5">
                      Al confirmar aceptás nuestras políticas de cancelación. Por favor cancelá con al menos 24 horas de anticipación.
                    </p>

                    {submitError && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{submitError}</p>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit(handleBook)}
                      disabled={submitting}
                      className="bg-[#6B705C] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#5a5f4d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Confirmando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Confirmar turno
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer navigation */}
          {step > 0 && step < 5 && (
            <div className="px-6 md:px-8 pb-6 flex justify-between items-center border-t border-[#F8F5F0] pt-4">
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-sm text-[#3A3A3A]/50 hover:text-[#6B705C] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver
              </button>

              {/* Next button for step 2 only (date selection needs manual advance) */}
              {step === 2 && booking.date && (
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-[#6B705C] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#5a5f4d] transition-colors"
                >
                  Ver horarios
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
          {step === 0 && (
            <div className="px-6 md:px-8 pb-6 pt-4 border-t border-[#F8F5F0]">
              <p className="text-xs text-[#3A3A3A]/40 text-center">
                🔒 Tus datos están protegidos. No compartimos tu información con terceros.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
