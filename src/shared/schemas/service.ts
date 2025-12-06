import { z } from 'zod';
import { BaseModelSchema } from './_shared2';

export const ServiceSchema = BaseModelSchema.extend({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  duration: z.number().int().positive(), // minutos
  is_active: z.boolean().optional().default(true),
  shop_id: z.string().min(1),
  category_id: z.string().optional(),
  expand: z.record(z.any()).optional()
}).passthrough();

export type Service = z.infer<typeof ServiceSchema>;
export default ServiceSchema;
