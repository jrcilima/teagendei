// src/react-app/lib/pocketbaseFactory.ts
import PocketBase from "pocketbase";

let pbInstance: PocketBase | null = null;
let mockInstance: PocketBase | null = null;

function ensureEnv(): string {
  const url = import.meta.env.VITE_POCKETBASE_URL;

  if (!url) {
    throw new Error("VITE_POCKETBASE_URL não está configurado.");
  }

  if (!/^https?:\/\//.test(url)) {
    throw new Error("VITE_POCKETBASE_URL inválido: deve iniciar com http:// ou https://");
  }

  return url;
}

/**
 * Cria/retorna instância única do PocketBase usada pela aplicação.
 */
export function createPb(forcedUrl?: string): PocketBase {
  if (mockInstance) return mockInstance;
  if (pbInstance) return pbInstance;

  const url = forcedUrl ?? ensureEnv();
  const pb = new PocketBase(url);

  // Evita auto-cancelamento causado pelo React StrictMode
  if (typeof (pb as any).autoCancellation === "function") {
    try {
      (pb as any).autoCancellation(false);
    } catch {
      // Caso futuras versões do SDK removam esse método, ignorar.
    }
  }

  pbInstance = pb;
  return pbInstance;
}

/**
 * Retorna a instância global.
 */
export function getPb(): PocketBase {
  return createPb();
}

/**
 * Injeta um mock do PocketBase (para testes).
 */
export function setMockPb(mock: PocketBase | null) {
  mockInstance = mock;
  if (mock === null) {
    pbInstance = null;
  }
}

/**
 * Garante que nenhuma admin key está exposta no frontend.
 */
export function assertNoAdminKeyInClient() {
  const adminKey = (import.meta.env as any).VITE_POCKETBASE_ADMIN_KEY;

  if (adminKey) {
    throw new Error(
      "Admin key detectada no ambiente do cliente — remova imediatamente (risco crítico de segurança)."
    );
  }
}

export default {
  createPb,
  getPb,
  setMockPb,
  assertNoAdminKeyInClient,
};
