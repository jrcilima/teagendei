// Tipos compartilhados entre frontend e backend

export interface Company {
  id: number;
  legal_name: string;
  cnpj: string;
  plan_status: 'trial' | 'active' | 'suspended' | 'canceled';
  plan_type: 'empresarial';
  trial_ends?: string;
  owner_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Segment {
  id: number;
  name: string;
  slug: string;
  icon_url?: string;
  theme_colors: string; // JSON
  terminology: string; // JSON
  created_at: string;
  updated_at: string;
}

export interface Shop {
  id: number;
  name: string;
  slug: string;
  company_id: number;
  segment_id: number;
  manager_id?: number;
  logo_url?: string;
  address?: string;
  phone?: string;
  description?: string;
  business_hours?: string; // JSON
  accepted_methods?: string; // JSON
  pix_key?: string;
  pix_key_type?: 'cpf' | 'cnpj' | 'email' | 'aleatoria';
  min_advance_time: number;
  max_advance_time: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  role: 'dono' | 'staff' | 'cliente';
  company_id?: number;
  shop_id?: number;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category?: string;
  is_active: boolean;
  shop_id: number;
  required_staff: number;
  buffer_time: number;
  created_at: string;
  updated_at: string;
}

export interface StaffService {
  id: number;
  staff_id: number;
  service_id: number;
  is_active: boolean;
  special_price?: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  start_time: string;
  end_time: string;
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado' | 'faltou';
  payment_status: 'nao_pago' | 'pago' | 'reembolsado' | 'pendente';
  payment_method?: 'pix' | 'dinheiro' | 'cartao';
  total_amount: number;
  notes?: string;
  client_id: number;
  staff_id: number;
  service_id: number;
  shop_id: number;
  company_id: number;
  reminder_sent: boolean;
  confirmation_sent: boolean;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface BlockedSlot {
  id: number;
  start_time: string;
  end_time: string;
  reason: 'folga' | 'feriado' | 'manutencao' | 'evento';
  staff_id?: number;
  shop_id: number;
  recurring?: string; // JSON
  created_at: string;
  updated_at: string;
}

export interface FinancialTransaction {
  id: number;
  transaction_id: string;
  amount: number;
  type: 'pagamento' | 'reembolso' | 'taxa';
  status: 'pendente' | 'concluido' | 'falhou';
  method?: 'pix' | 'cartao' | 'dinheiro';
  pix_code?: string;
  metadata?: string; // JSON
  appointment_id?: number;
  shop_id: number;
  client_id: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  type: 'whatsapp' | 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  content?: string; // JSON
  status: 'enviado' | 'falhou' | 'pendente';
  sent_at?: string;
  related_id?: string;
  channel?: string;
  created_at: string;
  updated_at: string;
}

// Tipos para temas
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Terminology {
  professional: string;
  service: string;
  client: string;
}

// Tipos para autenticação
export interface AuthUser extends User {
  token?: string;
}

// Tipos para horários de funcionamento
export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    is_open: boolean;
  };
}
