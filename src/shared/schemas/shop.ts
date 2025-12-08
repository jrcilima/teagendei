// Caminho: src/shared/schemas/shop.ts
import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const ShopSchema = BaseModelSchema.extend({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3),
  is_active: z.boolean().optional().default(true),
  
  address: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  
  // Configurações de Agendamento
  min_advance_time: z.number().int().nonnegative().optional().default(30),
  max_advance_time: z.number().int().nonnegative().optional().default(30),
  
  // Dados Financeiros
  pix_key: z.string().optional(),
  pix_key_type: z.enum(["cpf", "cnpj", "email", "telefone", "aleatoria"]).optional(),
  accepted_payment_methods: z.array(z.string()).optional(), // Array de IDs
  
  // Relacionamentos
  company_id: z.string(),
  segment_id: z.string().optional(),
  owner_id: z.string(),
  
  // Legado (Mantido para não quebrar leituras antigas se houver)
  business_hours: z.any().optional(),
}).passthrough();

export type Shop = z.infer<typeof ShopSchema>;
export default ShopSchema;