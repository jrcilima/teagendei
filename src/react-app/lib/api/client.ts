import { pb } from "./pocketbase";
import { Appointment, AppointmentStatus } from "@/shared/types";

// ... (mantenha createClientUser, findExistingClientByEmail, etc.)

/**
 * Busca todos os agendamentos do cliente logado
 */
export async function getMyAppointments(userId: string): Promise<Appointment[]> {
  const records = await pb.collection("appointments").getFullList<Appointment>({
    filter: `client_id = "${userId}"`,
    sort: "-start_time", // Mais recentes primeiro
    expand: "shop_id,service_id,barber_id", // Traz dados da loja, serviço e barbeiro
  });
  return records;
}

/**
 * Cancela um agendamento (pelo próprio cliente)
 */
export async function cancelMyAppointment(appointmentId: string): Promise<boolean> {
  await pb.collection("appointments").update(appointmentId, {
    status: AppointmentStatus.Cancelled,
  });
  return true;
}