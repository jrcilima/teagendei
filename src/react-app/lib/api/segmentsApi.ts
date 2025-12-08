// Caminho: src/react-app/lib/api/segmentsApi.ts
import ApiClient from './apiClient';
import type { Segment } from '../../../shared/types';

const COLLECTION = 'segments';

export function segmentsApi(api: ApiClient) {
  return {
    async list() {
      // Retorna a lista completa ordenada por nome
      return api
        .list<Segment>(COLLECTION, {
          sort: 'name',
          perPage: 100
        })
        .then((res) => res.items);
    },

    async getBySlug(slug: string) {
      const result = await api.list<Segment>(COLLECTION, {
        filter: `slug="${slug}"`,
        perPage: 1
      });

      if (result.items.length === 0) {
        throw new Error('Segmento não encontrado');
      }
      return result.items[0];
    }
  };
}

export type SegmentsApi = ReturnType<typeof segmentsApi>;
