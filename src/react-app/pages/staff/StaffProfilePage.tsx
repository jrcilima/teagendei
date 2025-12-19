import { useState, useEffect } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { pb } from "@/react-app/lib/api/pocketbase";

export default function StaffProfilePage() {
  const { user } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await pb.collection("users").update(user.id, {
        name: name.trim(),
        phone: phone.trim(),
      });
      alert("Dados atualizados com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao atualizar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert("Preencha todos os campos de senha.");
    }
    if (newPassword.length < 8) {
        return alert("A nova senha deve ter no mínimo 8 caracteres.");
    }
    if (newPassword !== confirmPassword) {
      return alert("A nova senha e a confirmação não conferem.");
    }

    setLoading(true);
    try {
      // Exige senha antiga para troca
      await pb.collection("users").update(user.id, {
        oldPassword: oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      
      alert("Senha alterada com sucesso!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao alterar senha. Verifique se a senha atual está correta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações da Conta</h1>
        <p className="text-slate-400">Mantenha seus dados de acesso e contato atualizados.</p>
      </div>

      {/* DADOS BÁSICOS */}
      <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-2">Meus Dados</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs text-slate-400 mb-1">Nome Completo</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-emerald-500 transition"
                />
            </div>
            <div>
                <label className="block text-xs text-slate-400 mb-1">E-mail (Não alterável)</label>
                <input 
                    type="email" 
                    value={email}
                    disabled
                    className="w-full bg-black/30 border border-white/5 rounded-lg p-3 text-slate-500 cursor-not-allowed"
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Telefone / WhatsApp</label>
                <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-emerald-500 transition"
                />
            </div>
        </div>
        
        <div className="pt-2 text-right">
            <button 
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
                {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-2">Segurança</h2>
        
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-slate-400 mb-1">Senha Atual</label>
                <input 
                    type="password" 
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-emerald-500 transition"
                />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Nova Senha</label>
                    <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-emerald-500 transition"
                        placeholder="Mínimo 8 caracteres"
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Confirmar Nova Senha</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-emerald-500 transition"
                    />
                </div>
            </div>
        </div>

        <div className="pt-2 text-right">
            <button 
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
                {loading ? "Atualizando..." : "Trocar Senha"}
            </button>
        </div>
      </section>
    </div>
  );
}