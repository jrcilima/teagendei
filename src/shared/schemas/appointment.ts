import { z } from "zod";
import { BaseModelSchema } from "./_shared";

export const AppointmentSchema = BaseModelSchema.extend({
  client_id: z.string(),
  staff_id: z.string(),
  service_id: z.string(),
  shop_id: z.string(),

  start: z.string(),
  end: z.string(),

  status: z.enum(["pending", "confirmed", "canceled"]),

  notes: z.string().optional(),
  expand: z.record(z.any()).optional()
}).passthrough();

export type Appointment = z.infer<typeof AppointmentSchema>;
export default AppointmentSchema;
