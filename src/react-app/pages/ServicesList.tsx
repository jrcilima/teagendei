import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiClient from '../lib/apiClient';
import { servicesApi } from '../lib/api/servicesApi';
import { useTenant } from '../contexts/TenantContext';
import type { Service } from '../../shared/schemas/service';

const api = new ApiClient();
const serviceService = servicesApi(api);

export default function ServicesList() {
  const { shop } = useTenant();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!shop?.id) return;

    setLoading(true);

    try {
      const resp = await serviceService.list({
        filter: `shop_id = "${shop.id}"`,
        sort: 'name'
      });

      setServices(resp.items);
    } catch (err) {
      console.error('Erro ao carregar serviços:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [shop?.id]);

  const remove = async (id: string) => {
    if (!confirm('Deseja realmente excluir este serviço?')) return;

    try {
      await serviceService.remove(id);
      load();
    } catch (err) {
      console.error('Erro ao excluir serviço:', err);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando serviços...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Serviços</h1>
        <Link
          to="/services/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Novo Serviço
        </Link>
      </div>

      {services.length === 0 && (
        <div className="text-gray-500">Nenhum serviço cadastrado.</div>
      )}

      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="border p-4 rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">
                R$ {s.price} — {s.duration} min
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/services/${s.id}`}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Editar
              </Link>

              <button
                onClick={() => remove(s.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
