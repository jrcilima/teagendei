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

  getBySlug: async (slug: string) => {
    return await pb.collection('shops').getFirstListItem<Shop>(`slug="${slug}"`);
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
  // Lista agendamentos do dia (atalho)
  listToday: async (shopId: string) => {
    return appointmentsApi.listByShopAndDate(shopId, new Date());
  },

  // NOVA: Lista agendamentos de uma data específica
  listByShopAndDate: async (shopId: string, date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startStr = startOfDay.toISOString().replace('T', ' ').substring(0, 19);
    const endStr = endOfDay.toISOString().replace('T', ' ').substring(0, 19);

    try {
      return await pb.collection('appointments').getFullList<Appointment>({
        filter: `shop_id = "${shopId}" && start_time >= "${startStr}" && start_time <= "${endStr}"`,
        sort: 'start_time',
        expand: 'service_id,client_id,barber_id' // Traz os dados relacionados
      });
    } catch (error) {
      console.warn("Erro ao buscar agendamentos:", error);
      return [];
    }
  },

  listByClient: async (clientId: string) => {
    try {
      return await pb.collection('appointments').getFullList<Appointment>({
        filter: `client_id = "${clientId}"`,
        sort: '-start_time',
        expand: 'service_id,barber_id,shop_id',
      });
    } catch (error) {
      console.warn("Erro ao buscar histórico do cliente:", error);
      return [];
    }
  },

  create: async (data: Partial<Appointment>) => {
    return await pb.collection('appointments').create(data);
  },

  // NOVA: Atualizar status ou dados do agendamento
  update: async (id: string, data: Partial<Appointment>) => {
    return await pb.collection('appointments').update(id, data);
  },
  
  listByStaffAndDate: async (staffId: string, date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startStr = startOfDay.toISOString().replace('T', ' ').substring(0, 19);
    const endStr = endOfDay.toISOString().replace('T', ' ').substring(0, 19);

    return await pb.collection('appointments').getFullList<Appointment>({
      filter: `barber_id = "${staffId}" && start_time >= "${startStr}" && start_time <= "${endStr}" && status != "cancelado"`,
    });
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