// Caminho: src/react-app/lib/api/register.ts
import {pb} from "./pocketbase";
import type { Company, Shop, User } from "@/shared/types";

export interface RegisterOwnerInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterClientInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyId: string;
  shopId: string;
}

/**
 * Registra um DONO (role = 'dono')
 * Não cria empresa nem unidade aqui – isso é papel do onboarding.
 */
export async function registerOwner(data: RegisterOwnerInput): Promise<User> {
  const payload: Record<string, any> = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name,
    phone: data.phone ?? "",
    role: "dono", // compatível com seu schema (select users.role)
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

/**
 * Registra um CLIENTE já amarrado a company_id + shop_id
 */
export async function registerClient(
  data: RegisterClientInput
): Promise<User> {
  const payload: Record<string, any> = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name,
    phone: data.phone ?? "",
    role: "cliente",
    company_id: data.companyId,
    shop_id: data.shopId,
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

/**
 * Estrutura interna para exibir as unidades na tela de cliente
 */
export interface ShopWithCompany {
  shop: Shop;
  company: Company | null;
}

/**
 * Lista todas as SHOPS ativas e resolve a empresa de cada uma
 * via company_id
 */
export async function fetchActiveShopsWithCompany(): Promise<ShopWithCompany[]> {
  // Busca todas as unidades ativas
  const shops = await pb.collection("shops").getFullList<Shop>({
    filter: 'is_active = true',
    sort: "name",
  });

  const companyIds = Array.from(
    new Set(shops.map((s) => s.company_id).filter(Boolean))
  ) as string[];

  const companiesById = new Map<string, Company>();

  await Promise.all(
    companyIds.map(async (id) => {
      try {
        const company = await pb
          .collection("companies")
          .getOne<Company>(id);
        companiesById.set(id, company);
      } catch {
        // se der erro pra alguma company isolada, apenas ignora
      }
    })
  );

  return shops.map((shop) => ({
    shop,
    company: shop.company_id
      ? companiesById.get(shop.company_id) ?? null
      : null,
  }));
}

/**
 * Busca uma unidade específica por ID (para link /register?shopId=...)
 */
export async function getShopById(id: string): Promise<Shop | null> {
  try {
    const shop = await pb.collection("shops").getOne<Shop>(id);
    return shop;
  } catch {
    return null;
  }
}

/**
 * Busca uma unidade específica por slug (para link /register?slug=...)
 */
export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const res = await pb.collection("shops").getList<Shop>(1, 1, {
    filter: `slug = "${slug}" && is_active = true`,
  });

  if (!res.items.length) return null;
  return res.items[0];
}
