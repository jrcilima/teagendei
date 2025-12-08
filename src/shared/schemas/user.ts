// Caminho: src/shared/schemas/user.ts
import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const UserSchema = BaseModelSchema.extend({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  
  // Campos de controle de acesso
  role: z.enum(["dono", "staff", "cliente"]),
  is_professional: z.boolean().optional().default(false),
  
  // Relacionamentos
  company_id: z.string().optional(),
  shop_id: z.string().optional(),
  
  // Campos de sistema do Auth
  emailVisibility: z.boolean().optional(),
  verified: z.boolean().optional(),
}).passthrough();

export type User = z.infer<typeof UserSchema>;
export default UserSchema;