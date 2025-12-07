import type { ShopHour } from "../../shared/schemas/shopHours";

export type TimeSlot = {
  start: Date;
  end: Date;
};

/**
 * Converte "HH:MM" para Date
 */
function timeToDate(baseDate: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const result = new Date(baseDate);
  result.setHours(h, m, 0, 0);
  return result;
}

/**
 * Gera slots entre dois horários
 */
function generateSlotsInInterval(
  date: Date,
  start: string,
  end: string,
  serviceDuration: number
): TimeSlot[] {
  const startDate = timeToDate(date, start);
  const endDate = timeToDate(date, end);

  const slots: TimeSlot[] = [];
  let cursor = new Date(startDate);

  while (cursor.getTime() + serviceDuration * 60000 <= endDate.getTime()) {
    const slotEnd = new Date(cursor.getTime() + serviceDuration * 60000);
    slots.push({ start: new Date(cursor), end: slotEnd });

    cursor = new Date(cursor.getTime() + serviceDuration * 60000);
  }

  return slots;
}

/**
 * Filtra shop_hours por dia da semana
 */
export function getHoursForWeekday(
  allHours: ShopHour[],
  weekday: string
): ShopHour[] {
  return allHours.filter((h) => h.weekday === weekday);
}

/**
 * Gera slots para um dia específico
 */
export function generateDailySlots(
  date: Date,
  allHours: ShopHour[],
  serviceDuration: number
): TimeSlot[] {
  const weekday = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"][
    date.getDay()
  ];

  const dayHours = getHoursForWeekday(allHours, weekday);

  // loja fechada
  if (dayHours.some((h) => h.is_closed)) {
    return [];
  }

  // gerar slots por intervalo
  const slots: TimeSlot[] = [];

  for (const h of dayHours) {
    slots.push(
      ...generateSlotsInInterval(date, h.start_time, h.end_time, serviceDuration)
    );
  }

  return slots;
}

/**
 * Gera slots para vários dias (ex: 7 dias)
 */
export function generateSlotsForRange(
  startDate: Date,
  days: number,
  allHours: ShopHour[],
  serviceDuration: number
): Record<string, TimeSlot[]> {
  const result: Record<string, TimeSlot[]> = {};

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const key = date.toISOString().split("T")[0];

    result[key] = generateDailySlots(date, allHours, serviceDuration);
  }

  return result;
}
