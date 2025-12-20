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
  const now = new Date(); // Hora atual do sistema

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
    
    // Monta o Slot usando formato ISO local (sem Z)
    const slotStartISO = `${dateStr}T${timeString}:00`; 
    
    // Calcular fim do slot
    const slotEndMin = current + serviceDuration;
    const slotEndTimeString = minutesToTime(slotEndMin);
    const slotEndISO = `${dateStr}T${slotEndTimeString}:00`;

    const slotStartDate = new Date(slotStartISO);
    const slotEndDate = new Date(slotEndISO);

    // [REGRA] Ignora horários que já passaram hoje
    if (slotStartDate < now) {
        continue;
    }

    const slotStartMs = slotStartDate.getTime();
    const slotEndMs = slotEndDate.getTime();

    // 3. Verificar colisão com agendamentos existentes
    const isBusy = existingAppointments.some((appt) => {
      // CORREÇÃO: Usamos o UTC completo do banco. O new Date() converte UTC -> Local automaticamente.
      // Assim, 15:00 UTC vira 12:00 Local e bate com o slotStartMs (que é 12:00 Local).
      if (!appt.start_time) return false;

      const apptStartMs = new Date(appt.start_time).getTime();
      let apptEndMs = 0;

      if (appt.end_time) {
        apptEndMs = new Date(appt.end_time).getTime();
      } else {
        // Fallback: Se não tiver end_time, calcula baseado na duração padrão do serviço
        // (Para bloqueios criados sem data final explícita, assumimos 30min ou serviceDuration)
        apptEndMs = apptStartMs + (serviceDuration * 60 * 1000);
      }

      // LÓGICA DE COLISÃO ROBUSTA (Intersecção de Intervalos)
      // Um slot está ocupado se:
      // (Inicio do Agendamento < Fim do Slot) E (Fim do Agendamento > Inicio do Slot)
      // Isso cobre: Bloqueio maior que o slot, Bloqueio dentro do slot, etc.
      return (apptStartMs < slotEndMs && apptEndMs > slotStartMs);
    });

    slots.push({
      time: timeString,
      startISO: slotStartISO, // Mantém ISO local para uso no front
      endISO: slotEndISO,
      isAvailable: !isBusy,
    });
  }

  return slots;
}
