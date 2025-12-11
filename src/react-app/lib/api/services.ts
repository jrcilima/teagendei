// Caminho: src/react-app/lib/api/services.ts
import {pb} from "./pocketbase"; // ← somente o pb, sem normalizeError
import type { Service } from "@/shared/types";

/**
 * Lista serviços ATIVOS de uma loja, ordenados por nome.
 */
export async function getServicesByShop(
  shopId: string
): Promise<Service[]> {
  try {
    const services = await pb.collection("services").getFullList<Service>({
      filter: `shop_id = "${shopId}" && is_active = true`,
      sort: "name",
    });

    return services;
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
    throw error; // ← retorna erro bruto
  }
}

/**
 * Busca um serviço pelo ID.
 */
export async function getServiceById(
  serviceId: string
): Promise<Service | null> {
  try {
    const record = await pb.collection("services").getOne<Service>(serviceId);
    return record ?? null;
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    console.error("Erro ao buscar serviço:", error);
    throw error;
  }
}
