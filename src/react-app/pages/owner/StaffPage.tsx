import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { getProfessionalsByShop, createProfessionalUser, removeProfessional } from "@/react-app/lib/api/staff";
import type { User } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal";

export default function StaffPage() {
  const { currentShop, currentCompany } = useTenant();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    load();
  }, [currentShop?.id]);

  async function load() {
    if (!currentShop) return;
    setLoading(true);
    const data = await getProfessionalsByShop(currentShop.id);
    setStaff(data);
    setLoading(false);
  }

  async function handleCreate() {
    if (!currentShop || !currentCompany) return;
    try {
      await createProfessionalUser({
        name, 
        email, 
        company_id: currentCompany.id, 
        shop_id: currentShop.id
      });
      setModalOpen(false);
      setName("");
      setEmail("");
      load();
    } catch (err: any) {
        // Se der erro de email duplicado, o PB retorna 400
        alert("Erro ao adicionar. Verifique se o email já existe.");
    }
  }

  async function handleRemove(id: string) {
    if (confirm("Remover acesso de profissional deste usuário?")) {
        await removeProfessional(id);
        load();
    }
  }

  if (!currentShop) return <div>Selecione uma unidade.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Profissionais</h1>
        <button onClick={() => setModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl">
          + Adicionar Profissional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-slate-500">Carregando...</p> : staff.map(user => (
          <div key={user.id} className="bg-slate-900 border border-white/5 p-4 rounded-xl flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover"/> : user.name?.[0]}
             </div>
             <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
             </div>
             {user.role !== 'dono' && (
                 <button onClick={() => handleRemove(user.id)} className="text-slate-600 hover:text-red-400 text-sm">
                    Remover
                 </button>
             )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Novo Profissional">
         <div className="space-y-4">
            <p className="text-xs text-slate-400 bg-slate-800 p-2 rounded">
                Uma senha provisória "Mudar@123" será criada automaticamente.
            </p>
            <div>
                <label className="block text-xs text-slate-400 mb-1">Nome Completo</label>
                <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                   value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label className="block text-xs text-slate-400 mb-1">E-mail de acesso</label>
                <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                   value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button onClick={handleCreate} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">
                Cadastrar
            </button>
         </div>
      </Modal>
    </div>
  );
}