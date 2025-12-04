// Tipos adaptados para o PocketBase (IDs são strings, campos de data são strings ISO)


export interface BaseModel {
  id: string;
  created: string;
  updated: string;
}

export interface Company extends BaseModel {
  legal_name: string;
  cnpj: string;
  plan_status: 'trial' | 'active' | 'suspended' | 'canceled';
  plan_type: 'empresarial';
  trial_ends?: string;
  owner_id?: string;
}

export interface BaseModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export interface Category extends BaseModel {
  name: string;
  shop_id: string;
}


export interface Segment extends BaseModel {
  name: string;
  slug: string;
  icon_url?: string;
  theme_colors: any; // JSON object no PB
  terminology: any; // JSON object no PB
}

export interface Shop extends BaseModel {
  name: string;
  slug: string;
  company_id: string;
  segment_id: string;
  manager_id?: string;
  logo_url?: string;
  address?: string;
  phone?: string;
  description?: string;
  business_hours?: any; // JSON
  accepted_methods?: any; // JSON
  pix_key?: string;
  pix_key_type?: 'cpf' | 'cnpj' | 'email' | 'aleatoria';
  min_advance_time: number;
  max_advance_time: number;
  is_active: boolean;
}

export interface User extends BaseModel {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password_hash: string;
  avatar?: string;
  role: 'dono' | 'staff' | 'cliente';
  company_id?: string;
  shop_id?: string;
  is_active: boolean;
  is_professional: boolean; // NOVO CAMPO
  emailVisibility: boolean;
  verified: boolean;
}

export interface User extends BaseModel {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password_hash: string;
  avatar?: string;
  role: 'dono' | 'staff' | 'cliente';
  company_id?: string;
  shop_id?: string;
  is_active: boolean;
  emailVisibility: boolean;
  verified: boolean;
}

export interface Service extends BaseModel {
  name: string;
  description?: string;
  price: number;
  duration: number;
  category_id?: string; // ID da categoria
  is_active: boolean;
  shop_id: string;
  required_staff: number;
  buffer_time: number;
  expand?: {
    category_id?: Category; // Objeto completo da categoria
  };
}

export interface StaffService extends BaseModel {
  staff_id: string;
  service_id: string;
  is_active: boolean;
  special_price?: number;
}

export interface Appointment extends BaseModel {
  start_time: string;
  end_time: string;
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado' | 'faltou';
  payment_status: 'nao_pago' | 'pago' | 'reembolsado' | 'pendente';
  payment_method?: 'pix' | 'dinheiro' | 'cartao';
  total_amount: number;
  notes?: string;
  client_id: string;
  staff_id: string; // Mantido para retrocompatibilidade se necessário
  barber_id: string; // ADICIONADO: Campo correto conforme schema do PB
  service_id: string;
  shop_id: string;
  company_id?: string; // Pode ser opcional dependendo da regra
  reminder_sent: boolean;
  confirmation_sent: boolean;
  cancellation_reason?: string;
  expand?: {
    client_id?: User;
    staff_id?: User;
    barber_id?: User; // ADICIONADO
    service_id?: Service;
    shop_id?: Shop;
  };
}

export interface BlockedSlot extends BaseModel {
  start_time: string;
  end_time: string;
  reason: 'folga' | 'feriado' | 'manutencao' | 'evento';
  staff_id?: string;
  shop_id: string;
  recurring?: any; // JSON
}

export interface FinancialTransaction extends BaseModel {
  transaction_id: string;
  amount: number;
  type: 'pagamento' | 'reembolso' | 'taxa';
  status: 'pendente' | 'concluido' | 'falhou';
  method?: 'pix' | 'cartao' | 'dinheiro';
  pix_code?: string;
  metadata?: any; // JSON
  appointment_id?: string;
  shop_id: string;
  client_id: string;
}

export interface Notification extends BaseModel {
  type: 'whatsapp' | 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  content?: any; // JSON
  status: 'enviado' | 'falhou' | 'pendente';
  sent_at?: string;
  related_id?: string;
  channel?: string;
}