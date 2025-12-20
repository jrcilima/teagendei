import { pb } from "./pocketbase";
import type { Appointment } from "@/shared/types";

// Tipagem do payload de criação
export interface CreateAppointmentPayload {
  shop_id: string;
  client_id: string;
  service_id: string;
  barber_id: string;
  start_time: string; // ISO string UTC
  end_time: string;   // ISO string UTC
  total_amount: number;
  payment_method?: string;
}

export async function getMyAppointments(userId: string): Promise<Appointment[]> {
  return await pb.collection("appointments").getFullList<Appointment>({
    filter: `client_id = "${userId}"`,
    sort: "-start_time",
    expand: "shop_id,service_id,barber_id,payment_method",
  });
}

export async function createAppointment(data: CreateAppointmentPayload): Promise<Appointment> {
  // status '1' = Pendente; payment_status '1' = A Pagar
  return await pb.collection("appointments").create<Appointment>({
    ...data,
    status: "1",
    payment_status: "1",
  });
}

// Usa canceled_at e canceled_reason
export async function cancelMyAppointment(id: string, reason?: string): Promise<void> {
  await pb.collection("appointments").update(id, {
    status: "0",
    canceled_at: new Date().toISOString(),
    canceled_reason: reason || "Cancelado pelo cliente",
  });
}