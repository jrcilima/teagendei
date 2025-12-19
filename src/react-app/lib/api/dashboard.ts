import { pb } from "./pocketbase";
import type { Appointment } from "@/shared/types";

// Interface para os dados do gráfico/cards (mantida para tipagem do estado)
export interface DailyKpis {
  total_bookings: number;
  unique_clients: number;
  total_value: number;
}

export interface DailyBooking {
  id: string;
  client_id: string; // Adicionado para contagem correta
  client_name: string;
  professional_name: string;
  service_name: string;
  time: string;
  status: string;
  value: number;
  raw_status: string;
}

function formatTimeVisual(isoString: string) {
  if (!isoString) return "--:--";
  return isoString.substring(11, 16);
}

/**
 * Busca lista de agendamentos.
 * OBS: Não precisamos mais da função fetchDailyKpis separada,
 * calcularemos os totais baseados no retorno desta função.
 */
export async function fetchDailyBookings(shopId: string, dateString: string): Promise<DailyBooking[]> {
  const startOfDay = `${dateString} 00:00:00`;
  const endOfDay = `${dateString} 23:59:59`;

  try {
    const records = await pb.collection("appointments").getFullList<Appointment>({
      filter: `shop_id = "${shopId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != '0'`,
      sort: "+start_time",
      expand: "client_id,barber_id,service_id",
    });

    return records.map((record) => {
      const expanded = (record as any).expand || {};
      const time = formatTimeVisual(record.start_time);

      return {
        id: record.id,
        client_id: record.client_id, // Importante para contar clientes únicos
        client_name: expanded.client_id?.name || "Cliente",
        professional_name: expanded.barber_id?.name || "Profissional",
        service_name: expanded.service_id?.name || "Serviço",
        time,
        status: record.status,
        raw_status: record.status,
        value: record.total_amount || 0
      };
    });
  } catch (err: any) {
    // Se for cancelamento, relança o erro para o componente controlar
    if (err.status === 0 || err.isAbort) {
        throw err;
    }
    console.error("[Bookings] Erro ao buscar lista:", err);
    return [];
  }
}