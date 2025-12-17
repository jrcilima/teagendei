import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const menu = [
    { label: "Visão Geral", path: "/owner/dashboard", icon: "📊" },
    { label: "Serviços", path: "/owner/services", icon: "✂️" },
    { label: "Profissionais", path: "/owner/staff", icon: "👥" },
    { label: "Unidades", path: "/owner/shops", icon: "🏪" },
    { label: "Configurações", path: "/owner/settings", icon: "⚙️" },
  ];

  // Se o dono também for profissional, mostra a agenda dele
  if (user?.is_professional) {
    menu.splice(1, 0, { label: "Minha Agenda", path: "/staff/agenda", icon: "📅" });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-white/5 h-screen fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold mr-3">
          T
        </div>
        <span className="font-semibold text-white tracking-wide">TeaAgendei</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-slate-950/50 rounded-xl p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Plano Atual</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Trial Grátis</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ativo</span>
          </div>
        </div>
      </div>
    </aside>
  );
}