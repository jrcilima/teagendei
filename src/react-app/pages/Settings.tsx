import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTenant } from "../contexts/TenantContext";

import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { shopsApi } from "../lib/api/shopsApi";

import type { User } from "../../shared/schemas/user";
import type { Shop } from "../../shared/schemas/shop";

const api = new ApiClient();
const userService = usersApi(api);
const shopService = shopsApi(api);

export default function Settings() {
  const { user } = useAuth();
  const { shop, refreshShop } = useTenant();

  const [userForm, setUserForm] = useState<Partial<User>>({});
  const [shopForm, setShopForm] = useState<Partial<Shop>>({});
  const [loading, setLoading] = useState(true);

  // Carregar dados iniciais no form
  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.name,
        phone: user.phone,
      });
    }

    if (shop) {
      setShopForm({
        name: shop.name,
        phone: shop.phone,
        address: shop.address,
        description: shop.description,
        min_advance_time: shop.min_advance_time,
        max_advance_time: shop.max_advance_time,
        pix_key: shop.pix_key,
        pix_key_type: shop.pix_key_type,
      });
    }

    setLoading(false);
  }, [user, shop]);

  const saveUser = async () => {
    if (!user) return;

    try {
      await userService.update(user.id, userForm);

      // AuthContext vai receber atualização automaticamente via authStore.onChange()
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar seus dados.");
    }
  };

  const saveShop = async () => {
    if (!shop) return;

    try {
      await shopService.update(shop.id, shopForm);
      await refreshShop(); // refresca TenantContext

      alert("Barbearia atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar a barbearia.");
    }
  };

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-6 space-y-10 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold">Configurações</h1>

      {/* PERFIL DO USUÁRIO */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-3">Seu Perfil</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nome"
            className="border p-2 rounded w-full"
            value={userForm.name ?? ""}
            onChange={(e) =>
              setUserForm({ ...userForm, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Telefone"
            className="border p-2 rounded w-full"
            value={userForm.phone ?? ""}
            onChange={(e) =>
              setUserForm({ ...userForm, phone: e.target.value })
            }
          />

          <button
            onClick={saveUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Salvar Perfil
          </button>
        </div>
      </div>

      {/* CONFIGURAÇÕES DA BARBEARIA → SOMENTE DONO */}
      {user?.role === "dono" && (
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-3">Barbearia</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome da barbearia"
              className="border p-2 rounded w-full"
              value={shopForm.name ?? ""}
              onChange={(e) =>
                setShopForm({ ...shopForm, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Telefone"
              className="border p-2 rounded w-full"
              value={shopForm.phone ?? ""}
              onChange={(e) =>
                setShopForm({ ...shopForm, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Endereço"
              className="border p-2 rounded w-full"
              value={shopForm.address ?? ""}
              onChange={(e) =>
                setShopForm({ ...shopForm, address: e.target.value })
              }
            />

            <textarea
              placeholder="Descrição"
              className="border p-2 rounded w-full"
              value={shopForm.description ?? ""}
              onChange={(e) =>
                setShopForm({ ...shopForm, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Tempo mínimo (minutos)"
              className="border p-2 rounded w-full"
              value={shopForm.min_advance_time ?? 0}
              onChange={(e) =>
                setShopForm({
                  ...shopForm,
                  min_advance_time: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Tempo máximo (minutos)"
              className="border p-2 rounded w-full"
              value={shopForm.max_advance_time ?? 0}
              onChange={(e) =>
                setShopForm({
                  ...shopForm,
                  max_advance_time: Number(e.target.value),
                })
              }
            />

            <input
              type="text"
              placeholder="Chave Pix"
              className="border p-2 rounded w-full"
              value={shopForm.pix_key ?? ""}
              onChange={(e) =>
                setShopForm({ ...shopForm, pix_key: e.target.value })
              }
            />

            <select
              className="border p-2 rounded w-full"
              value={shopForm.pix_key_type ?? ""}
              onChange={(e) =>
                setShopForm({
                  ...shopForm,
                  pix_key_type: e.target.value as any,
                })
              }
            >
              <option value="">Selecione o tipo da chave Pix</option>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
              <option value="aleatoria">Aleatória</option>
            </select>

            <button
              onClick={saveShop}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Salvar Barbearia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
