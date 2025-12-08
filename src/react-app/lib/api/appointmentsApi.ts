// Caminho: src/react-app/lib/api/appointmentsApi.ts
import ApiClient from "../api/apiClient";
import type { Appointment } from "../../../shared/types";
import { startOfDay, endOfDay } from "date-fns";

const COLLECTION = "appointments";

export function appointmentsApi(api: ApiClient) {
  return {
    async list(params?: { filter?: string; sort?: string; expand?: string }) {
      return api.list<Appointment>(COLLECTION, params);
    },

    async getById(id: string) {
      return api.getById<Appointment>(COLLECTION, id, "client_id, service_id, barber_id");
    },

    /**
     * Busca agendamentos de um intervalo de datas (para verificar conflitos)
     * Essencial para a BookingPage
     */
    async listByShopAndDate(shopId: string, date: Date | string) {
      const targetDate = typeof date === 'string' 
        ? new Date(date.includes('T') ? date : `${date}T00:00:00`)
        : date;

      // Gera range do dia inteiro em UTC (como o PocketBase espera)
      const start = startOfDay(targetDate).toISOString();
      const end = endOfDay(targetDate).toISOString();

      return api.list<Appointment>(COLLECTION, {
        filter: `shop_id = "${shopId}" && start_time >= "${start}" && start_time <= "${end}"`,
        sort: "start_time",
        expand: "service_id, client_id, barber_id",
        perPage: 500, // Garante que traga todos do dia
      }).then(res => res.items);
    },

    /**
     * Lista histórico de um cliente específico
     */
    async listByClient(clientId: string) {
      return api.list<Appointment>(COLLECTION, {
        filter: `client_id = "${clientId}"`,
        sort: "-start_time",
        expand: "service_id, barber_id, shop_id",
      }).then(res => res.items);
    },

    /**
     * Busca agendamentos de hoje para um shop
     */
    async listToday(shopId: string) {
      return this.listByShopAndDate(shopId, new Date());
    },

    async create(data: Partial<Appointment>) {
      return api.create<Appointment>(COLLECTION, data);
    },

    async update(id: string, data: Partial<Appointment>) {
      return api.update<Appointment>(COLLECTION, id, data);
    }
  };
}
// Adicione no final do arquivo:
export type AppointmentsApi = ReturnType<typeof appointmentsApi>;