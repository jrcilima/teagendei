import { pb } from "./pocketbase";
import type { User } from "@/shared/types";

function asUser(record: any): User {
    return {
      id: record.id,
      email: record.email,
      name: record.name,
      role: record.role,
      phone: record.phone,
      avatar: record.avatar ? pb.files.getURL(record, record.avatar) : undefined,
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

export async function createProfessionalUser(data: {
    email: string;
    name: string;
    phone?: string;
    password?: string;
    company_id: string;
    shop_id: string;
}): Promise<User> {
    
    // Define senha: Se vier vazia ou curta (<8), usa a padrão.
    const passwordToUse = (data.password && data.password.trim().length >= 8) 
        ? data.password 
        : "Mudar@123";

    // Payload de criação
    const payload: any = {
        email: data.email.trim(), 
        emailVisibility: false, // CORREÇÃO: False para manter padrão
        // verified: true, // OBS: O PocketBase ignora isso se quem cria não for Admin.
                           // Por isso é necessário desativar "Require email verification" nas configurações.
        password: passwordToUse,
        passwordConfirm: passwordToUse,
        name: data.name.trim(),
        role: "staff",
        is_professional: true,
        company_id: data.company_id,
        shop_id: data.shop_id
    };

    if (data.phone && data.phone.trim() !== "") {
        payload.phone = data.phone.trim();
    }

    const record = await pb.collection("users").create(payload);
    return asUser(record);
}

export async function updateProfessionalUser(id: string, data: {
    name?: string;
    phone?: string;
}): Promise<User> {
    const payload: any = {};
    
    if (data.name !== undefined) payload.name = data.name.trim();
    if (data.phone !== undefined) payload.phone = data.phone.trim();

    const record = await pb.collection("users").update(id, payload);
    return asUser(record);
}

export async function removeProfessional(userId: string): Promise<boolean> {
    await pb.collection("users").update(userId, { is_professional: false });
    return true;
}