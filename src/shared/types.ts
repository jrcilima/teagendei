// src/shared/types.ts

// ------------------------------------
// ENUMS / TIPOS BÁSICOS
// ------------------------------------

// Roles da tabela users
export type UserRole = 'dono' | 'cliente' | 'staff';

// Status do appointment (PocketBase usa "0"…"9")
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

// Payment_status (1,2,3)
export enum PaymentStatus {
  A_PAGAR = '1',
  PAGO = '2',
  PENDENTE = '3',
}

// Tipos de chave PIX
export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';

// Dias da semana de shop_hours
export type Weekday = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

// Status do plano da empresa (campo antigo que ainda existe no schema)
export type CompanyPlanStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

// Planos do SaaS (companies + subscriptions.plan)
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
// USERS (auth collection)
// ------------------------------------

export interface User extends BaseRecord {
  email: string;
  name?: string;
  avatar?: string; // file path PB
  role: UserRole;
  phone?: string;

  company_id?: string | null; // relation companies
  shop_id?: string | null; // relation shops

  is_professional?: boolean;
}

// ------------------------------------
// COMPANIES
// ------------------------------------

export interface Company extends BaseRecord {
  legal_name: string;
  cnpj?: string;
  plan_status: CompanyPlanStatus;

  owner_id: string; // relation user

  // 🔹 CAMPO NOVO: plano atual direto na empresa (select trial/basic/pro)
  plan?: SubscriptionPlan | null;

  // 🔹 Campo opcional de assinatura ativa (relation subscriptions)
  active_subscription_id?: string | null;

  // 🔹 Helpers de billing / limites, espelhando o que você colocou no schema.
  trial_expires_at?: string | null; // ISO date
  max_shops?: number | null;
  max_professionals?: number | null;
  billing_cycle?: string | null; // ISO date (início do ciclo atual, por ex.)
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
// CATEGORIES
// ------------------------------------

export interface Category extends BaseRecord {
  name: string;
  shop_id: string;
}

// ------------------------------------
// SERVICES
// ------------------------------------

export interface Service extends BaseRecord {
  name: string;
  description?: string;

  price: number; // obrigatório
  duration: number; // minutos, obrigatório
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

  weekday: Weekday; // dom..sab

  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"

  is_closed?: boolean;
}

// ------------------------------------
// PAYMENT_METHODS
// ------------------------------------

export interface PaymentMethod extends BaseRecord {
  name: string;
  company_id: string;
  is_active: boolean;
}

// ------------------------------------
// SEGMENTS
// ------------------------------------

export interface Segment extends BaseRecord {
  name: string;
  slug: string;
  icon?: string; // file
}

// ------------------------------------
// APPOINTMENTS
// ------------------------------------

export interface Appointment extends BaseRecord {
  start_time: string; // ISO
  end_time?: string | null; // ISO

  status: AppointmentStatus | string;
  payment_status: PaymentStatus | string;

  payment_method?: string | null; // relation payment_methods
  total_amount?: number | null;
  notes?: string;

  client_id: string; // relation users
  barber_id: string; // relation users
  service_id: string; // relation services
  shop_id: string; // relation shops

  // --- CORREÇÃO IMPORTANTE ---
  // Adicionamos 'expand' para o TypeScript reconhecer os objetos expandidos
  expand?: {
    client_id?: User;
    barber_id?: User;
    service_id?: Service;
    shop_id?: Shop;
    payment_method?: PaymentMethod;
  };
}

// ------------------------------------
// SUBSCRIPTIONS (nova tabela)
// ------------------------------------

export interface Subscription extends BaseRecord {
  company_id: string; // relation companies
  plan: SubscriptionPlan;
  trial_expires_at?: string | null; // ISO
  max_shops: number;
  max_professionals: number;
  billing_cycle?: string | null; // ISO (início do ciclo, vencimento etc.)
}

// ------------------------------------
// DTOs
// ------------------------------------

export interface CreateAppointmentDTO {
  start_time: string; // ISO
  end_time?: string;
  client_id: string;
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
  time: string; // "HH:MM" local
  startISO: string; // UTC ISO
  endISO: string; // UTC ISO
  isAvailable: boolean;
}

export interface ProfessionalOption {
  id: string;
  name: string;
  avatar?: string;
}

// Vinculo cliente <-> empresa
export interface ClientCompanyLink extends BaseRecord {
  user_id: string;      // relation → users
  company_id: string;   // relation → companies
  shop_id?: string | null; // opcional
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