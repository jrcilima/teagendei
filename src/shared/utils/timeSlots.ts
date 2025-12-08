// Caminho: src/shared/utils/timeSlots.ts
import { addMinutes, format, parse, isBefore, isSameDay, isAfter } from "date-fns";
import { ShopHour } from "../schemas/shopHours";
import { Service } from "../types"; // Ou "../schemas/service" se preferir usar o schema
import { Appointment } from "../types";
import { WEEKDAY_MAP } from "./days";

interface GenerateSlotsParams {
  date: Date;
  serviceDuration: number;
  shopHours: ShopHour[]; // Lista vinda da tabela shop_hours
  existingAppointments: Appointment[];
  minAdvanceMinutes?: number; // Ex: 30 min de antecedência mínima
}

export function generateAvailableSlots({
  date,
  serviceDuration,
  shopHours,
  existingAppointments,
  minAdvanceMinutes = 30
}: GenerateSlotsParams): string[] {
  const slots: string[] = [];
  const now = new Date();
  const isToday = isSameDay(date, now);

  // 1. Descobrir qual dia da semana é (dom, seg, ter...)
  const dayIndex = date.getDay(); // 0 a 6
  const dayKey = WEEKDAY_MAP[dayIndex]; // 'dom', 'seg'...

  // 2. Encontrar a configuração daquele dia na lista do banco
  const config = shopHours.find(h => h.weekday === dayKey);

  // Se não tiver config ou estiver fechado, retorna vazio
  if (!config || config.is_closed) {
    return [];
  }

  // 3. Converter strings "09:00" para Objetos Date
  // O parse usa a data base passada por parâmetro
  const openTime = parse(config.start_time, 'HH:mm', date);
  const closeTime = parse(config.end_time, 'HH:mm', date);

  let currentSlot = openTime;

  // 4. Loop para gerar os slots
  // Enquanto (slot + duração) for antes ou igual ao horário de fechar
  while (
    isBefore(addMinutes(currentSlot, serviceDuration), closeTime) ||
    addMinutes(currentSlot, serviceDuration).getTime() === closeTime.getTime()
  ) {
    
    // Regra: Não mostrar horários passados se for hoje
    if (isToday) {
      const limitTime = addMinutes(now, minAdvanceMinutes);
      if (isBefore(currentSlot, limitTime)) {
        currentSlot = addMinutes(currentSlot, 30); // Pula para o próximo intervalo
        continue;
      }
    }

    const slotStart = currentSlot;
    const slotEnd = addMinutes(currentSlot, serviceDuration);
    let isBlocked = false;

    // 5. Verificar conflitos com agendamentos existentes
    // (Lógica de colisão: Se o slot começa antes do fim do agendamento E termina depois do início dele)
    for (const appt of existingAppointments) {
      // Ignora cancelados
      if (appt.status === "0") continue; // 0 = Cancelado (string conforme types)

      const apptStart = new Date(appt.start_time);
      const apptEnd = new Date(appt.end_time);

      if (isBefore(slotStart, apptEnd) && isAfter(slotEnd, apptStart)) {
        isBlocked = true;
        break;
      }
    }

    if (!isBlocked) {
      slots.push(format(currentSlot, 'HH:mm'));
    }

    // Intervalo padrão de 30 min (poderia ser parametrizável no futuro)
    currentSlot = addMinutes(currentSlot, 30);
  }

  return slots;
}