import { pb } from "./pocketbase";
import type { ShopHour, Appointment } from "@/shared/types";
import { AppointmentStatus } from "@/shared/types"; // Importamos para usar o enum se disponível, ou usamos string direta

// Busca horários da loja (Sem try/catch interno, deixa o componente tratar)
export async function getShopHours(shopId: string): Promise<ShopHour[]> {
  return await pb.collection("shop_hours").getFullList<ShopHour>({
    filter: `shop_id = "${shopId}"`,
    sort: "weekday",
  });
}

export async function getProfessionalAppointments(
  professionalId: string,
  date: string
): Promise<Appointment[]> {
  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;

  // CORREÇÃO:
  // 1. Mudamos status != 'cancelled' para status != '0' (Código real do banco)
  // 2. Adicionamos sort criado para garantir ordem
  return await pb.collection("appointments").getFullList<Appointment>({
    filter: `barber_id = "${professionalId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != "0"`,
    sort: "start_time",
  });
}