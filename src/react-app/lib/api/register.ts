import { pb } from "./pocketbase";
import type { RegisterOwnerInput, RegisterClientInput, ShopWithCompany, User } from "@/shared/types";

/* ============================================================
   1) DONO DO NEGÓCIO
   ============================================================ */
export async function registerOwner(input: RegisterOwnerInput) {
  const payload = {
    email: input.email.trim(),
    name: input.name.trim(),
    phone: input.phone ?? "",
    password: input.password,
    passwordConfirm: input.password,
    role: "dono",
    // Dono não tem shop_id na criação do user, ele cria depois no onboarding
  };

  const user = await pb.collection("users").create(payload);
  return user;
}

/* ============================================================
  UTILITÁRIOS DE VÍNCULO
============================================================ */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await pb
      .collection("users")
      .getFirstListItem<User>(`email="${email}"`);
    return user;
  } catch {
    return null;
  }
}

export async function isUserLinkedToCompany(
  userId: string,
  companyId: string
): Promise<boolean> {
  try {
    await pb
      .collection("client_companies")
      .getFirstListItem(`user_id="${userId}" && company_id="${companyId}"`);
    return true;
  } catch {
    return false;
  }
}

export async function linkUserToCompany(
  userId: string,
  companyId: string,
  shopId: string
) {
  try {
      const exists = await isUserLinkedToCompany(userId, companyId);
      if (exists) return null;
  } catch (e) {
      // continua
  }

  const payload = {
    user_id: userId,
    company_id: companyId,
    shop_id: shopId,
  };

  const link = await pb.collection("client_companies").create(payload);
  return link;
}

/* ============================================================
   2) CLIENTE — Fluxo "Failover" (Criação ou Login Automático)
   ============================================================ */
export async function registerClient(input: RegisterClientInput) {
  const { email, password, name, phone, companyId, shopId } = input;
  let user: User | null = null;

  // Passo A: Tentar Criar Usuário
  try {
    const payload = {
      email,
      name,
      phone: phone ?? "",
      password,
      passwordConfirm: password,
      role: "cliente",
      // CORREÇÃO: Salva a empresa e loja de origem diretamente no usuário
      company_id: companyId,
      shop_id: shopId
    };
    
    user = await pb.collection("users").create<User>(payload);
    
    // Se criou agora, precisamos logar para ter permissão de criar o vínculo na tabela auxiliar
    const authData = await pb.collection("users").authWithPassword(email, password);
    user = authData.record as unknown as User;

  } catch (createErr: any) {
    // Passo B: Se deu erro na criação (400), pode ser duplicado OU validação.
    try {
        const authData = await pb.collection("users").authWithPassword(email, password);
        user = authData.record as unknown as User;
        // Sucesso! Era um usuário existente.
    } catch (loginErr) {
        // Se falhar o login, lança o erro original de criação (validação)
        throw createErr;
    }
  }

  // Passo C: Criar Vínculo na tabela auxiliar (Garante histórico multi-loja)
  if (user) {
    try {
        await linkUserToCompany(user.id, companyId, shopId);
        
        // Opcional: Se o usuário existente não tinha shop_id (era null), podemos atualizar agora
        if (!user.shop_id) {
           await pb.collection("users").update(user.id, {
             company_id: companyId,
             shop_id: shopId
           });
        }
        
    } catch (linkErr) {
        console.error("Aviso: Vínculo já existia ou falhou", linkErr);
    }
  }

  return user;
}

/* ============================================================
   3) Buscar shops ativos + empresa
============================================================ */
export async function fetchActiveShopsWithCompany(): Promise<ShopWithCompany[]> {
  const shops = await pb.collection("shops").getFullList({
    filter: `is_active = true`, 
    sort: "name",
    expand: "company_id"
  });

  const result: ShopWithCompany[] = shops.map((shop) => {
      const company = shop.expand?.company_id;
      return {
          shop,
          company: company || { legal_name: "Empresa", id: shop.company_id } 
      };
  });

  return result;
}

/* ============================================================
   4) Utilitários de busca
============================================================ */
export async function getShopById(id: string) {
  return await pb.collection("shops").getOne(id, { expand: 'company_id' });
}

export async function getShopBySlug(slug: string) {
  const list = await pb.collection("shops").getFullList({
    filter: `slug="${slug}"`,
    expand: 'company_id'
  });
  return list.length > 0 ? list[0] : null;
}