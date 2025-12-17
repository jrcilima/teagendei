import { pb } from "./pocketbase";
import type { CreateAppointmentDTO, Appointment, AppointmentStatus, PaymentStatus } from "@/shared/types";

/**
 * Cria um novo agendamento
 */
export async function createAppointment(data: CreateAppointmentDTO): Promise<Appointment> {
  // PocketBase espera datas em UTC. O front deve enviar ISO string completa.
  const record = await pb.collection("appointments").create({
    start_time: data.start_time,
    end_time: data.end_time,
    client_id: data.client_id,
    barber_id: data.barber_id,
    service_id: data.service_id,
    shop_id: data.shop_id,
    status: "1", // 1 = Pendente
    payment_status: "1", // 1 = A Pagar
    total_amount: data.total_amount,
    notes: data.notes
  });
  return record as unknown as Appointment;
}

/**
 * 🆕 Busca agendamentos do dia para um profissional (STAFF)
 * CORREÇÃO: Usa data local para definir o filtro de início e fim do dia
 */
export async function getStaffAppointmentsToday(barberId: string): Promise<Appointment[]> {
  // Cria data local correta (YYYY-MM-DD)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayDateString = `${year}-${month}-${day}`;

  // Filtro: do início (00:00:00) ao fim (23:59:59) do dia LOCAL
  const startOfDay = `${todayDateString} 00:00:00`;
  const endOfDay = `${todayDateString} 23:59:59`;

  const records = await pb.collection("appointments").getFullList<Appointment>({
    filter: `barber_id = "${barberId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != '0'`,
    sort: "+start_time",
    expand: "client_id,service_id,payment_method",
  });

  return records;
}

/**
 * 🆕 Atualiza status do agendamento (Iniciar, Finalizar, Cancelar)
 */
export async function updateAppointmentStatus(
  id: string, 
  status: AppointmentStatus, 
  paymentStatus?: PaymentStatus
): Promise<Appointment> {
  const data: any = { status };
  
  // Se mudar o status de pagamento, envia junto
  if (paymentStatus) {
    data.payment_status = paymentStatus;
  }
  
  const record = await pb.collection("appointments").update(id, data);
  return record as unknown as Appointment;
}