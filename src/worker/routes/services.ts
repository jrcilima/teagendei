import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getUserFromRequest } from '../auth';
import * as queries from '../db/queries';
import type { HonoVariables } from '../types';

const services = new Hono<{ Bindings: Env; Variables: HonoVariables }>();

// Middleware de autenticação
services.use('*', async (c, next) => {
  const user = getUserFromRequest(c.req.raw);
  if (!user) {
    return c.json({ error: 'Não autorizado' }, 401);
  }
  c.set('userId', user.userId);
  await next();
});

const createServiceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().min(5),
  category: z.string().optional(),
  shop_id: z.number(),
  buffer_time: z.number().min(0).default(0),
  required_staff: z.number().min(1).default(1),
});

// Criar serviço
services.post('/', zValidator('json', createServiceSchema), async (c) => {
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const db = c.env.DB;

  // Verificar se a shop existe e o usuário tem acesso
  const shop = await queries.findShopById(db, data.shop_id);
  if (!shop) {
    return c.json({ error: 'Unidade não encontrada' }, 404);
  }

  const user = await queries.findUserById(db, userId);
  if (user?.company_id !== shop.company_id) {
    return c.json({ error: 'Acesso negado' }, 403);
  }

  // Criar serviço
  const result = await db
    .prepare(
      `INSERT INTO services (
        name, description, price, duration, category, shop_id,
        buffer_time, required_staff, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      data.name,
      data.description || null,
      data.price,
      data.duration,
      data.category || null,
      data.shop_id,
      data.buffer_time,
      data.required_staff
    )
    .run();

  const serviceId = result.meta.last_row_id as number;
  const service = await db
    .prepare('SELECT * FROM services WHERE id = ?')
    .bind(serviceId)
    .first();

  return c.json(service);
});

// Listar serviços de uma unidade
services.get('/shop/:shopId', async (c) => {
  const shopId = parseInt(c.req.param('shopId'));
  const db = c.env.DB;

  const services = await queries.findServicesByShop(db, shopId);
  return c.json(services);
});

// Obter serviço específico
services.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const db = c.env.DB;

  const service = await db
    .prepare('SELECT * FROM services WHERE id = ?')
    .bind(id)
    .first();

  if (!service) {
    return c.json({ error: 'Serviço não encontrado' }, 404);
  }

  return c.json(service);
});

// Atualizar serviço
services.put('/:id', zValidator('json', createServiceSchema.partial()), async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const db = c.env.DB;

  const service = await db
    .prepare('SELECT * FROM services WHERE id = ?')
    .bind(id)
    .first<any>();

  if (!service) {
    return c.json({ error: 'Serviço não encontrado' }, 404);
  }

  // Verificar permissão
  const shop = await queries.findShopById(db, service.shop_id);
  const user = await queries.findUserById(db, userId);
  
  if (user?.company_id !== shop?.company_id) {
    return c.json({ error: 'Acesso negado' }, 403);
  }

  // Construir query dinâmica
  const updates: string[] = [];
  const values: any[] = [];

  if (data.name) {
    updates.push('name = ?');
    values.push(data.name);
  }
  if (data.description !== undefined) {
    updates.push('description = ?');
    values.push(data.description);
  }
  if (data.price !== undefined) {
    updates.push('price = ?');
    values.push(data.price);
  }
  if (data.duration) {
    updates.push('duration = ?');
    values.push(data.duration);
  }
  if (data.category !== undefined) {
    updates.push('category = ?');
    values.push(data.category);
  }
  if (data.buffer_time !== undefined) {
    updates.push('buffer_time = ?');
    values.push(data.buffer_time);
  }
  if (data.required_staff !== undefined) {
    updates.push('required_staff = ?');
    values.push(data.required_staff);
  }

  if (updates.length === 0) {
    return c.json(service);
  }

  updates.push('updated_at = datetime("now")');
  values.push(id);

  await db
    .prepare(`UPDATE services SET ${updates.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();

  const updatedService = await db
    .prepare('SELECT * FROM services WHERE id = ?')
    .bind(id)
    .first();

  return c.json(updatedService);
});

// Deletar (desativar) serviço
services.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const userId = c.get('userId');
  const db = c.env.DB;

  const service = await db
    .prepare('SELECT * FROM services WHERE id = ?')
    .bind(id)
    .first<any>();

  if (!service) {
    return c.json({ error: 'Serviço não encontrado' }, 404);
  }

  // Verificar permissão
  const shop = await queries.findShopById(db, service.shop_id);
  const user = await queries.findUserById(db, userId);
  
  if (user?.company_id !== shop?.company_id) {
    return c.json({ error: 'Acesso negado' }, 403);
  }

  await db
    .prepare('UPDATE services SET is_active = FALSE, updated_at = datetime("now") WHERE id = ?')
    .bind(id)
    .run();

  return c.json({ success: true });
});

export default services;
