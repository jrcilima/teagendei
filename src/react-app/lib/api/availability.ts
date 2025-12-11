// Caminho: src/react-app/lib/api/availability.ts
import { pb } from "./pocketbase";
import type { Appointment, ShopHour } from "@/shared/types";

/**
 * Busca os horários de funcionamento da loja
 */
export async function getShopHours(shopId: string): Promise<ShopHour[]> {
  try {
    return await pb.collection("shop_hours").getFullList<ShopHour>({
      filter: `shop_id = "${shopId}"`,
    });
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    return [];
  }
}

/**
 * Busca agendamentos de um profissional em uma data específica
 * para verificar conflitos.
 */
export async function getProfessionalAppointments(
  professionalId: string,
  date: string // Formato YYYY-MM-DD
): Promise<Appointment[]> {
  try {
    // O filtro busca agendamentos que começam no dia especificado
    // status != '0' (0 geralmente é cancelado)
    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

    return await pb.collection("appointments").getFullList<Appointment>({
      filter: `barber_id = "${professionalId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != '0'`,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
}