import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import companies from "./routes/companies";
import shops from "./routes/shops";
import services from "./routes/services";
import segments from "./routes/segments";

const app = new Hono<{ Bindings: Env }>();

// CORS
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Rotas da API
app.route('/api/auth', auth);
app.route('/api/companies', companies);
app.route('/api/shops', shops);
app.route('/api/services', services);
app.route('/api/segments', segments);

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
