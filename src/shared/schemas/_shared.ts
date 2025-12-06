import { z } from 'zod';

export const BaseModelSchema = z.object({
  id: z.string(),
  created: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), 'created must be ISO date'),
  updated: z.string().optional(),
  collectionId: z.string().optional(),
  collectionName: z.string().optional()
});
