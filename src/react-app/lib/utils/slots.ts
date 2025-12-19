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

// Helper: Limpa a data do PocketBase para garantir comparação local exata
// Transforma "2025-12-19 08:00:00.000Z" em "2025-12-19T08:00:00"
function normalizeDateStr(isoString: string): string {
  if (!isoString) return "";
  // Pega apenas os primeiros 19 caracteres (YYYY-MM-DDTHH:mm:ss) e troca espaço por T
  return isoString.substring(0, 19).replace(" ", "T");
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
      // Normaliza a data do banco para ignorar fuso horário (trata como local)
      const apptStartStr = normalizeDateStr(appt.start_time);
      
      // Se a data for inválida, ignora
      if (!apptStartStr) return false;

      const apptStartMs = new Date(apptStartStr).getTime();
      let apptEndMs = 0;

      // Tenta pegar o end_time do agendamento. Se não tiver, calcula baseado no slot (fallback)
      const apptEndStr = normalizeDateStr(appt.end_time || "");
      if (apptEndStr) {
        apptEndMs = new Date(apptEndStr).getTime();
      } else {
        // Fallback: Se por algum motivo o banco não tem end_time, assume a duração do serviço atual
        apptEndMs = apptStartMs + (serviceDuration * 60 * 1000);
      }

      // LÓGICA DE COLISÃO ROBUSTA (Intersecção de Intervalos)
      // Um slot está ocupado se:
      // (Inicio do Agendamento < Fim do Slot) E (Fim do Agendamento > Inicio do Slot)
      return (apptStartMs < slotEndMs && apptEndMs > slotStartMs);
    });

    slots.push({
      time: timeString,
      // Retorna com espaço para compatibilidade visual se necessário, ou T
      startISO: slotStartISO.replace("T", " "), 
      endISO: slotEndISO.replace("T", " "),
      isAvailable: !isBusy,
    });
  }

  return slots;
}