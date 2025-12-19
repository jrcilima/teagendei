import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function StaffLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menu simplificado conforme solicitado
  const menuItems = [
    { label: "Minha Agenda", path: "/staff/agenda", icon: "📅" },
    { label: "Meus Dados e Senha", path: "/staff/settings", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      
      {/* SIDEBAR EXCLUSIVA STAFF */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl border border-emerald-500/20">
             ✂️
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight">Área Staff</h1>
            <p className="text-xs text-slate-500 truncate max-w-[120px]">{user?.name}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition border border-transparent hover:border-red-500/20"
          >
            🚪 Sair do Sistema
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO */}
      <main className="flex-1 overflow-y-auto h-screen relative bg-slate-950">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}