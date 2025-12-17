import { pb } from "./pocketbase";
import type { User } from "@/shared/types";

// Função auxiliar interna
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
  const records = await pb.collection("users").getFullList({
    filter: `shop_id = "${shopId}" && is_professional = true`,
    sort: "name",
  });
  return records.map(asUser);
}

// Criação simplificada de profissional (simulando convite)
export async function createProfessionalUser(data: {
    email: string;
    name: string;
    company_id: string;
    shop_id: string;
}): Promise<User> {
    // Senha provisória padrão
    const tempPassword = "Mudar@123"; 
    
    const record = await pb.collection("users").create({
        email: data.email,
        emailVisibility: true,
        password: tempPassword,
        passwordConfirm: tempPassword,
        name: data.name,
        role: "staff", // ou 'dono' se for sócio
        is_professional: true,
        company_id: data.company_id,
        shop_id: data.shop_id
    });
    
    return asUser(record);
}

export async function removeProfessional(userId: string): Promise<boolean> {
    // Apenas remove a flag, não apaga o user para manter histórico
    await pb.collection("users").update(userId, { is_professional: false });
    return true;
}