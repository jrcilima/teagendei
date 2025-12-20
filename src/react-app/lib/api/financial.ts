import { pb } from "./pocketbase";
import { Appointment, AppointmentStatus } from "@/shared/types";

export interface FinancialSummary {
  totalRevenue: number;      // Dinheiro no caixa (Concluído)
  totalPending: number;      // Dinheiro previsto (Confirmado/Pendente)
  countCompleted: number;
  countPending: number;
  byMethod: Record<string, number>; // Ex: { "Pix": 500, "Cartão": 200 }
  dailyData: Record<string, number>; // Ex: { "2023-12-01": 150 }
}

export async function getFinancialData(shopId: string, month: number, year: number) {
  // 1. Define o intervalo de datas (Do dia 1 até o último dia do mês)
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  // Formata para UTC String que o PocketBase aceita
  const startStr = startDate.toISOString().replace("T", " ").substring(0, 19);
  const endStr = endDate.toISOString().replace("T", " ").substring(0, 19);

  // 2. Busca agendamentos (Status != 0 Cancelado)
  const records = await pb.collection("appointments").getFullList<Appointment>({
    filter: `shop_id = "${shopId}" && start_time >= "${startStr}" && start_time <= "${endStr}" && status != "0"`,
    expand: "payment_method",
    requestKey: null // Importante para não cancelar requisições rápidas
  });

  // 3. Processa os dados no Javascript
  const summary: FinancialSummary = {
    totalRevenue: 0,
    totalPending: 0,
    countCompleted: 0,
    countPending: 0,
    byMethod: {},
    dailyData: {}
  };

  records.forEach(appt => {
    const val = appt.total_amount || 0;
    const dateKey = appt.start_time.split(" ")[0]; // Pega YYYY-MM-DD
    
    // Nome do método de pagamento ou "Não informado"
    const methodName = appt.expand?.payment_method?.name || "A Receber/Outros";

    // Consideramos "Receita Realizada" apenas o que foi CONCLUÍDO (Status 4)
    // O resto (Pendente, Confirmado, Em Andamento) é "Previsão"
    const isRealized = appt.status === AppointmentStatus.Completed;

    if (isRealized) {
      summary.totalRevenue += val;
      summary.countCompleted++;

      // Soma por método de pagamento
      if (!summary.byMethod[methodName]) summary.byMethod[methodName] = 0;
      summary.byMethod[methodName] += val;

      // Soma por dia
      if (!summary.dailyData[dateKey]) summary.dailyData[dateKey] = 0;
      summary.dailyData[dateKey] += val;

    } else {
      summary.totalPending += val;
      summary.countPending++;
    }
  });

  return summary;
}