// src/react-app/lib/api/dashboard.ts

import {pb} from "./pocketbase";

/* ------------------------------------------------------
   Tipos do Dashboard
------------------------------------------------------ */

export type TodayKpis = {
  total_bookings: number;
  unique_clients: number;
  total_value: number;
};

export type TodayBooking = {
  id: string;
  client_name: string;
  professional_name: string;
  service_name: string;
  time: string;
};

/* ------------------------------------------------------
   Função: KPIs do dia
------------------------------------------------------ */

export async function fetchTodayKpis(shopId: string): Promise<TodayKpis> {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // yyyy-mm-dd

  const records = await pb.collection("appointments").getFullList({
    filter: `shop_id = "${shopId}" && date = "${dateStr}"`,
    expand: "client_id,professional_id,service_id",
  });

  const total_bookings = records.length;

  const unique_clients = new Set(
    records.map((r) => r.client_id)
  ).size;

  const total_value = records.reduce((sum, r) => {
    const service = r.expand?.service_id;
    const value = service?.price ?? 0;
    return sum + Number(value);
  }, 0);

  return {
    total_bookings,
    unique_clients,
    total_value,
  };
}

/* ------------------------------------------------------
   Função: Próximos atendimentos do dia
------------------------------------------------------ */

export async function fetchTodayBookings(
  shopId: string
): Promise<TodayBooking[]> {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  const records = await pb.collection("appointments").getFullList({
    filter: `shop_id = "${shopId}" && date = "${dateStr}"`,
    sort: "start_time",
    expand: "client_id,professional_id,service_id",
  });

  return records.map((r) => ({
    id: r.id,
    client_name: r.expand?.client_id?.name ?? "Cliente",
    professional_name: r.expand?.professional_id?.name ?? "Profissional",
    service_name: r.expand?.service_id?.name ?? "Serviço",
    time: r.start_time ?? "",
  }));
}
