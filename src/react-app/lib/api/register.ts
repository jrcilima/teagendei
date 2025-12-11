// src/react-app/lib/api/register.ts
import {pb} from "./pocketbase";
import type { RegisterOwnerInput, RegisterClientInput, ShopWithCompany } from "@/shared/types";

/* ============================================================
   1) DONO DO NEGÓCIO — Fluxo:
      - Criar usuário
      - Login feito fora desta função
      - Onboarding criará empresa + unidade
   ============================================================ */
export async function registerOwner(input: RegisterOwnerInput) {
  const payload = {
    email: input.email.trim(),
    name: input.name.trim(),
    phone: input.phone ?? "",
    password: input.password,
    passwordConfirm: input.password,
    role: "dono",
  };

  const user = await pb.collection("users").create(payload);
  return user;
}

/* ============================================================
  UTILITÁRIO — achar usuário por email
============================================================ */
export async function findUserByEmail(email: string): Promise<any | null> {
  try {
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);
    return user;
  } catch {
    return null;
  }
}

/* ============================================================
  UTILITÁRIO — verificar se user já está vinculado a empresa
============================================================ */
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

/* ============================================================
  UTILITÁRIO — criar vínculo cliente <-> empresa/unidade
============================================================ */
export async function linkUserToCompany(
  userId: string,
  companyId: string,
  shopId: string
) {
  const payload = {
    user_id: userId,
    company_id: companyId,
    shop_id: shopId,
  };

  const link = await pb.collection("client_companies").create(payload);
  return link;
}

/* ============================================================
   2) CLIENTE — Fluxo Real:
      - Checar se email já existe
         - Se existir → perguntar
         - Se confirmar → criar vínculo novo
      - Se não existir → criar user + vínculo
   ============================================================ */
export async function registerClient(input: RegisterClientInput) {
  const { email, password, name, phone, companyId, shopId } = input;

  const existingUser = await findUserByEmail(email);

  // --------------- Já existe usuário com mesmo email ---------------
  if (existingUser) {
    // Existe vínculo com esta empresa?
    const alreadyLinked = await isUserLinkedToCompany(
      existingUser.id,
      companyId
    );

    if (!alreadyLinked) {
      // Cria novo vínculo
      await linkUserToCompany(existingUser.id, companyId, shopId);
    }

    // Retorna o user já existente
    return existingUser;
  }

  // --------------- Criar novo usuário cliente ---------------
  const payload = {
    email,
    name,
    phone: phone ?? "",
    password,
    passwordConfirm: password,
    role: "cliente",
  };

  const user = await pb.collection("users").create(payload);

  // Criar vínculo obrigatório
  await linkUserToCompany(user.id, companyId, shopId);

  return user;
}

/* ============================================================
   3) Buscar shops ativos + empresa
============================================================ */
export async function fetchActiveShopsWithCompany(): Promise<ShopWithCompany[]> {
  const shops = await pb.collection("shops").getFullList({
    filter: `status = true`,
    sort: "name",
  });

  const result: ShopWithCompany[] = [];

  for (const shop of shops) {
    const company = await pb.collection("companies").getOne(shop.company_id);
    result.push({ shop, company });
  }

  return result;
}

/* ============================================================
   4) Buscar unidade por ID
============================================================ */
export async function getShopById(id: string) {
  return await pb.collection("shops").getOne(id);
}

/* ============================================================
   5) Buscar unidade por slug
============================================================ */
export async function getShopBySlug(slug: string) {
  const list = await pb.collection("shops").getFullList({
    filter: `slug="${slug}"`,
  });

  return list.length > 0 ? list[0] : null;
}
