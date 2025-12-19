import { pb } from "./pocketbase";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/shared/types";

// ... (mantenha as funções asAppointment, getStaffAppointmentsByDate, updateAppointmentStatus iguais) ...
// Vou repetir o arquivo completo para garantir que nada se perca:

function asAppointment(record: any): Appointment {
  const expand = record.expand || {};

  return {
    id: record.id,
    shop_id: record.shop_id,
    client_id: record.client_id,
    customer_name: record.customer_name,
    customer_phone: record.customer_phone,
    barber_id: record.barber_id,
    service_id: record.service_id,
    start_time: record.start_time,
    end_time: record.end_time,
    status: record.status,
    total_amount: record.total_amount,
    payment_status: record.payment_status,
    payment_method: record.payment_method, 
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
      payment_method: expand.payment_method
    }
  };
}

export async function getStaffAppointmentsByDate(staffId: string, date: string): Promise<Appointment[]> {
  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;

  const records = await pb.collection("appointments").getFullList<Appointment>({
    filter: `barber_id = "${staffId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}"`,
    sort: "start_time",
    expand: "client_id,service_id,shop_id,barber_id,payment_method",
  });

  return records.map(asAppointment);
}

export async function updateAppointmentStatus(
    id: string, 
    status: AppointmentStatus, 
    paymentStatus?: PaymentStatus,
    paymentMethodId?: string
): Promise<Appointment> {
  const payload: any = { status };
  if (paymentStatus) payload.payment_status = paymentStatus;
  if (paymentMethodId) payload.payment_method = paymentMethodId;

  const record = await pb.collection("appointments").update(id, payload);
  return asAppointment(record);
}

// --- NOVAS FUNÇÕES (WALK-IN) ---

export interface CreateStaffAppointmentDTO {
  shop_id: string;
  barber_id: string;
  service_id: string;
  start_time: string;
  duration_minutes?: number;
  total_amount?: number;
  status: string;
  client_id?: string; 
  customer_name?: string; 
  customer_phone?: string;
}

export async function createStaffAppointment(data: CreateStaffAppointmentDTO): Promise<Appointment> {
  // Validação Frontend
  if (!data.client_id && !data.customer_name) {
    throw new Error("Informe um cliente cadastrado ou o nome do cliente avulso.");
  }

  // 1. Calcula End Time
  let finalEndTime = undefined;
  if (data.start_time && data.duration_minutes) {
    const startDate = new Date(data.start_time);
    const endDate = new Date(startDate.getTime() + data.duration_minutes * 60000);
    finalEndTime = endDate.toISOString(); 
  }

  // 2. Monta Payload (Objeto Vazio Inicialmente)
  const payload: any = {
     shop_id: data.shop_id,
     barber_id: data.barber_id,
     service_id: data.service_id,
     start_time: data.start_time,
     end_time: finalEndTime,
     status: data.status,
     total_amount: data.total_amount,
     // Campos Avulsos: Enviamos apenas se tiver texto, senão não envia a chave
     customer_name: data.customer_name || undefined,
     customer_phone: data.customer_phone || undefined,
  };

  // CORREÇÃO CRÍTICA: Só adiciona client_id no payload se ele existir.
  // Enviar client_id: "" causa erro 400 no PocketBase para campos Relation.
  if (data.client_id) {
    payload.client_id = data.client_id;
  }

  console.log("🚀 Payload Enviado:", payload); // Para debug

  try {
    const record = await pb.collection("appointments").create(payload);
    return asAppointment(record);
  } catch (err: any) {
    console.error("❌ ERRO POCKETBASE:", err.data);
    throw err;
  }
}

export async function searchClients(query: string) {
  return await pb.collection("users").getList(1, 10, {
    filter: `(name ~ "${query}" || email ~ "${query}")`,
  });
}