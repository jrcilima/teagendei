// Tipos adaptados para o PocketBase e nova estrutura v2

export interface BaseModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export interface PaymentMethod extends BaseModel {
  name: string;
  is_active: boolean;
  company_id: string;
}

export interface Category extends BaseModel {
  name: string;
  shop_id: string;
}

export interface Company extends BaseModel {
  legal_name: string;
  cnpj: string;
  plan_status: 'trial' | 'active' | 'suspended' | 'canceled';
  plan_type: 'empresarial';
  trial_ends?: string;
  owner_id?: string;
}

export interface Segment extends BaseModel {
  name: string;
  slug: string;
  icon_url?: string;
  theme_colors: any;
  terminology: any;
}

export interface Shop extends BaseModel {
  name: string;
  slug: string;
  company_id: string;
  segment_id: string;
  manager_id?: string;
  owner_id?: string;
  logo_url?: string;
  address?: string;
  phone?: string;
  description?: string;
  business_hours?: any;
  accepted_payment_methods?: string[]; 
  pix_key?: string;
  pix_key_type?: 'cpf' | 'cnpj' | 'email' | 'aleatoria' | 'telefone';
  min_advance_time: number;
  max_advance_time: number;
  is_active: boolean;
  expand?: {
    accepted_payment_methods?: PaymentMethod[];
  };
}

export interface User extends BaseModel {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password_hash: string;
  avatar?: string;
  // ALTERADO: 'barbeiro' -> 'staff'
  role: 'dono' | 'staff' | 'cliente';
  company_id?: string;
  shop_id?: string;
  is_active: boolean;
  is_professional: boolean;
  emailVisibility: boolean;
  verified: boolean;
}

export interface Service extends BaseModel {
  name: string;
  description?: string;
  price: number;
  duration: number;
  category_id?: string;
  is_active: boolean;
  shop_id: string;
  required_staff: number;
  buffer_time: number;
  expand?: {
    category_id?: Category;
  };
}

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

export interface Appointment extends BaseModel {
  start_time: string;
  end_time: string;
  status: AppointmentStatus | number; 
  payment_status: PaymentStatus | number;
  payment_method?: string; 
  total_amount: number;
  notes?: string;
  client_id: string;
  // Mantivemos o nome da coluna do banco 'barber_id' para evitar migração complexa agora
  barber_id: string;
  service_id: string;
  shop_id: string;
  reminder_sent: boolean;
  confirmation_sent: boolean;
  cancellation_reason?: string;
  expand?: {
    client_id?: User;
    barber_id?: User; // O objeto expandido será um User com role 'staff'
    service_id?: Service;
    shop_id?: Shop;
    payment_method?: PaymentMethod;
  };
}

export interface StaffService extends BaseModel {
  staff_id: string;
  service_id: string;
  is_active: boolean;
  special_price?: number;
}

export interface BlockedSlot extends BaseModel {
  start_time: string;
  end_time: string;
  reason: 'folga' | 'feriado' | 'manutencao' | 'evento';
  staff_id?: string;
  shop_id: string;
  recurring?: any;
}

export interface FinancialTransaction extends BaseModel {
  transaction_id: string;
  amount: number;
  type: 'pagamento' | 'reembolso' | 'taxa';
  status: 'pendente' | 'concluido' | 'falhou';
  method?: 'pix' | 'cartao' | 'dinheiro';
  pix_code?: string;
  metadata?: any;
  appointment_id?: string;
  shop_id: string;
  client_id: string;
}

export interface Notification extends BaseModel {
  type: 'whatsapp' | 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  content?: any;
  status: 'enviado' | 'falhou' | 'pendente';
  sent_at?: string;
  related_id?: string;
  channel?: string;
}