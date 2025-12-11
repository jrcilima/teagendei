// Caminho: src/react-app/lib/api/staff.ts
import { pb } from "./pocketbase";
import type { User } from "@/shared/types";

function asUser(record: any): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role,
    phone: record.phone,
    avatar: record.avatar ? pb.files.getUrl(record, record.avatar) : undefined,
    company_id: record.company_id,
    shop_id: record.shop_id,
    is_professional: record.is_professional,
    created: record.created,
    updated: record.updated,
  };
}

export async function getProfessionalsByShop(shopId: string): Promise<User[]> {
  try {
    // Busca usuários vinculados à loja que sejam profissionais
    const records = await pb.collection("users").getFullList({
      filter: `shop_id = "${shopId}" && is_professional = true`,
      sort: "name",
    });

    return records.map(asUser);
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return [];
  }
}