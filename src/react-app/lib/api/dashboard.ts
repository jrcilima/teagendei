import { pb } from "./pocketbase";

// Interface para os cards da dashboard e lista do dia
export interface DailyBooking {
  id: string;
  client_id?: string; 
  client_name: string;
  professional_name: string;
  service_name: string;
  time: string; // HH:MM
  status: string; // Label legível
  raw_status: string; // Código 0,1,2...
  value: number;
}

// Busca agendamentos do dia para a dashboard (Owner/Admin ver tudo)
export async function getDailyBookings(shopId: string, date: string): Promise<DailyBooking[]> {
  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;

  // requestKey: null -> Desativa o cancelamento automático do PocketBase
  const records = await pb.collection("appointments").getFullList({
    filter: `shop_id = "${shopId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != "0"`,
    sort: "start_time",
    expand: "client_id,barber_id,service_id",
    requestKey: null 
  });

  return records.map((record) => {
    // 1. CORREÇÃO DE HORA (UTC -> Local)
    // Transforma a data UTC do banco na hora local do navegador do usuário
    const localTime = new Date(record.start_time).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    // Lógica para pegar nome do cliente cadastrado OU avulso
    const clientName = record.expand?.client_id?.name || record.customer_name || "Cliente Avulso";
    const professionalName = record.expand?.barber_id?.name || "Profissional";
    const serviceName = record.expand?.service_id?.name || "Serviço";
    
    // Label Status - CORREÇÃO: Adicionado Status 6 (Bloqueio)
    let statusLabel = "Pendente";
    if (record.status === "2") statusLabel = "Confirmado";
    if (record.status === "3") statusLabel = "Em Andamento";
    if (record.status === "4") statusLabel = "Concluído";
    if (record.status === "6") statusLabel = "Bloqueio"; // <--- NOVO

    return {
      id: record.id,
      client_id: record.client_id || undefined, 
      client_name: record.status === "6" ? "BLOQUEIO" : clientName, // Se for bloqueio, esconde o nome "Barbeiro"
      professional_name: professionalName,
      service_name: record.status === "6" ? (record.notes || "Indisponível") : serviceName,
      time: localTime, // <--- Usa a hora corrigida
      status: statusLabel,
      raw_status: record.status,
      value: record.total_amount || 0
    };
  });
}