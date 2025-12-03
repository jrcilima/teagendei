import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getUserFromRequest } from '../auth';
import * as queries from '../db/queries';
import type { HonoVariables } from '../types';

const companies = new Hono<{ Bindings: Env; Variables: HonoVariables }>();

// Middleware de autenticação
companies.use('*', async (c, next) => {
  const user = getUserFromRequest(c.req.raw);
  if (!user) {
    return c.json({ error: 'Não autorizado' }, 401);
  }
  c.set('userId', user.userId);
  await next();
});

const createCompanySchema = z.object({
  legal_name: z.string().min(3),
  cnpj: z.string().regex(/^\d{14}$/),
});

// Criar empresa
companies.post('/', zValidator('json', createCompanySchema), async (c) => {
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const db = c.env.DB;

  // Verificar se o CNPJ já existe
  const existing = await queries.findCompanyByCnpj(db, data.cnpj);
  if (existing) {
    return c.json({ error: 'CNPJ já cadastrado' }, 400);
  }

  // Criar empresa com trial de 14 dias
  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + 14);

  const companyId = await queries.createCompany(db, {
    legal_name: data.legal_name,
    cnpj: data.cnpj,
    plan_status: 'trial',
    plan_type: 'empresarial',
    trial_ends: trialEnds.toISOString().split('T')[0],
  });

  // Atualizar owner_id
  await queries.updateCompanyOwner(db, companyId, userId);

  // Atualizar o usuário para role 'dono' e vincular à empresa
  await db
    .prepare('UPDATE users SET role = ?, company_id = ?, updated_at = datetime("now") WHERE id = ?')
    .bind('dono', companyId, userId)
    .run();

  const company = await queries.findCompanyById(db, companyId);
  return c.json(company);
});

// Listar empresas do usuário
companies.get('/', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;

  const user = await queries.findUserById(db, userId);
  if (!user || !user.company_id) {
    return c.json([]);
  }

  const company = await queries.findCompanyById(db, user.company_id);
  return c.json(company ? [company] : []);
});

// Obter empresa específica
companies.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const userId = c.get('userId');
  const db = c.env.DB;

  const company = await queries.findCompanyById(db, id);
  if (!company) {
    return c.json({ error: 'Empresa não encontrada' }, 404);
  }

  // Verificar se o usuário tem acesso
  const user = await queries.findUserById(db, userId);
  if (user?.company_id !== id && user?.role !== 'dono') {
    return c.json({ error: 'Acesso negado' }, 403);
  }

  return c.json(company);
});

export default companies;
