// Caminho: src/react-app/lib/api/shopHoursApi.ts
import ApiClient from "../api/apiClient";
import type { ShopHour } from "../../../shared/schemas/shopHours"; // Vamos garantir que esse schema exista na próxima etapa

const COLLECTION = "shop_hours";

export function shopHoursApi(api: ApiClient) {
  return {
    /**
     * Lista todos os horários de uma loja específica.
     */
    async listByShop(companyId: string, shopId: string) {
      return api.list<ShopHour>(COLLECTION, {
        filter: `company_id = "${companyId}" && shop_id = "${shopId}"`,
        sort: "weekday", // Ordena ou trata no front
        perPage: 50,
      });
    },

    async create(data: Partial<ShopHour>) {
      return api.create<ShopHour>(COLLECTION, data);
    },

    async update(id: string, data: Partial<ShopHour>) {
      return api.update<ShopHour>(COLLECTION, id, data);
    },

    async delete(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}