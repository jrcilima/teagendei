import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { useTenant } from "../contexts/TenantContext";
import type { User } from "../../shared/schemas/user";

const api = new ApiClient();
const userService = usersApi(api);

export default function StaffList() {
  const navigate = useNavigate();
  const { shop } = useTenant();

  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!shop?.id) return;

    try {
      // listando profissionais desta barbearia
      const res = await userService.list({
        filter: `role = "staff" && shop_id = "${shop.id}"`,
        perPage: 50,
      });

      setStaff(res.items);
    } catch (err) {
      console.error("Erro ao carregar staff:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [shop?.id]);

  if (loading) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Equipe</h1>

        <button
          onClick={() => navigate("/staff/new")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Novo Funcionário
        </button>
      </div>

      {staff.length === 0 ? (
        <div className="text-gray-500">Nenhum funcionário cadastrado.</div>
      ) : (
        <ul className="space-y-3">
          {staff.map((s) => (
            <li
              key={s.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm opacity-70">{s.email}</div>
              </div>

              <button
                onClick={() => navigate(`/staff/${s.id}`)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
