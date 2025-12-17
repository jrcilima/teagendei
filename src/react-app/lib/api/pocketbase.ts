// src/react-app/lib/api/pocketbase.ts
import PocketBase, { AuthModel } from "pocketbase";
import { Company, Shop, User } from "@/shared/types";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL as string;

if (!PB_URL) {
  console.warn("VITE_POCKETBASE_URL não definido. Configure no .env");
}

export const pb = new PocketBase(PB_URL);

// ---------------------------
// Persistência manual do auth
// ---------------------------

const AUTH_STORAGE_KEY = "teagendei_auth_store";

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      token: string;
      model: AuthModel | null;
    };
    if (parsed?.token) {
      pb.authStore.save(parsed.token, parsed.model || null);
    }
  } catch (err) {
    console.error("Erro ao carregar auth do localStorage", err);
  }
}

function subscribeAuthStore() {
  pb.authStore.onChange((token, model) => {
    try {
      const payload = JSON.stringify({ token, model });
      localStorage.setItem(AUTH_STORAGE_KEY, payload);
    } catch (err) {
      console.error("Erro ao salvar auth no localStorage", err);
    }
  });
}

// inicializa na carga do módulo
loadAuthFromStorage();
subscribeAuthStore();

// ---------------------------
// Helpers de AUTH
// ---------------------------

export async function login(email: string, password: string): Promise<User> {
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
  return authData.record as unknown as User;
}

export function logout(): void {
  pb.authStore.clear();
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function refreshAuth(): Promise<void> {
  if (!pb.authStore.isValid) return;
  try {
    await pb.collection("users").authRefresh();
  } catch (err: any) {
    // CORREÇÃO: Ignora cancelamento automático para não deslogar
    if (err.status === 0 || err.isAbort) {
      return;
    }
    console.warn("Falha ao fazer authRefresh, limpando sessão", err);
    pb.authStore.clear();
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

export async function getCurrentUserTyped(): Promise<User | null> {
  const model = pb.authStore.model as AuthModel | null;
  if (!model) return null;

  try {
    const record = await pb.collection("users").getOne<User>(model.id, {
      requestKey: `current_user_${model.id}`,
    });
    return record;
  } catch {
    return model as unknown as User;
  }
}

// ---------------------------
// Helpers multi-tenant básicos
// ---------------------------

export async function getMyCompanies(): Promise<Company[]> {
  const user = pb.authStore.model as AuthModel | null;
  if (!user) return [];

  const list = await pb.collection("companies").getFullList<Company>({
    filter: `owner_id = "${user.id}"`,
    sort: "created",
  });

  return list;
}

export async function getShopsByCompany(companyId: string): Promise<Shop[]> {
  if (!companyId) return [];

  const list = await pb.collection("shops").getFullList<Shop>({
    filter: `company_id = "${companyId}"`,
    sort: "name",
  });

  return list;
}

export function normalizeError(err: any): string {
  if (!err) return "Erro desconhecido";
  if (typeof err === "string") return err;
  if (err?.message) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return "Erro inesperado";
  }
}