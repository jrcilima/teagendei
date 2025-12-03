import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { hashPassword, verifyPassword, generateToken } from '../auth';
import * as queries from '../db/queries';

const auth = new Hono<{ Bindings: { DB: any } }>();

// Schema de validação
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum(['dono', 'staff', 'cliente']),
  company_id: z.number().optional(),
  shop_id: z.number().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Registro de usuário
auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const data = c.req.valid('json');
  const db = c.env.DB;

  // Verificar se o email já existe
  const existingUser = await queries.findUserByEmail(db, data.email);
  if (existingUser) {
    return c.json({ error: 'Email já cadastrado' }, 400);
  }

  // Hash da senha
  const password_hash = await hashPassword(data.password);

  // Criar usuário
  const userId = await queries.createUser(db, {
    email: data.email,
    password_hash,
    name: data.name,
    phone: data.phone,
    role: data.role,
    company_id: data.company_id,
    shop_id: data.shop_id,
  });

  // Gerar token
  const token = generateToken(userId);

  // Buscar usuário criado
  const user = await queries.findUserById(db, userId);

  return c.json({
    user: {
      ...user,
      password_hash: undefined,
    },
    token,
  });
});

// Login
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const db = c.env.DB;

  // Buscar usuário
  const user = await queries.findUserByEmail(db, email);
  if (!user) {
    return c.json({ error: 'Email ou senha inválidos' }, 401);
  }

  // Verificar senha
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    return c.json({ error: 'Email ou senha inválidos' }, 401);
  }

  // Verificar se está ativo
  if (!user.is_active) {
    return c.json({ error: 'Conta desativada' }, 403);
  }

  // Gerar token
  const token = generateToken(user.id);

  return c.json({
    user: {
      ...user,
      password_hash: undefined,
    },
    token,
  });
});

// Obter usuário atual
auth.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Token não fornecido' }, 401);
  }

  const token = authHeader.substring(7);
  const payload = JSON.parse(atob(token));
  
  if (payload.exp < Date.now()) {
    return c.json({ error: 'Token expirado' }, 401);
  }

  const user = await queries.findUserById(c.env.DB, payload.userId);
  if (!user) {
    return c.json({ error: 'Usuário não encontrado' }, 404);
  }

  return c.json({
    ...user,
    password_hash: undefined,
  });
});

export default auth;
function atob(token: string): string {
  throw new Error('Function not implemented.');
}

