// Caminho: src/shared/schemas/shopHours.ts
import { z } from "zod";
import { BaseModelSchema } from "./_shared";

// Garante que só aceite os dias que o banco entende
export const WeekdaySchema = z.enum([
  "dom",
  "seg",
  "ter",
  "qua",
  "qui",
  "sex",
  "sab",
]);

// Validação de formato de hora HH:MM
const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

export const ShopHourSchema = BaseModelSchema.extend({
  company_id: z.string().min(1),
  shop_id: z.string().min(1),
  weekday: WeekdaySchema,
  
  // Validamos o formato para evitar erros de cálculo de data
  start_time: z.string().regex(timeRegex, "Formato inválido (use HH:MM)"),
  end_time: z.string().regex(timeRegex, "Formato inválido (use HH:MM)"),
  
  is_closed: z.boolean(),
}).passthrough(); // Permite outros campos caso o banco retorne extras

export type ShopHour = z.infer<typeof ShopHourSchema>;
export default ShopHourSchema;