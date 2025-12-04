import { pb } from './pocketbase';
import { Company, Shop, Service, Segment, Appointment, User } from '../../shared/types';

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

export const companiesApi = {
  create: async (data: Partial<Company>) => {
    return await pb.collection('companies').create(data);
  },

  list: async () => {
    return await pb.collection('companies').getFullList<Company>();
  },

  getById: async (id: string) => {
    return await pb.collection('companies').getOne<Company>(id);
  },
  
  update: async (id: string, data: Partial<Company>) => {
    return await pb.collection('companies').update<Company>(id, data);
  }
};

export const shopsApi = {
  create: async (data: Partial<Shop>) => {
    return await pb.collection('shops').create(data);
  },

  list: async () => {
    return await pb.collection('shops').getFullList<Shop>();
  },

  getById: async (id: string) => {
    return await pb.collection('shops').getOne<Shop>(id);
  },

  update: async (id: string, data: Partial<Shop>) => {
    return await pb.collection('shops').update<Shop>(id, data);
  },
};

export const servicesApi = {
  create: async (data: Partial<Service>) => {
    return await pb.collection('services').create(data);
  },

  listByShop: async (shopId: string) => {
    return await pb.collection('services').getFullList<Service>({
      filter: `shop_id = "${shopId}"`,
      sort: 'name'
    });
  },

  getById: async (id: string) => {
    return await pb.collection('services').getOne<Service>(id);
  },

  update: async (id: string, data: Partial<Service>) => {
    return await pb.collection('services').update<Service>(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection('services').update(id, { is_active: false });
  },
};

export const segmentsApi = {
  list: async () => {
    return await pb.collection('segments').getFullList<Segment>({
      sort: 'name'
    });
  },
  
  getBySlug: async (slug: string) => {
    return await pb.collection('segments').getFirstListItem<Segment>(`slug="${slug}"`);
  },
};

export const appointmentsApi = {
  // Lista agendamentos do dia para o Dono/Staff
  listToday: async (shopId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startStr = today.toISOString().replace('T', ' ').substring(0, 19);
    const endStr = tomorrow.toISOString().replace('T', ' ').substring(0, 19);

    try {
      return await pb.collection('appointments').getFullList<Appointment>({
        filter: `shop_id = "${shopId}" && start_time >= "${startStr}" && start_time < "${endStr}"`,
      });
    } catch (error) {
      console.warn("Erro ao buscar agendamentos:", error);
      return [];
    }
  },

  // NOVA FUNÇÃO: Lista histórico de agendamentos do Cliente
  listByClient: async (clientId: string) => {
    try {
      return await pb.collection('appointments').getFullList<Appointment>({
        filter: `client_id = "${clientId}"`,
        sort: '-start_time', // Mais recentes primeiro
        expand: 'service_id,barber_id,shop_id', // Traz dados do serviço e barbeiro
      });
    } catch (error) {
      console.warn("Erro ao buscar histórico do cliente:", error);
      return [];
    }
  }
};

export const usersApi = {
  listStaffByShop: async (shopId: string) => {
    try {
      return await pb.collection('users').getFullList<User>({
        filter: `shop_id = "${shopId}"`,
      });
    } catch (error) {
      console.warn("Erro ao buscar staff:", error);
      return [];
    }
  }
};