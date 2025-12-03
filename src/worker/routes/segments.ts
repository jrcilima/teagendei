import { Hono } from 'hono';
import * as queries from '../db/queries';

const segments = new Hono<{ Bindings: Env }>();

// Listar todos os segmentos (público)
segments.get('/', async (c) => {
  const db = c.env.DB;
  const segments = await queries.getAllSegments(db);
  return c.json(segments);
});

// Obter segmento por slug (público)
segments.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const db = c.env.DB;
  
  const segment = await queries.findSegmentBySlug(db, slug);
  if (!segment) {
    return c.json({ error: 'Segmento não encontrado' }, 404);
  }
  
  return c.json(segment);
});

export default segments;
