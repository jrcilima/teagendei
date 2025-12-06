import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../lib/apiClient';
import { servicesApi } from '../lib/api/servicesApi';
import { useTenant } from '../contexts/TenantContext';
import type { Service } from '../../shared/schemas/service';

const api = new ApiClient();
const serviceService = servicesApi(api);

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shop } = useTenant();

  const isEdit = Boolean(id);

  const [data, setData] = useState<Partial<Service>>({
    name: '',
    price: 0,
    duration: 30,
    description: '',
    is_active: true
  });

  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!isEdit || !id) {
      setLoading(false);
      return;
    }

    try {
      // 🔴 ANTES: serviceService.getById(id)
      // ✅ AGORA: findById (que é o que existe no servicesApi.ts)
      const s = await serviceService.findById(id);
      setData(s);
    } catch (err) {
      console.error('Erro ao carregar serviço:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop?.id) return;

    try {
      if (isEdit && id) {
        await serviceService.update(id, { ...data });
      } else {
        await serviceService.create({
          ...data,
          shop_id: shop.id
        });
      }

      navigate('/services');
    } catch (err) {
      console.error('Erro ao salvar serviço:', err);
      alert('Erro ao salvar.');
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? 'Editar Serviço' : 'Novo Serviço'}
      </h1>

      <form onSubmit={save} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do serviço"
          className="border p-2 rounded w-full"
          value={data.name ?? ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Preço"
          className="border p-2 rounded w-full"
          value={data.price ?? 0}
          onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Duração (min)"
          className="border p-2 rounded w-full"
          value={data.duration ?? 30}
          onChange={(e) =>
            setData({ ...data, duration: Number(e.target.value) })
          }
        />

        <textarea
          placeholder="Descrição"
          className="border p-2 rounded w-full"
          value={data.description ?? ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={data.is_active ?? true}
            onChange={(e) => setData({ ...data, is_active: e.target.checked })}
          />
          Ativo
        </label>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {isEdit ? 'Salvar Alterações' : 'Criar Serviço'}
        </button>
      </form>
    </div>
  );
}
