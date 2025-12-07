import { useEffect, useState } from "react";
import { useTenant } from "../contexts/TenantContext";
import { shopsApi } from "../lib/api/shopsApi";
import ApiClient from "../lib/apiClient";
import type { Shop } from "../../shared/schemas/shop";

const api = new ApiClient();
const shopService = shopsApi(api);

export default function ShopForm() {
  const { shop, refreshShop } = useTenant();

  const [form, setForm] = useState<Partial<Shop>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (shop) {
      setForm(shop);
    }
  }, [shop]);

  const handleChange = (field: keyof Shop, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop) return;

    setLoading(true);
    setSaved(false);

    try {
      await shopService.update(shop.id, form);
      await refreshShop(); // atualiza TenantContext
      setSaved(true);
    } catch (err) {
      console.error("Erro ao salvar shop:", err);
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  if (!shop) {
    return <p className="p-4">Nenhuma barbearia cadastrada.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Configurações da Barbearia</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={form.slug || ""}
            onChange={(e) => handleChange("slug", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="text"
            value={form.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Endereço</label>
          <input
            type="text"
            value={form.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>

        {saved && (
          <p className="text-green-600 text-sm mt-2">Salvo com sucesso!</p>
        )}
      </form>
    </div>
  );
}
