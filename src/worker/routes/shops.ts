import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getUserFromRequest } from '../auth';
import * as queries from '../db/queries';
import type { HonoVariables } from '../types';

const shops = new Hono<{ Bindings: Env; Variables: HonoVariables }>();

// Middleware de autenticação
shops.use('*', async (c, next) => {
  const user = getUserFromRequest(c.req.raw);
  if (!user) {
    return c.json({ error: 'Não autorizado' }, 401);
  }
  c.set('userId', user.userId);
  await next();
});

const createShopSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  segment_id: z.number(),
  address: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  business_hours: z.string().optional(),
  pix_key: z.string().optional(),
  pix_key_type: z.enum(['cpf', 'cnpj', 'email', 'aleatoria']).optional(),
});

// Criar unidade
shops.post('/', zValidator('json', createShopSchema), async (c) => {
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const db = c.env.DB;

  const user = await queries.findUserById(db, userId);
  if (!user || !user.company_id) {
    return c.json({ error: 'Usuário sem empresa vinculada' }, 400);
  }

  // Verificar se o slug já existe
  const existing = await queries.findShopBySlug(db, data.slug);
  if (existing) {
    return c.json({ error: 'Slug já está em uso' }, 400);
  }

  // Criar unidade
  const result = await db
    .prepare(
      `INSERT INTO shops (
        name, slug, company_id, segment_id, address, phone, description,
        business_hours, pix_key, pix_key_type, manager_id,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      data.name,
      data.slug,
      user.company_id,
      data.segment_id,
      data.address || null,
      data.phone || null,
      data.description || null,
      data.business_hours || null,
      data.pix_key || null,
      data.pix_key_type || null,
      userId
    )
    .run();

  const shopId = result.meta.last_row_id as number;
  const shop = await queries.findShopById(db, shopId);
  return c.json(shop);
});

// Listar unidades da empresa
shops.get('/', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;

  const user = await queries.findUserById(db, userId);
  if (!user || !user.company_id) {
    return c.json([]);
  }

  const shops = await queries.findShopsByCompany(db, user.company_id);
  return c.json(shops);
});

// Obter unidade específica
shops.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const db = c.env.DB;

  const shop = await queries.findShopById(db, id);
  if (!shop) {
    return c.json({ error: 'Unidade não encontrada' }, 404);
  }

  return c.json(shop);
});

// Atualizar unidade
shops.put('/:id', zValidator('json', createShopSchema.partial()), async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const db = c.env.DB;

  const shop = await queries.findShopById(db, id);
  if (!shop) {
    return c.json({ error: 'Unidade não encontrada' }, 404);
  }

  // Verificar permissão
  const user = await queries.findUserById(db, userId);
  if (user?.company_id !== shop.company_id && user?.role !== 'dono') {
    return c.json({ error: 'Acesso negado' }, 403);
  }

  // Construir query dinâmica
  const updates: string[] = [];
  const values: any[] = [];

  if (data.name) {
    updates.push('name = ?');
    values.push(data.name);
  }
  if (data.address) {
    updates.push('address = ?');
    values.push(data.address);
  }
  if (data.phone) {
    updates.push('phone = ?');
    values.push(data.phone);
  }
  if (data.description !== undefined) {
    updates.push('description = ?');
    values.push(data.description);
  }
  if (data.business_hours) {
    updates.push('business_hours = ?');
    values.push(data.business_hours);
  }
  if (data.pix_key !== undefined) {
    updates.push('pix_key = ?');
    values.push(data.pix_key);
  }
  if (data.pix_key_type) {
    updates.push('pix_key_type = ?');
    values.push(data.pix_key_type);
  }

  if (updates.length === 0) {
    return c.json(shop);
  }

  updates.push('updated_at = datetime("now")');
  values.push(id);

  await db
    .prepare(`UPDATE shops SET ${updates.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();

  const updatedShop = await queries.findShopById(db, id);
  return c.json(updatedShop);
});

export default shops;
