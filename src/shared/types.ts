// src/shared/types.ts

// ------------------------------------
// ENUMS / TIPOS BÁSICOS
// ------------------------------------

export type UserRole = 'dono' | 'cliente' | 'staff';

export enum AppointmentStatus {
  Cancelled = '0',
  Pending = '1',
  Confirmed = '2',
  InProgress = '3',
  Completed = '4',
  NoShow = '5',
  Blocked = '6',
  Rescheduled = '7',
  AwaitingPayment = '8',
  Other = '9',
}

export enum PaymentStatus {
  A_PAGAR = '1',
  PAGO = '2',
  PENDENTE = '3',
}

export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';

export type Weekday = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

export type CompanyPlanStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

export type SubscriptionPlan = 'trial' | 'basic' | 'pro';

// ------------------------------------
// BASE RECORD
// ------------------------------------

export interface BaseRecord {
  id: string;
  created: string; // ISO date
  updated: string; // ISO date
}

// ------------------------------------
// USERS
// ------------------------------------

export interface User extends BaseRecord {
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  company_id?: string | null;
  shop_id?: string | null;
  is_professional?: boolean;
}

// ------------------------------------
// COMPANIES
// ------------------------------------

export interface Company extends BaseRecord {
  legal_name: string;
  cnpj?: string;
  plan_status: CompanyPlanStatus;
  owner_id: string;
  plan?: SubscriptionPlan | null;
  active_subscription_id?: string | null;
  trial_expires_at?: string | null;
  max_shops?: number | null;
  max_professionals?: number | null;
  billing_cycle?: string | null;
}

// ------------------------------------
// SHOPS
// ------------------------------------

export interface Shop extends BaseRecord {
  name: string;
  slug: string;
  logo?: string;
  address?: string;
  phone?: string;
  company_id: string;
  owner_id: string;
  description?: string;
  accepted_payment_methods?: string[];
  pix_key?: string;
  pix_key_type?: PixKeyType;
  segment_id?: string | null;
  min_advance_time?: number | null;
  max_advance_time?: number | null;
  is_active?: boolean;
}

// ------------------------------------
// CATEGORIES & SERVICES
// ------------------------------------

export interface Category extends BaseRecord {
  name: string;
  shop_id: string;
}

export interface Service extends BaseRecord {
  name: string;
  description?: string;
  price: number;
  duration: number;
  is_active?: boolean;
  shop_id: string;
  category_id?: string | null;
}

// ------------------------------------
// SHOP_HOURS
// ------------------------------------

export interface ShopHour extends BaseRecord {
  company_id: string;
  shop_id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
  is_closed?: boolean;
}

// ------------------------------------
// PAYMENT_METHODS & SEGMENTS
// ------------------------------------

export interface PaymentMethod extends BaseRecord {
  name: string;
  company_id: string;
  is_active: boolean;
}

export interface Segment extends BaseRecord {
  name: string;
  slug: string;
  icon?: string;
}

// ------------------------------------
// APPOINTMENTS (Alterado)
// ------------------------------------

export interface Appointment extends BaseRecord {
  start_time: string;
  end_time?: string | null;
  status: AppointmentStatus | string;
  payment_status: PaymentStatus | string;
  payment_method?: string | null;
  total_amount?: number | null;
  notes?: string;

  // ATUALIZAÇÃO: client_id opcional + campos avulsos
  client_id?: string; 
  customer_name?: string; // Novo: Nome do cliente avulso
  customer_phone?: string; // Novo: Telefone do cliente avulso
  
  barber_id: string;
  service_id: string;
  shop_id: string;

  expand?: {
    client_id?: User;
    barber_id?: User;
    service_id?: Service;
    shop_id?: Shop;
    payment_method?: PaymentMethod;
  };
}

// ------------------------------------
// SUBSCRIPTIONS
// ------------------------------------

export interface Subscription extends BaseRecord {
  company_id: string;
  plan: SubscriptionPlan;
  trial_expires_at?: string | null;
  max_shops: number;
  max_professionals: number;
  billing_cycle?: string | null;
}

// ------------------------------------
// DTOs (Alterado)
// ------------------------------------

export interface CreateAppointmentDTO {
  start_time: string;
  end_time?: string;
  
  // Opcionais para staff
  client_id?: string;
  customer_name?: string;
  customer_phone?: string;
  
  barber_id: string;
  service_id: string;
  shop_id: string;
  total_amount?: number;
  notes?: string;
  payment_method?: string | null;
}

export interface ClientAppointmentView {
  appointment: Appointment;
  service: Service;
  shop: Shop;
  barber: User;
}

export interface CreateCompanyDTO {
  legal_name: string;
  cnpj?: string;
}

export interface CreateShopDTO {
  name: string;
  slug: string;
  company_id: string;
  owner_id: string;
  phone?: string;
  address?: string;
  segment_id?: string;
}

// ------------------------------------
// TIPOS AUXILIARES FRONTEND
// ------------------------------------

export interface TimeSlot {
  time: string;
  startISO: string;
  endISO: string;
  isAvailable: boolean;
}

export interface ProfessionalOption {
  id: string;
  name: string;
  avatar?: string;
}

export interface ClientCompanyLink extends BaseRecord {
  user_id: string;
  company_id: string;
  shop_id?: string | null;
}

export interface RegisterOwnerInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterClientInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyId: string;
  shopId: string;
}

export interface ShopWithCompany {
  shop: any;
  company: any;
}