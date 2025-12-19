import { useEffect, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { 
  getDailyBookings, 
  type DailyBooking 
} from "@/react-app/lib/api/dashboard";
import { Calendar, DollarSign, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardHome() {
  const { user } = useAuth();
  
  // Estado de Data (Padrão: Hoje)
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [bookings, setBookings] = useState<DailyBooking[]>([]);
  const [stats, setStats] = useState({ revenue: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  // Carrega dados sempre que a data ou loja mudar
  useEffect(() => {
    async function loadDashboard() {
      if (!user?.shop_id) return;
      
      setLoading(true);
      try {
        // OTIMIZAÇÃO: Chamamos apenas UMA vez a API
        const dataBookings = await getDailyBookings(user.shop_id, selectedDate);

        // Calculamos os KPIs localmente (economiza requisições e evita erros)
        const totalRevenue = dataBookings.reduce((acc, curr) => acc + curr.value, 0);
        const totalCount = dataBookings.length;

        setBookings(dataBookings);
        setStats({
          revenue: totalRevenue,
          count: totalCount
        });
      } catch (error: any) {
        // Ignora erro de cancelamento se ainda ocorrer (navegação rápida)
        if (error.status !== 0) {
            console.error("Erro ao carregar dashboard", error);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user?.shop_id, selectedDate]);

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

  // Formata valor para BRL
  const formatMoney = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // Formata data para exibição
  const displayDate = new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-slate-500 animate-pulse">Carregando indicadores...</div>
        </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER COM SELETOR DE DATA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Visão Geral</h1>
            <p className="text-slate-400 capitalize">{displayDate}</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-sm">
            <button onClick={handlePrevDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                <ChevronLeft size={20} />
            </button>
            <div className="px-2 text-center">
                <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Data</span>
                <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 cursor-pointer p-0 w-24 text-center [&::-webkit-calendar-picker-indicator]:hidden"
                />
            </div>
            <button onClick={handleNextDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                <ChevronRight size={20} />
            </button>
        </div>
      </div>

      {/* CARDS DE KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Faturamento */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Faturamento</p>
            <p className="text-2xl font-bold text-white">{formatMoney(stats.revenue)}</p>
          </div>
        </div>

        {/* Atendimentos */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Agendamentos</p>
            <p className="text-2xl font-bold text-white">{stats.count}</p>
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-purple-500/30 transition">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Ticket Médio</p>
            <p className="text-2xl font-bold text-white">
              {formatMoney(stats.count > 0 ? stats.revenue / stats.count : 0)}
            </p>
          </div>
        </div>
      </div>

      {/* TABELA DE AGENDAMENTOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Clock size={18} className="text-slate-400" /> Agendamentos do Dia
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950/50 text-slate-200 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Horário</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">Profissional</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 flex flex-col items-center gap-2">
                    <Calendar size={32} className="opacity-20" />
                    <span>Nenhum agendamento encontrado para esta data.</span>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-800/50 transition cursor-default">
                    <td className="px-6 py-4 font-mono text-white">
                        {booking.time}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200">
                      {booking.client_name}
                      {/* Badge para Avulso */}
                      {!booking.client_id && (
                        <span className="ml-2 text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-white/10" title="Cliente sem cadastro">Avulso</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{booking.service_name}</td>
                    <td className="px-6 py-4 text-slate-400">{booking.professional_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border
                        ${booking.status === 'Confirmado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          booking.status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          booking.status === 'Concluído' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          booking.status === 'Em Andamento' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-200">
                      {formatMoney(booking.value)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}