// Caminho: src/react-app/pages/owner/SettingsPage.tsx
import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { getShopHours, upsertShopHour, seedDefaultHours } from "@/react-app/lib/api/shop-hours";
import type { ShopHour, Weekday } from "@/shared/types";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "dom", label: "Domingo" },
  { key: "seg", label: "Segunda" },
  { key: "ter", label: "Terça" },
  { key: "qua", label: "Quarta" },
  { key: "qui", label: "Quinta" },
  { key: "sex", label: "Sexta" },
  { key: "sab", label: "Sábado" },
];

export default function SettingsPage() {
  const { currentShop, currentCompany } = useTenant();
  const [hours, setHours] = useState<ShopHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Carrega horários ao abrir
  useEffect(() => {
    if (!currentShop) return;
    loadData();
  }, [currentShop?.id]);

  async function loadData() {
    if (!currentShop) return;
    setLoading(true);
    const data = await getShopHours(currentShop.id);
    setHours(data);
    setLoading(false);
  }

  // Função para salvar uma linha alterada
  async function handleSaveRow(day: Weekday, start: string, end: string, closed: boolean) {
    if (!currentShop || !currentCompany) return;
    
    setSaving(true);
    await upsertShopHour({
      shopId: currentShop.id,
      companyId: currentCompany.id,
      weekday: day,
      startTime: start,
      endTime: end,
      isClosed: closed
    });
    // Recarrega para garantir sync
    await loadData(); 
    setSaving(false);
  }

  // Botão de emergência: Criar horários padrão
  async function handleSeed() {
    if (!currentShop || !currentCompany) return;
    if (!confirm("Isso irá redefinir todos os horários para o padrão (Seg-Sex 9h-18h). Continuar?")) return;
    
    setSaving(true);
    await seedDefaultHours(currentShop.id, currentCompany.id);
    await loadData();
    setSaving(false);
  }

  if (!currentShop) return <div className="p-8 text-slate-400">Nenhuma loja selecionada.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Configurações da Unidade</h1>
        <p className="text-slate-400 mb-8">Defina os horários de funcionamento para aparecerem na agenda.</p>

        {loading ? (
          <div className="animate-pulse text-slate-500">Carregando horários...</div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Horários de Funcionamento</h2>
              {hours.length === 0 && (
                <button 
                  onClick={handleSeed}
                  className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20"
                >
                  Preencher Padrão
                </button>
              )}
            </div>

            <div className="space-y-4">
              {WEEKDAYS.map((day) => {
                const config = hours.find((h) => h.weekday === day.key);
                const isClosed = config?.is_closed ?? false;
                const start = config?.start_time || "09:00";
                const end = config?.end_time || "18:00";

                return (
                  <div key={day.key} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                    <div className="w-24 font-medium text-slate-300">{day.label}</div>
                    
                    <div className="flex-1 flex items-center gap-2">
                      <input 
                        type="time" 
                        defaultValue={start}
                        disabled={isClosed || saving}
                        onBlur={(e) => handleSaveRow(day.key, e.target.value, end, isClosed)}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm disabled:opacity-50"
                      />
                      <span className="text-slate-500">-</span>
                      <input 
                        type="time" 
                        defaultValue={end}
                        disabled={isClosed || saving}
                        onBlur={(e) => handleSaveRow(day.key, start, e.target.value, isClosed)}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm disabled:opacity-50"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={isClosed}
                        disabled={saving}
                        onChange={(e) => handleSaveRow(day.key, start, end, e.target.checked)}
                        className="rounded border-white/20 bg-black/40 text-red-500 focus:ring-red-500"
                      />
                      Fechado
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}