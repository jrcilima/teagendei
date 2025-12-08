// Caminho: src/shared/schemas/appointment.ts
import { z } from "zod";
import { BaseModelSchema } from "./_shared";
import { UserSchema } from "./user";
import { ServiceSchema } from "./service";
import { ShopSchema } from "./shop";

// Enums alinhados com o backend (strings)
export const AppointmentStatusEnum = z.enum(["0", "1", "2", "3", "4", "9"]);
// 0=Cancelado, 1=Agendado, 2=Confirmado, 4=Concluído

export const PaymentStatusEnum = z.enum(["1", "2", "3"]);
// 1=Não Pago, 2=Pago, 3=Reembolsado

export const AppointmentSchema = BaseModelSchema.extend({
  start_time: z.string(), // ISO Date
  end_time: z.string(),   // ISO Date
  
  status: AppointmentStatusEnum,
  payment_status: PaymentStatusEnum,
  
  total_amount: z.number().optional(),
  notes: z.string().optional(),
  
  // Relacionamentos (IDs)
  client_id: z.string(),
  barber_id: z.string(),
  service_id: z.string(),
  shop_id: z.string(),
  payment_method: z.string().optional(),
  
  // Expansão para tipagem correta no front
  expand: z.object({
    client_id: UserSchema.optional(),
    barber_id: UserSchema.optional(),
    service_id: ServiceSchema.optional(),
    shop_id: ShopSchema.optional(),
    payment_method: z.object({ name: z.string() }).optional(),
  }).optional()
}).passthrough();

export type Appointment = z.infer<typeof AppointmentSchema>;
export default AppointmentSchema;