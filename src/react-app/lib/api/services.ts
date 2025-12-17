import { pb } from "./pocketbase";
import type { Service, Category } from "@/shared/types";

// --- SERVIÇOS ---

export async function getServicesByShop(shopId: string): Promise<Service[]> {
  return await pb.collection("services").getFullList<Service>({
    filter: `shop_id = "${shopId}" && is_active = true`,
    sort: "name",
    expand: "category_id"
  });
}

export async function createService(data: Partial<Service>): Promise<Service> {
  const record = await pb.collection("services").create(data);
  return record as unknown as Service;
}

export async function deleteService(id: string): Promise<boolean> {
  return await pb.collection("services").update(id, { is_active: false });
}

// --- CATEGORIAS (Adicionando aqui para facilitar importação) ---

export async function getCategoriesByShop(shopId: string): Promise<Category[]> {
  return await pb.collection("categories").getFullList<Category>({
    filter: `shop_id = "${shopId}"`,
    sort: "name",
  });
}

export async function createCategory(shopId: string, name: string): Promise<Category> {
  const record = await pb.collection("categories").create({
    shop_id: shopId,
    name: name
  });
  return record as unknown as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  return await pb.collection("categories").delete(id);
}