import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { getShopHours, upsertShopHour, seedDefaultHours } from "@/react-app/lib/api/shop-hours";
import { getSegments, getPaymentMethods, updateShop, createPaymentMethod } from "@/react-app/lib/api/shops";
import { pb } from "@/react-app/lib/api/pocketbase";
import type { ShopHour, Weekday, Segment, PaymentMethod } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "dom", label: "Domingo" }, { key: "seg", label: "Segunda" },
  { key: "ter", label: "Terça" }, { key: "qua", label: "Quarta" },
  { key: "qui", label: "Quinta" }, { key: "sex", label: "Sexta" },
  { key: "sab", label: "Sábado" },
];

type Tab = "hours" | "details" | "finance";

export default function SettingsPage() {
  const { currentShop, currentCompany, setCurrentShop } = useTenant();
  const [activeTab, setActiveTab] = useState<Tab>("hours");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- DADOS CARREGADOS ---
  const [hours, setHours] = useState<ShopHour[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [allPaymentMethods, setAllPaymentMethods] = useState<PaymentMethod[]>([]);
  
  // --- FORMULÁRIO DADOS DA LOJA ---
  const [shopName, setShopName] = useState("");
  const [shopSlug, setShopSlug] = useState(""); 
  const [shopDescription, setShopDescription] = useState(""); 
  const [shopPhone, setShopPhone] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [minAdvance, setMinAdvance] = useState(""); 
  const [maxAdvance, setMaxAdvance] = useState(""); 
  
  // Logo
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // --- FORMULÁRIO FINANCEIRO ---
  const [pixKey, setPixKey] = useState("");
  const [pixKeyType, setPixKeyType] = useState("cpf");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  
  // Modal Novo Pagamento
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [newPayName, setNewPayName] = useState("");

  useEffect(() => {
    if (currentShop) {
      loadData();
      
      // Preenche estados do form
      setShopName(currentShop.name);
      setShopSlug(currentShop.slug);
      setShopDescription(currentShop.description || "");
      setShopPhone(currentShop.phone || "");
      setShopAddress(currentShop.address || "");
      setSelectedSegment(currentShop.segment_id || "");
      
      setMinAdvance(currentShop.min_advance_time?.toString() || "30");
      setMaxAdvance(currentShop.max_advance_time?.toString() || "30");

      setPixKey(currentShop.pix_key || "");
      setPixKeyType(currentShop.pix_key_type || "cpf");
      setSelectedPayments(currentShop.accepted_payment_methods || []);

      if (currentShop.logo) {
        const url = pb.files.getUrl(currentShop, currentShop.logo);
        setLogoPreview(url);
      } else {
        setLogoPreview(null);
      }
    }
  }, [currentShop?.id]);

  async function loadData() {
    if (!currentShop || !currentCompany) return;
    setLoading(true);
    try {
      const [h, s, p] = await Promise.all([
        getShopHours(currentShop.id),
        getSegments(),
        getPaymentMethods(currentCompany.id)
      ]);
      setHours(h);
      setSegments(s);
      setAllPaymentMethods(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // --- HANDLERS ---

  async function handleSaveDetails() {
    if (!currentShop) return;
    setSaving(true);
    try {
      const payload: any = {
        name: shopName,
        slug: shopSlug,
        description: shopDescription,
        phone: shopPhone,
        address: shopAddress,
        segment_id: selectedSegment,
        min_advance_time: Number(minAdvance),
        max_advance_time: Number(maxAdvance),
      };

      if (logoFile) {
        payload.logo = logoFile;
      }

      const updated = await updateShop(currentShop.id, payload);
      setCurrentShop(updated);
      alert("Dados da loja atualizados!");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao salvar. Verifique se o Slug já existe.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveFinance() {
    if (!currentShop) return;
    setSaving(true);
    try {
      const updated = await updateShop(currentShop.id, {
        pix_key: pixKey,
        pix_key_type: pixKeyType as any,
        accepted_payment_methods: selectedPayments
      });
      setCurrentShop(updated);
      alert("Configurações financeiras salvas!");
    } catch (error) {
      alert("Erro ao salvar financeiro.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveHour(day: Weekday, start: string, end: string, closed: boolean) {
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
    const newHours = await getShopHours(currentShop.id);
    setHours(newHours);
    setSaving(false);
  }

  async function handleSeedHours() {
    if (!currentShop || !currentCompany) return;
    if (!confirm("Resetar horários para o padrão?")) return;
    setSaving(true);
    await seedDefaultHours(currentShop.id, currentCompany.id);
    loadData();
    setSaving(false);
  }

  async function handleCreatePayment() {
    if (!currentCompany || !newPayName.trim()) return;
    try {
        const created = await createPaymentMethod(currentCompany.id, newPayName.trim());
        setAllPaymentMethods([...allPaymentMethods, created]);
        setSelectedPayments([...selectedPayments, created.id]);
        setNewPayName("");
        setPayModalOpen(false);
    } catch (err) {
        alert("Erro ao criar método de pagamento.");
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const togglePayment = (id: string) => {
    setSelectedPayments(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  if (!currentShop) return <div>Carregando...</div>;

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-white">Configurações</h1>

      <div className="flex gap-4 border-b border-white/10 overflow-x-auto">
        <button onClick={() => setActiveTab("hours")} className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === "hours" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400"}`}>
          Horários
        </button>
        <button onClick={() => setActiveTab("details")} className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === "details" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400"}`}>
          Dados da Loja
        </button>
        <button onClick={() => setActiveTab("finance")} className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === "finance" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400"}`}>
          Financeiro & Pix
        </button>
      </div>

      {loading ? <div className="text-slate-500 animate-pulse">Carregando dados...</div> : (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
          
          {/* ================= ABA HORÁRIOS ================= */}
          {activeTab === "hours" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Horários de Funcionamento</h3>
                {hours.length === 0 && (
                   <button onClick={handleSeedHours} className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded hover:bg-emerald-500/20">Preencher Padrão</button>
                )}
              </div>
              {WEEKDAYS.map((day) => {
                const config = hours.find(h => h.weekday === day.key);
                const isClosed = config?.is_closed ?? false;
                const start = config?.start_time || "09:00";
                const end = config?.end_time || "18:00";
                return (
                  <div key={day.key} className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="w-24 text-slate-300 font-medium capitalize">{day.label}</div>
                    
                    <div className="flex items-center gap-2">
                      <input type="time" disabled={isClosed || saving} value={start} 
                        onChange={e => handleSaveHour(day.key, e.target.value, end, isClosed)}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-30 focus:border-emerald-500 outline-none" />
                      <span className="text-slate-500">-</span>
                      <input type="time" disabled={isClosed || saving} value={end}
                        onChange={e => handleSaveHour(day.key, start, e.target.value, isClosed)}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-30 focus:border-emerald-500 outline-none" />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer ml-auto hover:text-white">
                      <input type="checkbox" checked={isClosed} disabled={saving}
                        onChange={e => handleSaveHour(day.key, start, end, e.target.checked)}
                        className="rounded bg-black/40 border-white/20 text-red-500 focus:ring-red-500" />
                      Fechado
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= ABA DADOS DA LOJA ================= */}
          {activeTab === "details" && (
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Identidade</h3>
                
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-500 text-center">Sem<br/>Logo</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Logotipo da Unidade</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nome da Unidade</label>
                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopName} onChange={e => setShopName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Link Personalizado (Slug)</label>
                    <div className="flex items-center">
                      <span className="bg-slate-800 border border-white/10 border-r-0 rounded-l-lg p-2.5 text-slate-500 text-xs">/book/</span>
                      <input className="w-full bg-black/30 border border-white/10 rounded-r-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                        value={shopSlug} onChange={e => setShopSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Descrição</label>
                  <textarea className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none" rows={3}
                    value={shopDescription} onChange={e => setShopDescription(e.target.value)} />
                </div>

                <div>
                   <label className="block text-xs text-slate-400 mb-1">Segmento</label>
                   <select className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:border-emerald-500 outline-none"
                      value={selectedSegment} onChange={e => setSelectedSegment(e.target.value)}>
                      <option value="">Selecione...</option>
                      {segments.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                   </select>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Localização</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs text-slate-400 mb-1">Telefone / WhatsApp</label>
                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopPhone} onChange={e => setShopPhone(e.target.value)} />
                   </div>
                   <div>
                    <label className="block text-xs text-slate-400 mb-1">Endereço</label>
                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopAddress} onChange={e => setShopAddress(e.target.value)} />
                   </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-4">
                 <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Regras de Agenda</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs text-slate-400 mb-1">Antecedência Mínima (minutos)</label>
                       <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                         value={minAdvance} onChange={e => setMinAdvance(e.target.value)} />
                    </div>
                    <div>
                       <label className="block text-xs text-slate-400 mb-1">Agenda Aberta (dias)</label>
                       <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                         value={maxAdvance} onChange={e => setMaxAdvance(e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="pt-4">
                <button onClick={handleSaveDetails} disabled={saving} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20">
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          )}

          {/* ================= ABA FINANCEIRO ================= */}
          {activeTab === "finance" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Configuração Pix</h3>
                <div className="grid grid-cols-3 gap-4 mb-2">
                   <div className="col-span-1">
                      <label className="block text-xs text-slate-400 mb-1">Tipo de Chave</label>
                      <select className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:border-emerald-500 outline-none"
                        value={pixKeyType} onChange={e => setPixKeyType(e.target.value)}>
                        <option value="cpf">CPF</option>
                        <option value="cnpj">CNPJ</option>
                        <option value="email">E-mail</option>
                        <option value="telefone">Telefone</option>
                        <option value="aleatoria">Aleatória</option>
                      </select>
                   </div>
                   <div className="col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Chave Pix</label>
                      <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                        value={pixKey} onChange={e => setPixKey(e.target.value)} placeholder="Sua chave aqui" />
                   </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-200">Métodos de Pagamento Aceitos</h3>
                    <button 
                        onClick={() => setPayModalOpen(true)}
                        className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded hover:bg-emerald-500/20"
                    >
                        + Novo Método
                    </button>
                </div>
                
                {allPaymentMethods.length === 0 ? (
                    <p className="text-xs text-slate-500 p-4 border border-dashed border-white/10 rounded-xl text-center">
                        Nenhum método cadastrado no sistema. <br/>
                        Clique em <strong>+ Novo Método</strong> para começar.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allPaymentMethods.map(pm => (
                        <label key={pm.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${selectedPayments.includes(pm.id) ? "bg-emerald-500/10 border-emerald-500/50" : "bg-black/20 border-white/5 hover:bg-white/5"}`}>
                            <input type="checkbox" checked={selectedPayments.includes(pm.id)} onChange={() => togglePayment(pm.id)}
                            className="rounded bg-black/40 border-white/20 text-emerald-500 focus:ring-emerald-500" />
                            <span className={selectedPayments.includes(pm.id) ? "text-emerald-400" : "text-slate-400"}>{pm.name}</span>
                        </label>
                    ))}
                    </div>
                )}
              </div>

              <div className="pt-4">
                <button onClick={handleSaveFinance} disabled={saving} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20">
                  {saving ? "Salvando..." : "Salvar Configurações"}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODAL CRIAR MÉTODO */}
      <Modal isOpen={isPayModalOpen} onClose={() => setPayModalOpen(false)} title="Novo Método de Pagamento">
         <div className="space-y-4">
            <div>
               <label className="block text-xs text-slate-400 mb-1">Nome do Método</label>
               <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                  placeholder="Ex: Dinheiro, Cartão de Crédito, Fiado..."
                  value={newPayName} onChange={e => setNewPayName(e.target.value)} />
            </div>
            <button onClick={handleCreatePayment} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">
                Criar e Selecionar
            </button>
         </div>
      </Modal>
    </div>
  );
}