import { Link } from "react-router-dom";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { LayoutDashboard, Menu, LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const { currentShop } = useTenant();

  return (
    <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      
      <div className="flex items-center gap-4">
        {/* Ícone de Menu (Mobile - Visual por enquanto) */}
        <div className="md:hidden text-slate-400">
            <Menu size={24} />
        </div>

        {/* Botão HOME - Atalho para Dashboard */}
        <Link 
            to="/owner/dashboard" 
            className="text-slate-400 hover:text-emerald-400 transition p-1 rounded-lg hover:bg-white/5"
            title="Ir para Visão Geral"
        >
            <LayoutDashboard size={22} />
        </Link>

        {/* Info da Loja Atual */}
        <div className="hidden md:block h-6 w-px bg-white/10 mx-2"></div>
        <div className="hidden md:block">
            <h2 className="text-sm font-medium text-slate-200">
            {currentShop ? currentShop.name : "Selecione uma unidade"}
            </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm text-white font-medium">{user?.name}</p>
          <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
        </div>
        
        <div className="h-9 w-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 overflow-hidden">
          {user?.avatar ? (
             <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover"/>
          ) : (
             <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
          )}
        </div>

        <button 
          onClick={logout}
          className="text-xs text-red-400 hover:text-red-300 transition ml-2 flex items-center gap-1"
          title="Sair"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}