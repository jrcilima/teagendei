// API client for backend communication

const API_BASE = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new ApiError(response.status, error.error || 'Erro na requisição');
  }

  return response.json();
}

// Auth
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'dono' | 'staff' | 'cliente';
  }) => fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (email: string, password: string) =>
    fetchApi<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => fetchApi('/auth/me'),
};

// Companies
export const companiesApi = {
  create: (data: { legal_name: string; cnpj: string }) =>
    fetchApi('/companies', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  list: () => fetchApi('/companies'),

  getById: (id: number) => fetchApi(`/companies/${id}`),
};

// Shops
export const shopsApi = {
  create: (data: {
    name: string;
    slug: string;
    segment_id: number;
    address?: string;
    phone?: string;
    description?: string;
  }) =>
    fetchApi('/shops', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  list: () => fetchApi('/shops'),

  getById: (id: number) => fetchApi(`/shops/${id}`),

  update: (id: number, data: any) =>
    fetchApi(`/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Services
export const servicesApi = {
  create: (data: {
    name: string;
    description?: string;
    price: number;
    duration: number;
    category?: string;
    shop_id: number;
  }) =>
    fetchApi('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  listByShop: (shopId: number) => fetchApi(`/services/shop/${shopId}`),

  getById: (id: number) => fetchApi(`/services/${id}`),

  update: (id: number, data: any) =>
    fetchApi(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi(`/services/${id}`, {
      method: 'DELETE',
    }),
};

// Segments
export const segmentsApi = {
  list: () => fetchApi('/segments'),
  getBySlug: (slug: string) => fetchApi(`/segments/${slug}`),
};
