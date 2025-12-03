import { Context } from 'hono';

// Extend Hono context with custom variables
export interface HonoVariables {
  userId: number;
}

export type AppContext = Context<{ Bindings: Env; Variables: HonoVariables }>;
