// Caminho: src/react-app/lib/api.ts
import ApiClient from './api/apiClient';
import { pb } from './pocketbase';

// Importando as fábricas modulares
import { usersApi } from './api/usersApi';
import { shopsApi } from './api/shopsApi';
import { servicesApi } from './api/servicesApi';
import { appointmentsApi } from './api/appointmentsApi';
import { shopHoursApi } from './api/shopHoursApi';
import { paymentMethodsApi } from './api/paymentMethodsApi';
import { segmentsApi } from './api/segmentsApi'; // Agora o arquivo existe!

// Instância única do cliente para ser usada em toda a app (Singleton)
const api = new ApiClient();

// Inicializamos os serviços passando o cliente
const usersService = usersApi(api);
const shopsService = shopsApi(api);
const servicesService = servicesApi(api);
const appointmentsService = appointmentsApi(api);
const shopHoursService = shopHoursApi(api);
const paymentMethodsService = paymentMethodsApi(api);
const segmentsService = segmentsApi(api);

// Exportamos as instâncias com os nomes que as páginas esperam
export {
  usersService as usersApi,
  shopsService as shopsApi,
  servicesService as servicesApi,
  appointmentsService as appointmentsApi,
  shopHoursService as shopHoursApi,
  paymentMethodsService as paymentMethodsApi,
  segmentsService as segmentsApi
};

// --- LEGADO / FUNÇÕES ESPECÍFICAS ---
// A authApi geralmente tem lógica muito específica do PocketBase (login/logout/clear),
// então mantemos ela aqui ou movemos para um 'authApi.ts' dedicado no futuro.

export const authApi = {
  logout: () => {
    pb.authStore.clear();
  },

  register: async (data: any) => {
    return await pb.collection('users').create(data);
  },

  login: async (email: string, password: string) => {
    return await pb.collection('users').authWithPassword(email, password);
  },

  updateProfile: async (id: string, data: any) => {
    return await pb.collection('users').update(id, data);
  }
};

// NOTA: companiesApi ainda não foi migrado para a pasta modular,
// mantemos a versão simplificada aqui para o Onboarding não quebrar.
export const companiesApi = {
  create: async (data: any) => {
    return await pb.collection('companies').create(data);
  },
  list: async () => {
    return await pb.collection('companies').getFullList();
  }
};
