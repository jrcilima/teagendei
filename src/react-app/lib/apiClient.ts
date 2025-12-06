// src/react-app/lib/apiClient.ts
import { z } from "zod";
import { getPb } from "./pocketbaseFactory";
import type PocketBase from "pocketbase";

/**
 * Configurações padrão
 */
const DEFAULT_TIMEOUT_MS = 12000;
const DEFAULT_RETRIES = 2;

type ListOptions = {
  page?: number;
  perPage?: number;
  filter?: string;
  expand?: string;
  sort?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
};

/**
 * Timeout simples (sem signal)
 */
function withTimeout<T>(promise: Promise<T>, ms = DEFAULT_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then((res) => {
        clearTimeout(id);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(id);
        reject(err);
      });
  });
}

/**
 * Retry exponencial simples
 */
async function retry<T>(fn: () => Promise<T>, retries = DEFAULT_RETRIES): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, 200 * 2 ** attempt));
      attempt++;
    }
  }
}

/**
 * zod parse opcional
 */
function parseWithSchema<T>(schema: z.Schema<T> | undefined, data: unknown): T {
  return schema ? schema.parse(data) : (data as T);
}

export class ApiClient {
  pb: PocketBase;

  constructor(pbInstance?: PocketBase) {
    this.pb = pbInstance ?? getPb();
  }

  /**
   * getById
   */
  async getById<T>(
    collection: string,
    id: string,
    schema?: z.Schema<T>,
    expand?: string
  ): Promise<T> {
    return retry(async () => {
      const raw = await withTimeout(
        this.pb.collection(collection).getOne(id, { expand })
      );
      return parseWithSchema(schema, raw);
    });
  }

  /**
   * create
   */
  async create<TCreate, TResp>(
    collection: string,
    payload: unknown,
    createSchema?: z.Schema<TCreate>,
    responseSchema?: z.Schema<TResp>
  ): Promise<TResp> {
    const validated = createSchema ? createSchema.parse(payload) : (payload as TCreate);

    return retry(async () => {
      const raw = await withTimeout(
        this.pb.collection(collection).create(validated as any)
      );
      return parseWithSchema(responseSchema, raw);
    });
  }

  /**
   * update
   */
  async update<TUpdate, TResp>(
    collection: string,
    id: string,
    payload: unknown,
    updateSchema?: z.Schema<TUpdate>,
    responseSchema?: z.Schema<TResp>
  ): Promise<TResp> {
    const validated = updateSchema ? updateSchema.parse(payload) : (payload as TUpdate);

    return retry(async () => {
      const raw = await withTimeout(
        this.pb.collection(collection).update(id, validated as any)
      );
      return parseWithSchema(responseSchema, raw);
    });
  }

  /**
   * list (paginado)
   */
  async list<T>(
    collection: string,
    opts: ListOptions = {},
    itemSchema?: z.Schema<T>
  ): Promise<PaginatedResult<T>> {
    const page = opts.page ?? 1;
    const perPage = Math.min(opts.perPage ?? 25, 200);

    return retry(async () => {
      const raw = await withTimeout(
        this.pb.collection(collection).getList(page, perPage, {
          filter: opts.filter,
          expand: opts.expand,
          sort: opts.sort,
        })
      );

      const items = raw.items ?? [];
      const parsedItems = itemSchema
        ? items.map((i) => itemSchema.parse(i))
        : (items as T[]);

      return {
        items: parsedItems,
        totalItems: raw.totalItems ?? parsedItems.length,
        page: raw.page ?? page,
        perPage: raw.perPage ?? perPage,
        totalPages: raw.totalPages ?? 1,
      };
    });
  }

  /**
   * delete
   */
  async delete(collection: string, id: string) {
    return retry(async () => {
      return withTimeout(this.pb.collection(collection).delete(id));
    });
  }
}

export default ApiClient;

