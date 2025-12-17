import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { fetchTodayKpis, fetchTodayBookings, type TodayKpis, type TodayBooking } from "@/react-app/lib/api/dashboard";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const { currentShop } = useTenant();
  
  const [kpis, setKpis] = useState<TodayKpis | null>(null);
  const [bookings, setBookings] = useState<TodayBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentShop) return;

    async function load() {
      setLoading(true);
      try {
        const [kpiData, bookingData] = await Promise.all([
          fetchTodayKpis(currentShop!.id),
          fetchTodayBookings(currentShop!.id)
        ]);
        setKpis(kpiData);
        setBookings(bookingData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentShop?.id]);

  if (!currentShop) {
    return <div className="text-slate-400">Nenhuma unidade selecionada.</div>;
  }

  // Formatador de Moeda
  const formatMoney = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-slate-400">Resumo da operação hoje em {currentShop.name}</p>
      </div>

      {/* CARDS DE KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 text-6xl group-hover:scale-110 transition">📅</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Agendamentos Hoje</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis?.total_bookings || 0}
          </h3>
        </div>

        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-sky-500 text-6xl group-hover:scale-110 transition">👥</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Clientes Únicos</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis?.unique_clients || 0}
          </h3>
        </div>

        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-violet-500 text-6xl group-hover:scale-110 transition">💰</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Faturamento Previsto</p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {loading ? "..." : formatMoney(kpis?.total_value || 0)}
          </h3>
        </div>
      </div>

      {/* LISTA DE PRÓXIMOS AGENDAMENTOS */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-semibold text-white">Próximos atendimentos</h3>
          <Link to="/staff/agenda" className="text-xs text-emerald-400 hover:text-emerald-300">Ver agenda completa →</Link>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500">Carregando...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 mb-2">Nenhum agendamento para hoje.</p>
            <p className="text-xs text-slate-600">Compartilhe seu link: /book/{currentShop.slug}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800 text-slate-200 px-3 py-2 rounded-lg text-sm font-bold font-mono">
                    {b.time.slice(11, 16)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{b.client_name}</p>
                    <p className="text-xs text-slate-500">{b.service_name} • com {b.professional_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-sky-500/10 text-sky-400">
                    Confirmado
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}