import PocketBase from 'pocketbase';

// URL do servidor PocketBase.
// Em desenvolvimento local: http://127.0.0.1:8090
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Desativar cancelamento automático para evitar erros em React Strict Mode
pb.autoCancellation(false);