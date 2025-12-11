import {pb} from "./pocketbase";
import { ClientCompanyLink, User } from "@/shared/types";

export async function createClientUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const payload = {
    email,
    password,
    passwordConfirm: password,
    name,
    role: "cliente",
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

export async function findExistingClientByEmail(
  email: string
): Promise<User | null> {
  try {
    const result = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    return result as unknown as User;
  } catch {
    return null;
  }
}

export async function linkClientToCompany(
  userId: string,
  companyId: string,
  shopId: string | null
): Promise<ClientCompanyLink> {
  const payload = { user_id: userId, company_id: companyId, shop_id: shopId };

  const record = await pb.collection("client_companies").create(payload);
  return record as unknown as ClientCompanyLink;
}

export async function isClientLinkedToCompany(
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
