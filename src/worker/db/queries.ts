import { User, Company, Shop, Service, Appointment, Segment } from '../../shared/types';

// Helper para executar queries com tipo seguro
export async function query<T>(
  db: D1Database,
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const result = await db.prepare(sql).bind(...params).all();
  return result.results as T[];
}

export async function queryOne<T>(
  db: D1Database,
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const result = await db.prepare(sql).bind(...params).first();
  return result as T | null;
}

// Users
export async function findUserByEmail(db: D1Database, email: string): Promise<User | null> {
  return queryOne<User>(db, 'SELECT * FROM users WHERE email = ?', [email]);
}

export async function findUserById(db: D1Database, id: number): Promise<User | null> {
  return queryOne<User>(db, 'SELECT * FROM users WHERE id = ?', [id]);
}

export async function createUser(
  db: D1Database,
  data: {
    email: string;
    password_hash: string;
    name: string;
    phone?: string;
    role: 'dono' | 'staff' | 'cliente';
    company_id?: number;
    shop_id?: number;
  }
): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO users (email, password_hash, name, phone, role, company_id, shop_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      data.email,
      data.password_hash,
      data.name,
      data.phone || null,
      data.role,
      data.company_id || null,
      data.shop_id || null
    )
    .run();
  
  return result.meta.last_row_id as number;
}

// Companies
export async function findCompanyById(db: D1Database, id: number): Promise<Company | null> {
  return queryOne<Company>(db, 'SELECT * FROM companies WHERE id = ?', [id]);
}

export async function findCompanyByCnpj(db: D1Database, cnpj: string): Promise<Company | null> {
  return queryOne<Company>(db, 'SELECT * FROM companies WHERE cnpj = ?', [cnpj]);
}

export async function createCompany(
  db: D1Database,
  data: {
    legal_name: string;
    cnpj: string;
    plan_status: string;
    plan_type: string;
    trial_ends?: string;
  }
): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO companies (legal_name, cnpj, plan_status, plan_type, trial_ends, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      data.legal_name,
      data.cnpj,
      data.plan_status,
      data.plan_type,
      data.trial_ends || null
    )
    .run();
  
  return result.meta.last_row_id as number;
}

export async function updateCompanyOwner(
  db: D1Database,
  companyId: number,
  ownerId: number
): Promise<void> {
  await db
    .prepare('UPDATE companies SET owner_id = ?, updated_at = datetime("now") WHERE id = ?')
    .bind(ownerId, companyId)
    .run();
}

// Shops
export async function findShopsByCompany(db: D1Database, companyId: number): Promise<Shop[]> {
  return query<Shop>(db, 'SELECT * FROM shops WHERE company_id = ? AND is_active = TRUE', [companyId]);
}

export async function findShopById(db: D1Database, id: number): Promise<Shop | null> {
  return queryOne<Shop>(db, 'SELECT * FROM shops WHERE id = ?', [id]);
}

export async function findShopBySlug(db: D1Database, slug: string): Promise<Shop | null> {
  return queryOne<Shop>(db, 'SELECT * FROM shops WHERE slug = ?', [slug]);
}

// Services
export async function findServicesByShop(db: D1Database, shopId: number): Promise<Service[]> {
  return query<Service>(
    db,
    'SELECT * FROM services WHERE shop_id = ? AND is_active = TRUE ORDER BY name',
    [shopId]
  );
}

// Appointments
export async function findAppointmentsByClient(db: D1Database, clientId: number): Promise<Appointment[]> {
  return query<Appointment>(
    db,
    `SELECT * FROM appointments 
     WHERE client_id = ? 
     ORDER BY start_time DESC 
     LIMIT 50`,
    [clientId]
  );
}

export async function findAppointmentsByShop(
  db: D1Database,
  shopId: number,
  startDate: string,
  endDate: string
): Promise<Appointment[]> {
  return query<Appointment>(
    db,
    `SELECT * FROM appointments 
     WHERE shop_id = ? AND start_time >= ? AND start_time < ?
     ORDER BY start_time`,
    [shopId, startDate, endDate]
  );
}

// Segments
export async function getAllSegments(db: D1Database): Promise<Segment[]> {
  return query<Segment>(db, 'SELECT * FROM segments ORDER BY name');
}

export async function findSegmentBySlug(db: D1Database, slug: string): Promise<Segment | null> {
  return queryOne<Segment>(db, 'SELECT * FROM segments WHERE slug = ?', [slug]);
}
