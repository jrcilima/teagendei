// Caminho: src/shared/schemas/_shared.ts
import { z } from "zod";

export const BaseModelSchema = z.object({
  id: z.string(),
  created: z.string().optional(), // PocketBase retorna string ISO
  updated: z.string().optional(),
  collectionId: z.string().optional(),
  collectionName: z.string().optional(),
});