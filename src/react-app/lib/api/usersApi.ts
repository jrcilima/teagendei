import ApiClient from "../apiClient";
import UserSchema from "../../../shared/schemas/user";
import type { User } from "../../../shared/schemas/user";

const COLLECTION = "users";

export function usersApi(api: ApiClient) {
  return {
    async list(params?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
    }) {
      return api.list<User>(
        COLLECTION,
        {
          page: params?.page,
          perPage: params?.perPage,
          filter: params?.filter,
          sort: params?.sort,
        },
        UserSchema
      );
    },

    async findById(id: string) {
      return api.getById<User>(
        COLLECTION,
        id,
        UserSchema
      );
    },

    async create(data: Partial<User>) {
      return api.create(
        COLLECTION,
        data,
        undefined,   // schemaCreate (opcional)
        UserSchema   // schemaResponse
      );
    },

    async update(id: string, data: Partial<User>) {
      return api.update(
        COLLECTION,
        id,
        data,
        undefined,   // schemaUpdate (opcional)
        UserSchema   // schemaResponse
      );
    },

    async remove(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}

export type UsersApi = ReturnType<typeof usersApi>;
