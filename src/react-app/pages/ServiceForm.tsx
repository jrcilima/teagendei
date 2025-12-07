import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ApiClient from "../lib/apiClient";
import { servicesApi } from "../lib/api/servicesApi";
import { useTenant } from "../contexts/TenantContext";

import type { Service } from "../../shared/schemas/service";

const api = new ApiClient();
const serviceService = servicesApi(api);

export default function ServiceForm() {
  const { shop } = useTenant();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState<Partial<Service>>({
    name: "",
    price: 0,
    duration: 0,
    is_active: true,
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!isEdit || !id) {
      setLoading(false);
      return;
    }

    try {
      const data = await serviceService.findById(id);
      setForm(data);
    } catch (err) {
      console.error("Erro ao carregar serviço:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shop?.id) {
      alert("Erro: nenhuma barbearia ativa.");
      return;
    }

    try {
      if (isEdit && id) {
        await serviceService.update(id, form);
      } else {
        await serviceService.create({
          ...form,
          shop_id: shop.id,
        });
      }

      navigate("/services");
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      alert("Falha ao salvar.");
    }
  };

  const updateField = (field: keyof Service, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Serviço" : "Novo Serviço"}
      </h1>

      <form onSubmit={save} className="space-y-4">

        <div>
          <label className="block text-sm font-semibold">Nome</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={form.name ?? ""}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Descrição</label>
          <textarea
            className="border p-2 rounded w-full"
            value={form.description ?? ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Preço (R$)</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.price ?? 0}
            onChange={(e) => updateField("price", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Duração (minutos)</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.duration ?? 0}
            onChange={(e) => updateField("duration", Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_active ?? true}
            onChange={(e) => updateField("is_active", e.target.checked)}
          />
          <label>Ativo</label>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Salvar Alterações" : "Criar Serviço"}
        </button>
      </form>
    </div>
  );
}
