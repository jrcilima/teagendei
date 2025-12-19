import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { 
    getProfessionalsByShop, 
    createProfessionalUser, 
    updateProfessionalUser, 
    removeProfessional 
} from "@/react-app/lib/api/staff";
import type { User } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal";

export default function StaffPage() {
  const { currentShop, currentCompany } = useTenant();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Controle do Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!currentShop) return;
      setLoading(true);
      try {
        const data = await getProfessionalsByShop(currentShop.id);
        if (isMounted) {
          setStaff(data);
        }
      } catch (err: any) {
        if (err.status === 0 || err.isAbort) return;
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [currentShop?.id]);

  // Abre modal para CRIAR
  const handleOpenCreate = () => {
      setEditingUser(null);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setModalOpen(true);
  };

  // Abre modal para EDITAR
  const handleOpenEdit = (user: User) => {
      setEditingUser(user);
      setName(user.name || ""); 
      setEmail(user.email);
      setPhone(user.phone || ""); 
      setPassword(""); 
      setModalOpen(true);
  };

  async function handleSave() {
    if (!currentShop || !currentCompany) {
        alert("Erro de contexto: Loja ou Empresa não identificada.");
        return;
    }
    
    if (!name.trim()) return alert("O Nome é obrigatório.");
    if (!editingUser && !email.trim()) return alert("O E-mail é obrigatório.");
    if (!editingUser && password && password.length < 8) {
        return alert("A senha deve ter no mínimo 8 caracteres.");
    }

    try {
      if (editingUser) {
          // MODO EDIÇÃO
          await updateProfessionalUser(editingUser.id, { name, phone });
          alert("Dados atualizados com sucesso!");
      } else {
          // MODO CRIAÇÃO
          await createProfessionalUser({
            name, 
            email, 
            phone,
            password, 
            company_id: currentCompany.id, 
            shop_id: currentShop.id
          });
          alert("Profissional cadastrado com sucesso!");
      }
      
      setModalOpen(false);
      const data = await getProfessionalsByShop(currentShop.id);
      setStaff(data);
      
    } catch (err: any) {
        console.error("Erro completo:", err);
        if (err.status === 400) {
            alert("Erro de validação (400). Verifique se o e-mail já está em uso.");
        } else {
            alert(`Ocorreu um erro: ${err.message}`);
        }
    }
  }

  async function handleRemove(id: string) {
    if (confirm("Remover acesso de profissional deste usuário?")) {
        await removeProfessional(id);
        const data = await getProfessionalsByShop(currentShop!.id);
        setStaff(data);
    }
  }

  if (!currentShop) return <div>Selecione uma unidade.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Profissionais</h1>
        <button onClick={handleOpenCreate} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl">
          + Adicionar Profissional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-slate-500">Carregando...</p> : staff.map(user => (
          <div key={user.id} className="bg-slate-900 border border-white/5 p-4 rounded-xl flex items-center gap-4 relative group">
             <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold overflow-hidden shrink-0">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover"/> : user.name?.[0]}
             </div>
             
             <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                {user.phone && <p className="text-xs text-slate-600 truncate">{user.phone}</p>}
             </div>

             {user.role !== 'dono' && (
                 <div className="flex items-center gap-2">
                     <button onClick={() => handleOpenEdit(user)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition" title="Editar">✏️</button>
                     <button onClick={() => handleRemove(user.id)} className="p-2 text-slate-600 hover:text-red-400 hover:bg-slate-800 rounded-lg transition" title="Remover">🗑️</button>
                 </div>
             )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingUser ? "Editar Profissional" : "Novo Profissional"}>
         <div className="space-y-4">
            {!editingUser && (
                <div className="bg-slate-800 p-3 rounded-lg text-xs text-slate-300 border border-white/5">
                    <p>O profissional usará o <strong>e-mail</strong> e a <strong>senha</strong> abaixo para acessar.</p>
                </div>
            )}
            <div>
                <label className="block text-xs text-slate-400 mb-1">Nome Completo *</label>
                <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                   value={name} onChange={e => setName(e.target.value)} placeholder="Ex: João Silva" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1">E-mail</label>
                    <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500 disabled:opacity-50"
                    value={email} onChange={e => setEmail(e.target.value)} placeholder="joao@email.com" disabled={!!editingUser} />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Telefone</label>
                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                    value={phone} onChange={e => setPhone(e.target.value)} placeholder="(00) 00000-0000" />
                </div>
            </div>

            {!editingUser && (
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Senha (Opcional)</label>
                    <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                    value={password} onChange={e => setPassword(e.target.value)} placeholder="Padrão: Mudar@123" />
                </div>
            )}

            <button onClick={handleSave} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2 transition">
                {editingUser ? "Salvar Alterações" : "Cadastrar Profissional"}
            </button>
         </div>
      </Modal>
    </div>
  );
}