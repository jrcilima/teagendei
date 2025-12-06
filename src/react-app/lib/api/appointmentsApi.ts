import ApiClient from "../apiClient";
import AppointmentSchema from "../../../shared/schemas/appointment";
import type { Appointment } from "../../../shared/schemas/appointment";

const COLLECTION = "appointments";

export function appointmentsApi(api: ApiClient) {
  return {
    async list(params?: {
      page?: number;
      perPage?: number;
      filter?: string;
      sort?: string;
    }) {
      return api.list<Appointment>(
        COLLECTION,
        {
          page: params?.page,
          perPage: params?.perPage,
          filter: params?.filter,
          sort: params?.sort,
        },
        AppointmentSchema
      );
    },

    async findById(id: string) {
      return api.getById<Appointment>(
        COLLECTION,
        id,
        AppointmentSchema
      );
    },

    async create(data: Partial<Appointment>) {
      return api.create(
        COLLECTION,
        data,
        undefined,
        AppointmentSchema
      );
    },

    async update(id: string, data: Partial<Appointment>) {
      return api.update(
        COLLECTION,
        id,
        data,
        undefined,
        AppointmentSchema
      );
    },

    async remove(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}

export type AppointmentsApi = ReturnType<typeof appointmentsApi>;
