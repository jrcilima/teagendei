import PocketBase from 'pocketbase';

// URL do servidor PocketBase
// Tenta ler do arquivo .env, se não encontrar, usa o seu IP direto
const serverUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://136.248.77.97:8090';

export const pb = new PocketBase(serverUrl);

// Desativar cancelamento automático para evitar erros em React Strict Mode durante o desenvolvimento
pb.autoCancellation(false);