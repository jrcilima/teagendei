import ApiClient from "../apiClient";
import ServiceSchema from "../../../shared/schemas/service";
import type { Service } from "../../../shared/schemas/service";

const COLLECTION = "services";

export function servicesApi(api: ApiClient) {
  return {
    async list(params?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
    }) {
      return api.list<Service>(
        COLLECTION,
        {
          page: params?.page,
          perPage: params?.perPage,
          filter: params?.filter,
          sort: params?.sort,
        },
        ServiceSchema
      );
    },

    async findById(id: string) {
      return api.getById<Service>(
        COLLECTION,
        id,
        ServiceSchema
      );
    },

    async create(data: Partial<Service>) {
      return api.create(
        COLLECTION,
        data,
        undefined,
        ServiceSchema
      );
    },

    async update(id: string, data: Partial<Service>) {
      return api.update(
        COLLECTION,
        id,
        data,
        undefined,
        ServiceSchema
      );
    },

    async remove(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}

export type ServicesApi = ReturnType<typeof servicesApi>;
