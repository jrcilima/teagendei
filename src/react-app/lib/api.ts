import { pb } from './pocketbase';
import { Company, Shop, Service, Segment, Appointment, User, Category, PaymentMethod, AppointmentStatus } from '../../shared/types';

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

  // Lista todas as lojas (usado pelo tenant/admin)
  list: async () => {
    return await pb.collection('shops').getFullList<Shop>();
  },

  // Busca lojas ativas com filtro opcional de nome (usado pelo cliente)
  searchActive: async (query?: string) => {
    const filterParts = ['is_active = true'];
    if (query && query.trim() !== '') {
      filterParts.push(`name ~ "${query}"`);
    }
    
    return await pb.collection('shops').getFullList<Shop>({
      filter: filterParts.join(' && '),
      sort: 'name',
    });
  },

  getById: async (id: string) => {
    return await pb.collection('shops').getOne<Shop>(id, {
      expand: 'accepted_payment_methods'
    });
  },

  getBySlug: async (slug: string) => {
    return await pb.collection('shops').getFirstListItem<Shop>(`slug="${slug}"`, {
      expand: 'accepted_payment_methods'
    });
  },

  update: async (id: string, data: Partial<Shop>) => {
    return await pb.collection('shops').update<Shop>(id, data);
  },
};

export const paymentMethodsApi = {
  listByCompany: async (companyId: string) => {
    return await pb.collection('payment_methods').getFullList<PaymentMethod>({
      filter: `company_id = "${companyId}" && is_active = true`,
      sort: 'name'
    });
  },
  
  list: async () => {
    return await pb.collection('payment_methods').getFullList<PaymentMethod>({
      filter: 'is_active = true',
      sort: 'name'
    });
  },

  create: async (data: Partial<PaymentMethod>) => {
    return await pb.collection('payment_methods').create(data);
  },

  delete: async (id: string) => {
    return await pb.collection('payment_methods').delete(id);
  }
};

export const categoriesApi = {
  listByShop: async (shopId: string) => {
    return await pb.collection('categories').getFullList<Category>({
      filter: `shop_id = "${shopId}"`,
      sort: 'name'
    });
  },
  create: async (data: Partial<Category>) => { 
    return await pb.collection('categories').create<Category>(data); 
  }
};

export const servicesApi = {
  create: async (data: Partial<Service>) => {
    return await pb.collection('services').create(data);
  },

  listByShop: async (shopId: string) => {
    return await pb.collection('services').getFullList<Service>({
      filter: `shop_id = "${shopId}"`,
      sort: 'name',
      expand: 'category_id'
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
  listToday: async (shopId: string) => {
    return appointmentsApi.listByShopAndDate(shopId, new Date());
  },

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
        expand: 'service_id,client_id,barber_id,payment_method'
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
        expand: 'service_id,barber_id,shop_id,payment_method',
      });
    } catch (error) {
      console.warn("Erro ao buscar histórico do cliente:", error);
      return [];
    }
  },

  create: async (data: Partial<Appointment>) => {
    return await pb.collection('appointments').create(data);
  },

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
      filter: `barber_id = "${staffId}" && start_time >= "${startStr}" && start_time <= "${endStr}" && status != ${AppointmentStatus.CANCELADO}`,
    });
  }
};

export const usersApi = {
  listStaffByShop: async (shopId: string) => {
    try {
      return await pb.collection('users').getFullList<User>({
        filter: `shop_id = "${shopId}" && role != "cliente"`,
        sort: '-created'
      });
    } catch (error) {
      console.warn("Erro ao buscar staff:", error);
      return [];
    }
  },

  getById: async (id: string) => {
    return await pb.collection('users').getOne<User>(id);
  },

  createStaff: async (data: any) => {
    // CORREÇÃO: Verifica se é FormData antes de tentar espalhar propriedades
    if (data instanceof FormData) {
      data.append('emailVisibility', 'true');
      // Se o form não enviou role, adiciona padrão
      if (!data.has('role')) {
         data.append('role', 'barbeiro');
      }
      return await pb.collection('users').create(data);
    }

    // Fallback para objeto simples (JSON)
    return await pb.collection('users').create({
      ...data,
      emailVisibility: true,
      role: 'barbeiro'
    });
  },

  updateStaff: async (id: string, data: any) => {
    return await pb.collection('users').update(id, data);
  },

  deleteStaff: async (id: string) => {
    return await pb.collection('users').delete(id);
  }
};