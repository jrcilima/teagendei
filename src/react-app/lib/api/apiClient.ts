// Caminho: src/react-app/lib/api/apiClient.ts
import { pb } from "../pocketbase"; // <--- Ajustado de ./ para ../
import type { RecordModel } from "pocketbase";

export default class ApiClient {
  constructor() {}

  async list<T>(
    collection: string,
    options?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
      expand?: string;
    }
  ) {
    const page = options?.page || 1;
    const perPage = options?.perPage || 50;

    return await pb.collection(collection).getList<T & RecordModel>(page, perPage, {
      filter: options?.filter,
      sort: options?.sort,
      expand: options?.expand,
    });
  }

  async getById<T>(collection: string, id: string, expand?: string) {
    return await pb.collection(collection).getOne<T & RecordModel>(id, {
      expand: expand,
    });
  }

  async create<T>(collection: string, data: any) {
    return await pb.collection(collection).create<T & RecordModel>(data);
  }

  async update<T>(collection: string, id: string, data: any) {
    return await pb.collection(collection).update<T & RecordModel>(id, data);
  }

  async delete(collection: string, id: string) {
    return await pb.collection(collection).delete(id);
  }
}