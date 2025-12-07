// src/react-app/lib/api/shopHoursApi.ts
import ApiClient from '../apiClient';
import ShopHourSchema from '../../../shared/schemas/shopHours';
import type { ShopHour } from '../../../shared/schemas/shopHours';

const COLLECTION = 'shop_hours';

export function shopHoursApi(api: ApiClient) {
  return {
    // Lista genérica com paginação/filtro
    async list(params?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
    }) {
      return api.list<ShopHour>(
        COLLECTION,
        {
          page: params?.page,
          perPage: params?.perPage,
          filter: params?.filter,
          sort: params?.sort
        },
        ShopHourSchema
      );
    },

    // Atalho principal: buscar horários de uma loja
    async listByShop(companyId: string, shopId: string) {
      return api.list<ShopHour>(
        COLLECTION,
        {
          page: 1,
          perPage: 200,
          filter: `company_id = "${companyId}" && shop_id = "${shopId}"`,
          sort: 'weekday'
        },
        ShopHourSchema
      );
    },

    async findById(id: string) {
      return api.getById<ShopHour>(COLLECTION, id, ShopHourSchema);
    },

    async create(data: Partial<ShopHour>) {
      return api.create(
        COLLECTION,
        data,
        undefined, // schemaCreate (opcional)
        ShopHourSchema // valida resposta
      );
    },

    async update(id: string, data: Partial<ShopHour>) {
      return api.update(
        COLLECTION,
        id,
        data,
        undefined, // schemaUpdate (opcional)
        ShopHourSchema
      );
    },

    async remove(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}

export type ShopHoursApi = ReturnType<typeof shopHoursApi>;
