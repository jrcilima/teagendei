// Caminho: src/react-app/lib/api/paymentMethodsApi.ts
import ApiClient from "../api/apiClient";
import type { PaymentMethod } from "../../../shared/types";

const COLLECTION = "payment_methods";

export function paymentMethodsApi(api: ApiClient) {
  return {
    async listByCompany(companyId: string) {
      return api.list<PaymentMethod>(COLLECTION, {
        filter: `company_id = "${companyId}" && is_active = true`,
        sort: "name",
        perPage: 100
      }).then(res => res.items);
    },

    async create(data: Partial<PaymentMethod>) {
      return api.create<PaymentMethod>(COLLECTION, data);
    },

    async delete(id: string) {
      return api.delete(COLLECTION, id);
    }
  };
}
// Adicione no final do arquivo:
export type PaymentMethodsApi = ReturnType<typeof paymentMethodsApi>;