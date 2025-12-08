// Caminho: src/react-app/lib/api/usersApi.ts
import ApiClient from "../api/apiClient";
import type { User } from "../../../shared/types"; // Certifique-se que o User está definido em types.ts

const COLLECTION = "users";

export function usersApi(api: ApiClient) {
  return {
    async list(params?: { filter?: string; sort?: string; perPage?: number }) {
      return api.list<User>(COLLECTION, params);
    },

    async listStaffByShop(shopId: string) {
      return api.list<User>(COLLECTION, {
        filter: `shop_id = "${shopId}" && role != "cliente"`,
        sort: "-created",
        perPage: 100,
      }).then(res => res.items); // Retorna array direto
    },

    async findById(id: string) {
      return api.getById<User>(COLLECTION, id);
    },

    async create(data: any) {
      // Garante visibilidade de email por padrão
      const payload = { ...data, emailVisibility: true };
      return api.create<User>(COLLECTION, payload);
    },

    async createStaff(data: any) {
      const payload = { ...data, emailVisibility: true, role: 'staff' };
      return api.create<User>(COLLECTION, payload);
    },

    async update(id: string, data: any) {
      return api.update<User>(COLLECTION, id, data);
    },

    async updateStaff(id: string, data: any) {
      return api.update<User>(COLLECTION, id, data);
    },

    async deleteStaff(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}
export type UsersApi = ReturnType<typeof usersApi>;