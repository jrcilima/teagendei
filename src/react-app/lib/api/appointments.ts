import { pb } from "./pocketbase";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/shared/types";

// Função auxiliar asAppointment
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
      client_id: expand.client_id ? { ...expand.client_id, avatar: expand.client_id.avatar ? pb.files.getURL(expand.client_id, expand.client_id.avatar) : undefined } : undefined,
      barber_id: expand.barber_id ? { ...expand.barber_id, avatar: expand.barber_id.avatar ? pb.files.getURL(expand.barber_id, expand.barber_id.avatar) : undefined } : undefined,
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

// --- CRIAÇÃO COM ESTRATÉGIA "GHOST" (A PROVA DE FALHAS) ---

export interface CreateStaffAppointmentDTO {
  shop_id: string;
  barber_id: string;
  start_time: string;
  status: string;
  service_id?: string;
  duration_minutes?: number; 
  notes?: string;
  client_id?: string; 
  customer_name?: string; 
  customer_phone?: string;
  total_amount?: number;
}

export async function createStaffAppointment(data: CreateStaffAppointmentDTO): Promise<Appointment> {
  const isBlock = data.status === AppointmentStatus.Blocked;
  const startIso = new Date(data.start_time).toISOString();

  // Calcula Fim
  let finalEndTime = undefined;
  if (data.start_time && data.duration_minutes) {
    const startDate = new Date(data.start_time);
    const endDate = new Date(startDate.getTime() + data.duration_minutes * 60000);
    finalEndTime = endDate.toISOString(); 
  }

  // Monta Payload Base
  const payload: Record<string, any> = {
     shop_id: data.shop_id,
     barber_id: data.barber_id,
     start_time: startIso,
     end_time: finalEndTime,
     status: data.status,
     notes: data.notes || "",
  };

  if (!isBlock) {
      // === FLUXO NORMAL (Agendamento Real) ===
      payload.total_amount = data.total_amount || 0;
      payload.customer_name = data.customer_name || "";
      payload.customer_phone = data.customer_phone || "";
      payload.payment_status = "1"; // "A Pagar"

      if (data.client_id) payload.client_id = data.client_id;
      if (data.service_id) payload.service_id = data.service_id;

  } else {
      // === FLUXO DE BLOQUEIO (MODO FANTASMA) ===
      // O banco está rejeitando campos vazios com "no rows".
      // Vamos enganar o banco preenchendo tudo com dados reais, mas marcando como Status 6.
      
      console.log("👻 Criando Bloqueio em Modo Fantasma...");

      // 1. CLIENTE: Usamos o próprio Barbeiro (ele é um User válido)
      payload.client_id = data.barber_id;
      
      // 2. SERVIÇO: Buscamos o primeiro serviço disponível na loja
      // Isso resolve o erro de "service_id" obrigatório
      try {
         const dummyService = await pb.collection('services').getFirstListItem(`shop_id="${data.shop_id}"`);
         if (dummyService) {
             payload.service_id = dummyService.id;
         }
      } catch (e) {
         console.warn("Sem serviços na loja. Enviando sem serviço...");
      }

      // 3. PAGAMENTO: NÃO enviamos payment_status se for bloqueio
      // (Isso evita erro se for uma Relation e estivermos mandando string)
      
      // 4. NOTA: Forçamos a nota para identificar visualmente
      if (!payload.notes) payload.notes = "BLOQUEIO DE AGENDA";
      
      payload.total_amount = 0;
  }

  console.log("🚀 Payload Enviado:", payload);

  try {
    const record = await pb.collection("appointments").create(payload);
    return asAppointment(record);
  } catch (err: any) {
    console.error("❌ ERRO FATAL:", err);
    throw err;
  }
}

export async function searchClients(query: string) {
  return await pb.collection("users").getList(1, 10, {
    filter: `(name ~ "${query}" || email ~ "${query}")`,
  });
}