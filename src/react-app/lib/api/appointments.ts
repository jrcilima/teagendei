// Caminho: src/react-app/lib/api/appointments.ts
import { pb } from "./pocketbase";
import type { CreateAppointmentDTO, Appointment } from "@/shared/types";

/**
 * Cria um novo agendamento
 */
export async function createAppointment(data: CreateAppointmentDTO): Promise<Appointment> {
  // O PocketBase espera o formato de data ISO UTC. 
  // O DTO já deve vir com a string correta (ex: "2023-12-25 14:30:00")
  
  const record = await pb.collection("appointments").create({
    start_time: data.start_time,
    end_time: data.end_time,
    client_id: data.client_id,
    barber_id: data.barber_id,
    service_id: data.service_id,
    shop_id: data.shop_id,
    status: "1", // 1 = Pendente/Confirmado (dependendo da sua regra)
    payment_status: "1", // 1 = A Pagar
    total_amount: data.total_amount,
    notes: data.notes
  });

  return record as unknown as Appointment;
}