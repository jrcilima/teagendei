import type { ShopHour, Appointment, TimeSlot } from "@/shared/types";

// Helper: converte "09:30" para minutos (570)
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Helper: converte minutos (570) para "09:30"
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const WEEKDAY_MAP: Record<number, string> = {
  0: "dom", 1: "seg", 2: "ter", 3: "qua", 4: "qui", 5: "sex", 6: "sab",
};

/**
 * GERA OS SLOTS DISPONÍVEIS
 * - Passo fixo (slotStepMinutes) para exibição
 * - Duração real = serviceDuration (para colisão e fim do slot)
 */
export function generateSlots(
  dateStr: string, // YYYY-MM-DD
  serviceDuration: number,
  shopHours: ShopHour[],
  existingAppointments: Appointment[],
  slotStepMinutes = 5 // passo da grade
): TimeSlot[] {
  const dateObj = new Date(dateStr + "T00:00:00");
  const weekday = WEEKDAY_MAP[dateObj.getDay()];
  const now = new Date();

  const hours = shopHours.find((h) => h.weekday === weekday);
  if (!hours || hours.is_closed || !hours.start_time || !hours.end_time) {
    return [];
  }

  const startMin = timeToMinutes(hours.start_time);
  const endMin = timeToMinutes(hours.end_time);
  const slots: TimeSlot[] = [];

  for (let current = startMin; current + serviceDuration <= endMin; current += slotStepMinutes) {
    const timeString = minutesToTime(current);

    const slotStartISO = `${dateStr}T${timeString}:00`;
    const slotEndMin = current + serviceDuration;
    const slotEndTimeString = minutesToTime(slotEndMin);
    const slotEndISO = `${dateStr}T${slotEndTimeString}:00`;

    const slotStartDate = new Date(slotStartISO);
    const slotEndDate = new Date(slotEndISO);

    // Ignora horários que já passaram hoje
    if (slotStartDate < now) continue;

    const slotStartMs = slotStartDate.getTime();
    const slotEndMs = slotEndDate.getTime();

    const isBusy = existingAppointments.some((appt) => {
      if (!appt.start_time) return false;

      const apptStartMs = new Date(appt.start_time).getTime();
      const apptEndMs = appt.end_time
        ? new Date(appt.end_time).getTime()
        : apptStartMs + serviceDuration * 60 * 1000;

      return apptStartMs < slotEndMs && apptEndMs > slotStartMs;
    });

    slots.push({
      time: timeString,
      startISO: slotStartISO,
      endISO: slotEndISO,
      isAvailable: !isBusy,
    });
  }

  return slots;
}