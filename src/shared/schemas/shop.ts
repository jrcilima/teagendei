import { z } from 'zod';
import { BaseModelSchema } from './_shared';

export const BusinessHoursSchema = z.any().optional();

export const ShopSchema = BaseModelSchema.extend({
  name: z.string().min(1),
  slug: z.string().min(1),
  is_active: z.boolean().optional().default(true),
  address: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  business_hours: BusinessHoursSchema,
  min_advance_time: z.number().int().nonnegative().optional(),
  max_advance_time: z.number().int().nonnegative().optional(),
  pix_key: z.string().optional(),
  pix_key_type: z
    .enum(['cpf', 'cnpj', 'email', 'telefone', 'aleatoria'])
    .optional(),
  company_id: z.string().min(1),
  segment_id: z.string().optional(),
  owner_id: z.string().min(1),
  accepted_payment_methods: z.array(z.string()).optional(),
  expand: z.record(z.any()).optional()
}).passthrough();

export type Shop = z.infer<typeof ShopSchema>;
export default ShopSchema;
