// src/shared/types.ts

export interface BaseModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// ==========================================
// Status e Enums (Alinhados com PocketBase Selects)
// ==========================================

// O PocketBase retorna campos 'Select' como strings.
// Usamos 'as const' para criar tipos literais de string.

export const AppointmentStatus = {
  CANCELADO: "0",
  AGENDADO: "1",
  CONFIRMADO: "2",
  EM_ANDAMENTO: "3",
  CONCLUIDO: "4",
  FALTOU: "9"
} as const;

export type AppointmentStatusType = typeof AppointmentStatus[keyof typeof AppointmentStatus];

export const PaymentStatus = {
  NAO_PAGO: "1",
  PAGO: "2",
  REEMBOLSADO: "3"
} as const;

export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

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
  
  // Configurações (JSON no banco)
  business_hours?: any; 
  min_advance_time?: number;
  max_advance_time?: number;
  
  // Financeiro
  pix_key?: string;
  pix_key_type?: PixKeyType;
  
  // Relacionamentos
  company_id: string;
  segment_id?: string;
  owner_id: string;
  
  // Array de IDs
  accepted_payment_methods?: string[]; 
  
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
  
  // Agora tipados corretamente como strings union types
  status: AppointmentStatusType; 
  payment_status: PaymentStatusType;
  
  total_amount?: number;
  notes?: string;
  
  // Relacionamentos (IDs)
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
// Adicione isso ao final do arquivo:
export interface ShopHour extends BaseModel {
  company_id: string;
  shop_id: string;
  weekday: 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
  start_time: string;
  end_time: string;
  is_closed: boolean;
}