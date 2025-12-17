import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { currentShop } = useTenant();

  return (
    <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      {/* Mobile Toggle (Placeholder) */}
      <div className="md:hidden text-slate-400">☰</div>

      {/* Info da Loja Atual */}
      <div className="hidden md:block">
        <h2 className="text-sm font-medium text-slate-200">
          {currentShop ? currentShop.name : "Selecione uma unidade"}
        </h2>
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
          className="text-xs text-red-400 hover:text-red-300 transition ml-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}