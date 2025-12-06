import ApiClient from "../apiClient";
import ShopSchema from "../../../shared/schemas/shop";
import type { Shop } from "../../../shared/schemas/shop";

const COLLECTION = "shops";

export function shopsApi(api: ApiClient) {
  return {
    async list(params?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
    }) {
      return api.list<Shop>(
        COLLECTION,
        {
          page: params?.page,
          perPage: params?.perPage,
          filter: params?.filter,
          sort: params?.sort,
        },
        ShopSchema
      );
    },

    async findById(id: string) {
      return api.getById<Shop>(
        COLLECTION,
        id,
        ShopSchema
      );
    },

    async create(data: Partial<Shop>) {
      return api.create(
        COLLECTION,
        data,
        undefined,
        ShopSchema
      );
    },

    async update(id: string, data: Partial<Shop>) {
      return api.update(
        COLLECTION,
        id,
        data,
        undefined,
        ShopSchema
      );
    },

    async remove(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}

export type ShopsApi = ReturnType<typeof shopsApi>;
