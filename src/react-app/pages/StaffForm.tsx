import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { useTenant } from "../contexts/TenantContext";

import type { User } from "../../shared/schemas/user";

const api = new ApiClient();
const userService = usersApi(api);

export default function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shop } = useTenant();

  const isEdit = Boolean(id);

  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    is_professional: true,
  });

  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!isEdit || !id) {
      setLoading(false);
      return;
    }

    try {
      const data = await userService.findById(id);
      setForm(data);
    } catch (err) {
      console.error("Erro ao carregar profissional:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shop?.id) {
      alert("Barbearia não selecionada.");
      return;
    }

    try {
      if (isEdit && id) {
        await userService.update(id, form);
      } else {
        await userService.create({
          ...form,
          role: "staff",
          is_professional: true,
          shop_id: shop.id,
        });
      }

      navigate("/staff");
    } catch (err) {
      console.error("Erro ao salvar profissional:", err);
      alert("Falha ao salvar.");
    }
  };

  const updateField = (field: keyof User, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Profissional" : "Novo Profissional"}
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
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full"
            value={form.email ?? ""}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Telefone</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={form.phone ?? ""}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Salvar" : "Criar"}
        </button>
      </form>
    </div>
  );
}
