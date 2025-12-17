import { pb } from "./pocketbase";
import type { Shop, PaymentMethod, Segment } from "@/shared/types";

// Buscar segmentos disponíveis
export async function getSegments(): Promise<Segment[]> {
  return await pb.collection("segments").getFullList({ sort: "name" });
}

// Buscar métodos de pagamento (Filtrados pela empresa do usuário ou globais se houver)
export async function getPaymentMethods(companyId?: string): Promise<PaymentMethod[]> {
  // Busca métodos que pertencem à empresa OU são genéricos (sem company_id, se houver)
  // No nosso schema atual, todos têm company_id, então filtramos por ele.
  if (!companyId) return [];
  
  return await pb.collection("payment_methods").getFullList({ 
    filter: `company_id = "${companyId}" && is_active = true`,
    sort: "name" 
  });
}

// 🆕 Criar novo método de pagamento
export async function createPaymentMethod(companyId: string, name: string): Promise<PaymentMethod> {
  const record = await pb.collection("payment_methods").create({
    name,
    company_id: companyId,
    is_active: true
  });
  return record as unknown as PaymentMethod;
}

// Atualizar dados da loja
export async function updateShop(shopId: string, data: Partial<Shop>): Promise<Shop> {
  const record = await pb.collection("shops").update(shopId, data);
  return record as unknown as Shop;
}