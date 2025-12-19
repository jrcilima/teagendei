import { pb } from "./pocketbase";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/shared/types";

// Função auxiliar para mapear o registro do PocketBase para o tipo Appointment
function asAppointment(record: any): Appointment {
  const expand = record.expand || {};

  return {
    id: record.id,
    shop_id: record.shop_id,
    client_id: record.client_id,
    barber_id: record.barber_id,
    service_id: record.service_id,
    start_time: record.start_time,
    end_time: record.end_time,
    status: record.status,
    total_amount: record.total_amount,
    payment_status: record.payment_status,
    payment_method: record.payment_method, // Novo campo mapeado
    notes: record.notes,
    created: record.created,
    updated: record.updated,
    expand: {
      shop_id: expand.shop_id,
      client_id: expand.client_id ? {
        ...expand.client_id,
        avatar: expand.client_id.avatar ? pb.files.getURL(expand.client_id, expand.client_id.avatar) : undefined
      } : undefined,
      barber_id: expand.barber_id ? {
        ...expand.barber_id,
        avatar: expand.barber_id.avatar ? pb.files.getURL(expand.barber_id, expand.barber_id.avatar) : undefined
      } : undefined,
      service_id: expand.service_id,
      payment_method: expand.payment_method // Novo expand mapeado
    }
  };
}

export async function getStaffAppointmentsByDate(staffId: string, date: string): Promise<Appointment[]> {
  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;

  const records = await pb.collection("appointments").getFullList<Appointment>({
    filter: `barber_id = "${staffId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}"`,
    sort: "start_time",
    expand: "client_id,service_id,shop_id,barber_id,payment_method", // Adicionado payment_method
  });

  return records.map(asAppointment);
}

// ATUALIZADO: Suporte para atualizar o Método de Pagamento ao finalizar
export async function updateAppointmentStatus(
    id: string, 
    status: AppointmentStatus, 
    paymentStatus?: PaymentStatus,
    paymentMethodId?: string // Parâmetro opcional novo
): Promise<Appointment> {
  
  const payload: any = { status };
  
  if (paymentStatus) {
    payload.payment_status = paymentStatus;
  }
  
  if (paymentMethodId) {
    payload.payment_method = paymentMethodId;
  }

  const record = await pb.collection("appointments").update(id, payload);
  // Usa o helper para retornar o objeto formatado com expands
  return asAppointment(record);
}