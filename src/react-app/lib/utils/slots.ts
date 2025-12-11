// Caminho: src/react-app/lib/utils/slots.ts
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
 */
export function generateSlots(
  dateStr: string, // YYYY-MM-DD
  serviceDuration: number,
  shopHours: ShopHour[],
  existingAppointments: Appointment[]
): TimeSlot[] {
  const dateObj = new Date(dateStr + "T00:00:00");
  const weekday = WEEKDAY_MAP[dateObj.getDay()];

  // 1. Achar horário da loja para hoje
  const hours = shopHours.find((h) => h.weekday === weekday);

  // Se loja fechada ou sem horário cadastrado
  if (!hours || hours.is_closed || !hours.start_time || !hours.end_time) {
    return [];
  }

  const startMin = timeToMinutes(hours.start_time);
  const endMin = timeToMinutes(hours.end_time);
  const slots: TimeSlot[] = [];

  // 2. Loop para criar slots (ex: 09:00, 09:30, 10:00...)
  for (let current = startMin; current + serviceDuration <= endMin; current += serviceDuration) {
    const timeString = minutesToTime(current);
    const slotStartISO = `${dateStr} ${timeString}:00`;
    
    // Calcular fim do slot
    const slotEndMin = current + serviceDuration;
    const slotEndTimeString = minutesToTime(slotEndMin);
    const slotEndISO = `${dateStr} ${slotEndTimeString}:00`;

    // 3. Verificar colisão com agendamentos existentes
    const isBusy = existingAppointments.some((appt) => {
      const apptStart = new Date(appt.start_time).getTime(); // Assumindo que vem UTC ou ISO correto
      // Pequeno ajuste: appointments no PB são salvos como string UTC.
      // Simplificação para este passo: vamos comparar strings de hora se possível, 
      // mas o ideal é comparar timestamps completos.
      
      const thisSlotStart = new Date(slotStartISO).getTime();
      const thisSlotEnd = new Date(slotEndISO).getTime();

      // Se o agendamento já existe, ele bloqueia o slot?
      // Lógica básica de overlap
      return (apptStart >= thisSlotStart && apptStart < thisSlotEnd);
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