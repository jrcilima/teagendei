import { useEffect, useState, useMemo } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { fetchDailyBookings, type DailyBooking } from "@/react-app/lib/api/dashboard";
import { Link } from "react-router-dom";
import { AppointmentStatus } from "@/shared/types";

export default function DashboardHome() {
  const { currentShop } = useTenant();
  
  // Data Inicial
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const [bookings, setBookings] = useState<DailyBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // --- CÁLCULO AUTOMÁTICO DOS KPIS ---
  // Sempre que 'bookings' mudar, isso é recalculado instantaneamente
  const kpis = useMemo(() => {
    return {
      total_bookings: bookings.length,
      unique_clients: new Set(bookings.map(b => b.client_id)).size,
      total_value: bookings.reduce((acc, curr) => acc + curr.value, 0)
    };
  }, [bookings]);
  // ------------------------------------

  async function loadData() {
    if (!currentShop) return;
    
    // Inicia loading se for uma troca de loja ou data manual
    setLoading(true);

    try {
      const data = await fetchDailyBookings(currentShop.id, selectedDate);
      setBookings(data);
    } catch (error: any) {
       // Se for cancelamento, não faz nada (mantém o estado anterior ou loading)
       if (error.status !== 0 && !error.isAbort) {
          console.error("Erro ao carregar:", error);
          setBookings([]); // Zera em caso de erro real
       }
    } finally {
       // Só tira o loading se a requisição não foi abortada (verificação simples)
       setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [currentShop?.id, selectedDate]);

  // Controles de Data
  const handlePrevDay = () => {
    const date = new Date(selectedDate + "T00:00:00");
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate + "T00:00:00");
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const formatMoney = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const displayDate = new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", { 
    weekday: 'long', day: 'numeric', month: 'long' 
  });
  
  const isToday = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return selectedDate === `${year}-${month}-${day}`;
  })();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case AppointmentStatus.Completed: return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case AppointmentStatus.InProgress: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case AppointmentStatus.Confirmed: return "bg-sky-500/20 text-sky-400 border-sky-500/30";
      default: return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const getStatusName = (status: string) => {
    switch(status) {
      case AppointmentStatus.Completed: return "Concluído";
      case AppointmentStatus.InProgress: return "Em Andamento";
      case AppointmentStatus.Confirmed: return "Confirmado";
      case AppointmentStatus.Pending: return "Pendente";
      default: return "Agendado";
    }
  };

  if (!currentShop) {
    return <div className="text-slate-400 p-8">Selecione uma unidade.</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
             Visão Geral
             {isToday && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/20">Hoje</span>}
          </h1>
          <p className="text-slate-400 text-sm mt-1 capitalize">{displayDate}</p>
          <p className="text-xs text-slate-500">{currentShop.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-white/10">
              <button onClick={handlePrevDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">←</button>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
              />
              <button onClick={handleNextDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">→</button>
          </div>
          
          <button 
            onClick={loadData}
            className="p-3 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Atualizar dados"
          >
            🔄
          </button>
        </div>
      </div>

      {/* KPI CARDS (Calculados via useMemo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 text-6xl group-hover:scale-110 transition">📅</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Agendamentos</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis.total_bookings}
          </h3>
        </div>
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-sky-500 text-6xl group-hover:scale-110 transition">👥</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Clientes</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis.unique_clients}
          </h3>
        </div>
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-violet-500 text-6xl group-hover:scale-110 transition">💰</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Faturamento Previsto</p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {loading ? "..." : formatMoney(kpis.total_value)}
          </h3>
        </div>
      </div>

      {/* LISTA */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-semibold text-white">Atendimentos do Dia</h3>
          <Link to="/staff/agenda" className="text-xs text-emerald-400 hover:text-emerald-300">Ver Agenda Completa →</Link>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-slate-500 animate-pulse">Carregando dados...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            Nenhum agendamento encontrado para esta data.
            {isToday && <p className="text-xs text-slate-600 mt-2">Compartilhe seu link: /book/{currentShop.slug}</p>}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800 text-slate-200 px-3 py-2 rounded-lg text-sm font-bold font-mono border border-white/5">
                    {b.time}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{b.client_name}</p>
                    <p className="text-xs text-slate-500">
                      <span className="text-emerald-400">{b.service_name}</span> • com {b.professional_name}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="block text-sm font-medium text-slate-300">{formatMoney(b.value)}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusBadge(b.raw_status)}`}>
                    {getStatusName(b.raw_status)}
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