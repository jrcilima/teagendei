import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const ServiceSchema = BaseModelSchema.extend({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  duration: z.number().int().positive(),

  is_active: z.boolean(), // CORRIGIDO

  shop_id: z.string(),
  category_id: z.string().optional(),
  expand: z.record(z.any()).optional()
}).passthrough();

export type Service = z.infer<typeof ServiceSchema>;
export default ServiceSchema;
