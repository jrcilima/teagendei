import { z } from 'zod';
import { BaseModelSchema } from './_shared';

export const WeekdaySchema = z.enum([
  'dom',
  'seg',
  'ter',
  'qua',
  'qui',
  'sex',
  'sab'
]);

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

export const ShopHourSchema = BaseModelSchema.extend({
  company_id: z.string().min(1),
  shop_id: z.string().min(1),
  weekday: WeekdaySchema,

  start_time: z
    .string()
    .regex(timeRegex, 'start_time deve estar no formato HH:MM'),

  end_time: z.string().regex(timeRegex, 'end_time deve estar no formato HH:MM'),

  // obrigatório
  is_closed: z.boolean()
}).superRefine((data, _) => {
  if (data.is_closed === undefined) {
    (data as any).is_closed = false;
  }
});

export type ShopHour = z.infer<typeof ShopHourSchema>;
export default ShopHourSchema;
