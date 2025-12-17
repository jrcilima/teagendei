import { useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { useNavigate } from "react-router-dom";
import Modal from "@/react-app/components/common/Modal";
import { createInitialShop } from "@/react-app/lib/api/onboarding";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function ShopsPage() {
  const { shops, currentShop, setCurrentShop, currentCompany, reloadTenants } = useTenant();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSwitch = (shopId: string) => {
    const found = shops.find(s => s.id === shopId);
    if (found) setCurrentShop(found);
  };

  const handleCreate = async () => {
     if (!user || !currentCompany) return;
     try {
        await createInitialShop(currentCompany.id, user.id, { name, slug });
        await reloadTenants();
        setModalOpen(false);
        setName("");
        setSlug("");
     } catch(e) {
        alert("Erro ao criar loja. Verifique se o slug é único.");
     }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Minhas Unidades</h1>
        <button onClick={() => setModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl">
          + Nova Unidade
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
         {shops.map(shop => {
            const isActive = shop.id === currentShop?.id;
            return (
                <div key={shop.id} className={`p-6 rounded-2xl border transition ${isActive ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-900 border-white/5'}`}>
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-lg font-bold text-white">{shop.name}</h3>
                         <p className="text-sm text-slate-400">/book/{shop.slug}</p>
                      </div>
                      {isActive ? (
                          <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded">Selecionada</span>
                      ) : (
                          <button onClick={() => handleSwitch(shop.id)} className="text-sm text-emerald-400 hover:underline">
                             Selecionar
                          </button>
                      )}
                   </div>
                   <div className="mt-4 flex gap-2">
                      <a href={`/book/${shop.slug}`} target="_blank" className="text-xs bg-black/30 px-3 py-1.5 rounded border border-white/10 text-slate-300 hover:text-white">
                         Ver página pública ↗
                      </a>
                      <button onClick={() => navigate("/owner/settings")} className="text-xs bg-black/30 px-3 py-1.5 rounded border border-white/10 text-slate-300 hover:text-white">
                         Editar Horários
                      </button>
                   </div>
                </div>
            );
         })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Nova Unidade">
         <div className="space-y-4">
            <div>
               <label className="block text-xs text-slate-400 mb-1">Nome</label>
               <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                  value={name} onChange={e => {
                      setName(e.target.value);
                      setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'));
                  }} />
            </div>
            <div>
               <label className="block text-xs text-slate-400 mb-1">Slug (URL)</label>
               <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                  value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            <button onClick={handleCreate} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">
                Criar Unidade
            </button>
         </div>
      </Modal>
    </div>
  );
}