// Caminho: src/react-app/lib/api/shopsApi.ts
import ApiClient from "../api/apiClient";
import type { Shop } from "../../../shared/types";
import { use } from "hono/jsx";

const COLLECTION = "shops";

export function shopsApi(api: ApiClient) {
  return {
    async list() {
      return api.list<Shop>(COLLECTION).then(res => res.items);
    },

    async getById(id: string) {
      return api.getById<Shop>(COLLECTION, id, "accepted_payment_methods");
    },

    async getBySlug(slug: string) {
      const result = await api.list<Shop>(COLLECTION, {
        filter: `slug="${slug}"`,
        perPage: 1,
        expand: "accepted_payment_methods"
      });
      
      if (result.items.length === 0) {
        throw new Error("Loja não encontrada");
      }
      return result.items[0];
    },

    async searchActive(query: string) {
      let filter = 'is_active = true';
      if (query) {
        filter += ` && name ~ "${query}"`;
      }
      return api.list<Shop>(COLLECTION, { filter }).then(res => res.items);
    },

    async create(data: Partial<Shop>) {
      return api.create<Shop>(COLLECTION, data);
    },

    async update(id: string, data: Partial<Shop>) {
      return api.update<Shop>(COLLECTION, id, data);
    }
  };
}
// Adicione no final do arquivo:
export type ShopsApi = ReturnType<typeof shopsApi>;