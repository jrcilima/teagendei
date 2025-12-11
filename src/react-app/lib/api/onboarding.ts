// Caminho: src/react-app/lib/api/onboarding.ts
import { pb } from "./pocketbase";
import type { Company, Shop, User } from "@/shared/types";

/**
 * HELPERS
 */
function asCompany(record: any): Company {
  return {
    id: record.id,
    legal_name: record.legal_name,
    cnpj: record.cnpj,
    plan_status: record.plan_status,
    owner_id: record.owner_id,
    plan: record.plan,
    trial_expires_at: record.trial_expires_at,
    max_shops: record.max_shops,
    max_professionals: record.max_professionals,
    billing_cycle: record.billing_cycle,
    created: record.created,
    updated: record.updated,
  };
}

function asShop(record: any): Shop {
  return {
    id: record.id,
    company_id: record.company_id,
    name: record.name,
    slug: record.slug,
    owner_id: record.owner_id,
    logo: record.logo || undefined,
    address: record.address || "",
    phone: record.phone || "",
    is_active: record.is_active,
    created: record.created,
    updated: record.updated,
  };
}

function asUser(record: any): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role,
    phone: record.phone,
    avatar: record.avatar,
    company_id: record.company_id,
    shop_id: record.shop_id,
    is_professional: record.is_professional,
    created: record.created,
    updated: record.updated,
  };
}

/**
 * 1️⃣ Criar empresa
 * CORREÇÃO: cnpj agora é opcional (string | undefined)
 */
export async function onboardingCreateCompany(data: {
  legal_name: string;
  cnpj?: string; 
  owner_id: string;
}): Promise<Company> {
  const record = await pb.collection("companies").create({
    legal_name: data.legal_name,
    cnpj: data.cnpj ?? "", // Envia string vazia se for undefined, o PB aceita
    owner_id: data.owner_id,
    plan_status: "trial",
    trial_expires_at: null,
    plan: "trial",
    max_shops: 1,
    max_professionals: 3,
    billing_cycle: null, 
  });

  return asCompany(record);
}

/**
 * 2️⃣ Criar unidade (shop)
 */
export async function onboardingCreateShop(data: {
  company_id: string;
  name: string;
  slug: string;
  phone?: string;
  address?: string;
  segment_id?: string;
}): Promise<Shop> {
  const record = await pb.collection("shops").create({
    company_id: data.company_id,
    name: data.name,
    slug: data.slug,
    phone: data.phone ?? "",
    address: data.address ?? "",
    segment_id: data.segment_id ?? "",
    is_active: true,
  });

  return asShop(record);
}

// Wrapper para criar Shop já com owner_id
export async function createInitialShop(
  companyId: string, 
  ownerId: string, 
  data: Partial<Shop>
): Promise<Shop> {
  const record = await pb.collection("shops").create({
    ...data,
    company_id: companyId,
    owner_id: ownerId,
    is_active: true
  });
  return asShop(record);
}

/**
 * 3️⃣ Transformar o Dono em Profissional
 */
export async function onboardingCreateProfessional(data: {
  ownerId: string;
  shopId: string;
}): Promise<User> {
  const record = await pb.collection("users").update(data.ownerId, {
    is_professional: true,
    shop_id: data.shopId,
  });

  return asUser(record);
}

/**
 * 4️⃣ Buscar empresa do dono
 */
export async function getCompanyByOwner(ownerId: string): Promise<Company | null> {
  try {
    const list = await pb.collection("companies").getList(1, 1, {
      filter: `owner_id = "${ownerId}"`,
    });
    return list.items.length > 0 ? asCompany(list.items[0]) : null;
  } catch {
    return null;
  }
}

/**
 * 5️⃣ Buscar unidades da empresa
 */
export async function getShopsByCompany(companyId: string): Promise<Shop[]> {
  const list = await pb.collection("shops").getFullList({
    filter: `company_id = "${companyId}"`,
    sort: "+created",
  });

  return list.map(asShop);
}

/**
 * 6️⃣ Buscar profissionais por empresa
 */
export async function getProfessionalsByCompany(companyId: string): Promise<User[]> {
  const list = await pb.collection("users").getFullList({
    filter: `company_id = "${companyId}" && is_professional = true`,
    sort: "+created",
  });

  return list.map(asUser);
}