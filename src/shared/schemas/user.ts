import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const UserRoleSchema = z.enum(["dono", "staff", "cliente"]);

export const UserSchema = BaseModelSchema.extend({
  email: z.string().email(),
  emailVisibility: z.boolean(),   // CORRIGIDO
  verified: z.boolean(),          // CORRIGIDO
  name: z.string().min(1),
  avatar: z.string().url().optional(),
  role: UserRoleSchema,
  phone: z.string().optional(),
  is_professional: z.boolean(),   // CORRIGIDO
  company_id: z.string().optional(),
  shop_id: z.string().optional(),
  expand: z.record(z.any()).optional()
}).passthrough();

export type User = z.infer<typeof UserSchema>;
export default UserSchema;
