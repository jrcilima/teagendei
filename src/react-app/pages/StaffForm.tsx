import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { useTenant } from "../contexts/TenantContext";
import type { User } from "../../shared/schemas/user";

const api = new ApiClient();
const userService = usersApi(api);

export default function StaffForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shop } = useTenant();

  const isEdit = Boolean(id);

  const [data, setData] = useState<Partial<User>>({
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
      const staff = await userService.findById(id);
      setData(staff);
    } catch (err) {
      console.error("Erro ao carregar funcionário:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shop?.id) {
      alert("Nenhuma barbearia encontrada.");
      return;
    }

    try {
      if (isEdit && id) {
        await userService.update(id, data);
      } else {
        await userService.create({
          ...data,
          shop_id: shop.id,
          role: "staff",
          is_professional: true,
        });
      }

      navigate("/staff");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar funcionário.");
    }
  };

  if (loading) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Funcionário" : "Novo Funcionário"}
      </h1>

      <form onSubmit={save} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded w-full"
          value={data.name ?? ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="E-mail"
          className="border p-2 rounded w-full"
          value={data.email ?? ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Telefone"
          className="border p-2 rounded w-full"
          value={data.phone ?? ""}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Salvar Alterações" : "Criar Funcionário"}
        </button>
      </form>
    </div>
  );
}
