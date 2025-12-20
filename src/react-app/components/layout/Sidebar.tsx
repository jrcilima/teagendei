import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Store, 
  Scissors, 
  Users, 
  Settings, 
  X,
  DollarSign,
  Calendar // Import do ícone Calendar
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { label: "Visão Geral", path: "/owner/dashboard", icon: LayoutDashboard },
    { label: "Minha Agenda", path: "/staff/agenda", icon: Calendar }, // VOLTOU: Link para a agenda
    { label: "Financeiro", path: "/owner/financial", icon: DollarSign },
    { label: "Minhas Lojas", path: "/owner/shops", icon: Store },
    { label: "Serviços", path: "/owner/services", icon: Scissors },
    { label: "Profissionais", path: "/owner/staff", icon: Users },
    { label: "Configurações", path: "/owner/settings", icon: Settings },
  ];

  return (
    <>
      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-20 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed md:fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-white/5 flex flex-col transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* LOGO AREA */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
            <span className="text-emerald-500 text-2xl">✂</span> TeAgendei
          </div>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="md:hidden text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        {/* MENU ITEMS */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition group ${
                  isActive
                    ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-900/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={18} className={isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* FOOTER VERSÃO */}
        <div className="p-4 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-600 font-mono">v1.0.85</p>
        </div>
      </aside>
    </>
  );
}