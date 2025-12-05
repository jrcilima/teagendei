// src/shared/types.ts

export interface BaseModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// ==========================================
// Enums para Lógica de Negócio (Frontend)
// ==========================================

export enum AppointmentStatus {
  CANCELADO = 0,
  AGENDADO = 1,
  CONFIRMADO = 2,
  EM_ANDAMENTO = 3,
  CONCLUIDO = 4,
  FALTOU = 9
}

export enum PaymentStatus {
  NAO_PAGO = 1,
  PAGO = 2,
  REEMBOLSADO = 3
}

export type UserRole = 'dono' | 'staff' | 'cliente';
export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';

// ==========================================
// Interfaces das Coleções (Refletindo o Banco)
// ==========================================

export interface User extends BaseModel {
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  is_professional: boolean;
  company_id?: string;
  shop_id?: string;
}

export interface Company extends BaseModel {
  legal_name: string;
  cnpj?: string;
  plan_status?: 'trial' | 'active' | 'suspended' | 'cancelled';
  owner_id: string;
}

export interface Shop extends BaseModel {
  name: string;
  slug: string;
  is_active: boolean;
  address?: string;
  phone?: string;
  description?: string;
  logo?: string;
  
  // Configurações
  business_hours?: any; // JSON no banco
  min_advance_time?: number;
  max_advance_time?: number;
  
  // Financeiro
  pix_key?: string;
  pix_key_type?: PixKeyType;
  
  // Relacionamentos
  company_id: string;
  segment_id?: string;
  owner_id: string;
  // manager_id REMOVIDO pois não existe no schema
  accepted_payment_methods?: string[]; // Array de IDs
  
  expand?: {
    accepted_payment_methods?: PaymentMethod[];
    company_id?: Company;
  };
}

export interface Service extends BaseModel {
  name: string;
  description?: string;
  price: number;
  duration: number;
  is_active: boolean;
  shop_id: string;
  category_id?: string;
  
  expand?: {
    category_id?: Category;
  };
}

export interface Category extends BaseModel {
  name: string;
  shop_id: string;
}

export interface Appointment extends BaseModel {
  start_time: string; // ISO String (UTC)
  end_time: string;   // ISO String (UTC)
  
  // No banco novo, estes campos são Selects (Strings "0", "1")
  status: string; 
  payment_status: string;
  
  total_amount?: number;
  notes?: string;
  
  // Relacionamentos
  client_id: string;
  barber_id: string;
  service_id: string;
  shop_id: string;
  payment_method?: string;
  
  expand?: {
    client_id?: User;
    barber_id?: User;
    service_id?: Service;
    shop_id?: Shop;
    payment_method?: PaymentMethod;
  };
}

export interface PaymentMethod extends BaseModel {
  name: string;
  is_active: boolean;
  company_id?: string;
}

export interface Segment extends BaseModel {
  name: string;
  slug: string;
  icon?: string;
}