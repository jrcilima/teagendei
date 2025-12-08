// Caminho: src/shared/schemas/service.ts
import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const ServiceSchema = BaseModelSchema.extend({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  
  price: z.number().nonnegative("Preço não pode ser negativo"),
  duration: z.number().int().positive("Duração deve ser positiva"), // Em minutos
  
  is_active: z.boolean().optional().default(true),
  
  // Relacionamentos
  shop_id: z.string(),
  category_id: z.string().optional(),
  
  // Expansão (quando usamos api.list com expand)
  expand: z.object({
    category_id: z.object({ name: z.string() }).optional()
  }).optional()
}).passthrough();

export type Service = z.infer<typeof ServiceSchema>;
export default ServiceSchema;