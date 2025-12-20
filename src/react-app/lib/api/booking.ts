import { pb } from "./pocketbase";
import { ProfessionalOption, Service, TimeSlot } from "@/shared/types";

// Auxiliares de Tempo
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export async function getProfessionalsByShop(shopId: string): Promise<ProfessionalOption[]> {
  const records = await pb.collection("users").getFullList({
    filter: `shop_id = "${shopId}" && (role = "staff" || role = "dono")`,
  });

  return records.map((rec) => ({
    id: rec.id,
    name: rec.name,
    avatar: rec.avatar ? pb.files.getURL(rec, rec.avatar) : undefined,
  }));
}

export async function getShopServices(shopId: string): Promise<Service[]> {
  return await pb.collection("services").getFullList<Service>({
    filter: `shop_id = "${shopId}"`,
  });
}

/**
 * LÓGICA DE CÁLCULO DE SLOTS
 * Resolve: Fuso Horário e Bloqueio de Duração
 */
export async function getAvailableSlots(
  shopId: string,
  date: string, // YYYY-MM-DD
  professionalId: string,
  serviceDurationMinutes: number
): Promise<TimeSlot[]> {
  
  // Configuração da Loja (Futuramente virá do banco)
  const SHOP_OPEN = "08:00";
  const SHOP_CLOSE = "20:00";
  const SLOT_INTERVAL = 30; // 30 em 30 min

  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;

  // Busca Agendamentos e Bloqueios (Status 6)
  // Status 0 (Rascunho) e 5 (Cancelado) são ignorados
  const appointments = await pb.collection("appointments").getFullList({
    filter: `barber_id = "${professionalId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != "5" && status != "0"`,
  });

  // Mapeia Intervalos Ocupados (Convertendo UTC -> Local)
  const busyIntervals = appointments.map((appt) => {
    // O construtor new Date() lê o "Z" (UTC) do PocketBase e converte 
    // automaticamente para o fuso horário do navegador do usuário.
    const startObj = new Date(appt.start_time);
    const endObj = new Date(appt.end_time);

    return {
      start: dateToMinutes(startObj),
      end: dateToMinutes(endObj),
    };
  });

  const slots: TimeSlot[] = [];
  const startMinutes = timeToMinutes(SHOP_OPEN);
  const endMinutes = timeToMinutes(SHOP_CLOSE);

  // Gera Slots
  for (let current = startMinutes; current < endMinutes; current += SLOT_INTERVAL) {
    const slotStart = current;
    const slotEnd = current + serviceDurationMinutes;

    // Se o serviço termina depois que a loja fecha, ignora
    if (slotEnd > endMinutes) continue;

    // VERIFICAÇÃO DE COLISÃO (CORRIGIDA)
    // Verifica se o intervalo do Slot (Inicio ao Fim) bate em algum ocupado
    const isBusy = busyIntervals.some((busy) => {
      // Lógica de Interseção de Intervalos:
      // (Slot começa antes do Ocupado terminar) E (Slot termina depois do Ocupado começar)
      return slotStart < busy.end && slotEnd > busy.start;
    });

    const timeLabel = minutesToTime(current);
    
    // Constrói ISO para salvamento (Data + Hora Local)
    const slotDateIso = new Date(`${date}T${timeLabel}:00`).toISOString();
    const endDateIso = new Date(new Date(slotDateIso).getTime() + serviceDurationMinutes * 60000).toISOString();

    slots.push({
      time: timeLabel,
      startISO: slotDateIso,
      endISO: endDateIso,
      isAvailable: !isBusy,
    });
  }

  return slots;
}