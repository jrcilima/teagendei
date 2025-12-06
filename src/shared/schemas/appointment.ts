import { z } from "zod";

export const AppointmentStatus = z.enum([
  "AGENDADO",
  "CONFIRMADO",
  "CANCELADO",
  "CONCLUIDO",
]);

export const AppointmentCreateSchema = z.object({
  client_id: z.string().min(1),
  shop_id: z.string().min(1),
  service_id: z.string().min(1),
  start_time: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "start_time must be ISO string"),
  duration: z.number().int().positive(),
  total_amount: z.number().nonnegative(),
  status: AppointmentStatus.default("AGENDADO"),
});

export const AppointmentResponseSchema = AppointmentCreateSchema.extend({
  id: z.string(),
  created: z.string(),
  updated: z.string().optional(),
}).passthrough();
