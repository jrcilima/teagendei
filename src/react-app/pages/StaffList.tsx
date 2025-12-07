import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { useTenant } from "../contexts/TenantContext";

import type { User } from "../../shared/schemas/user";

const api = new ApiClient();
const userService = usersApi(api);

export default function StaffList() {
  const { shop } = useTenant();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!shop?.id) return;

    setLoading(true);

    try {
      const resp = await userService.list({
        filter: `role = "staff" && shop_id = "${shop.id}"`,
        sort: "name",
        perPage: 200,
      });

      setStaff(resp.items);
    } catch (err) {
      console.error("Erro ao carregar staff:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [shop?.id]);

  if (loading) {
    return <div className="p-4">Carregando funcionários...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Profissionais</h1>

        <Link
          to="/staff/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Novo Profissional
        </Link>
      </div>

      {staff.length === 0 && (
        <div className="text-gray-500">Nenhum profissional cadastrado.</div>
      )}

      <div className="space-y-4">
        {staff.map((s) => (
          <div key={s.id} className="border p-4 rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              {s.phone && <div className="text-gray-600">{s.phone}</div>}
            </div>

            <Link
              to={`/staff/${s.id}`}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
            >
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
