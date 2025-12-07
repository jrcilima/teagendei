import PocketBase from 'pocketbase';

// O Vite expõe variáveis de ambiente via import.meta.env
const serverUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!serverUrl) {
  throw new Error(
    'VITE_POCKETBASE_URL não está definida no arquivo .env. ' +
    'Por favor, configure a URL do seu backend.'
  );
}

export const pb = new PocketBase(serverUrl);

// Desativar cancelamento automático para evitar erros em React Strict Mode
pb.autoCancellation(false);
