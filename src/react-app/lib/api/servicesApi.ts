// Caminho: src/react-app/lib/api/servicesApi.ts
import ApiClient from "../api/apiClient";
import type { Service } from "../../../shared/types"; // Importe o tipo correto

const COLLECTION = "services";

export function servicesApi(api: ApiClient) {
  return {
    /**
     * Lista serviços de uma loja específica (apenas ativos)
     * Usado no BookingPage e Dashboard
     */
    async listByShop(shopId: string) {
      return api.list<Service>(COLLECTION, {
        filter: `shop_id = "${shopId}" && is_active = true`,
        sort: "name",
        expand: "category_id",
        perPage: 100,
      }).then(res => res.items);
    },

    async list(params?: { filter?: string; sort?: string }) {
      return api.list<Service>(COLLECTION, params);
    },

    async getById(id: string) {
      return api.getById<Service>(COLLECTION, id, "category_id");
    },

    async create(data: Partial<Service>) {
      return api.create<Service>(COLLECTION, data);
    },

    async update(id: string, data: Partial<Service>) {
      return api.update<Service>(COLLECTION, id, data);
    },

    /**
     * Soft delete: apenas marca como inativo
     */
    async delete(id: string) {
      return api.update<Service>(COLLECTION, id, { is_active: false });
    }
  };
}