import { useEffect, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { getFinancialData, FinancialSummary } from "@/react-app/lib/api/financial";
import { DollarSign, TrendingUp, Calendar, CreditCard, AlertCircle } from "lucide-react";

export default function FinancialPage() {
  const { user } = useAuth();
  
  // Padrão: Mês e Ano atuais
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const formatMoney = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  useEffect(() => {
    async function load() {
      if (!user?.shop_id) return;
      setLoading(true);
      try {
        const result = await getFinancialData(user.shop_id, month, year);
        setData(result);
      } catch (error) {
        console.error("Erro financeiro", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.shop_id, month, year]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER E FILTROS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Gerenciamento Financeiro</h1>
          <p className="text-slate-400">Acompanhe o fluxo de caixa e previsões.</p>
        </div>

        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-white/10 shadow-sm">
          <select 
            value={month} 
            onChange={e => setMonth(Number(e.target.value))}
            className="bg-slate-800 text-white border-none rounded-lg p-2 text-sm focus:ring-0 cursor-pointer outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
              </option>
            ))}
          </select>
          <select 
            value={year} 
            onChange={e => setYear(Number(e.target.value))}
            className="bg-slate-800 text-white border-none rounded-lg p-2 text-sm focus:ring-0 cursor-pointer outline-none"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
      </div>

      {loading || !data ? (
         <div className="h-64 flex items-center justify-center text-slate-500 animate-pulse">
            Carregando dados financeiros...
         </div>
      ) : (
        <>
          {/* CARDS KPI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Realizado */}
            <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50 transition">
                <div className="absolute -right-6 -top-6 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all transform rotate-12">
                    <DollarSign size={150} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                        <DollarSign size={24} />
                    </div>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Receita Realizada</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{formatMoney(data.totalRevenue)}</div>
                <div className="text-xs text-emerald-400 font-medium">
                    {data.countCompleted} atendimentos finalizados
                </div>
            </div>

            {/* Pendente/Futuro */}
            <div className="bg-slate-900 border border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden group hover:border-yellow-500/50 transition">
                <div className="absolute -right-6 -top-6 text-yellow-500/5 group-hover:text-yellow-500/10 transition-all transform rotate-12">
                    <Calendar size={150} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                        <Calendar size={24} />
                    </div>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">A Receber (Previsão)</span>
                </div>
                <div className="text-3xl font-bold text-slate-200 mb-1">{formatMoney(data.totalPending)}</div>
                <div className="text-xs text-yellow-500 font-medium">
                    {data.countPending} agendamentos em aberto
                </div>
            </div>

            {/* Ticket Médio */}
            <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition">
                <div className="absolute -right-6 -top-6 text-indigo-500/5 group-hover:text-indigo-500/10 transition-all transform rotate-12">
                    <TrendingUp size={150} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Ticket Médio</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                    {formatMoney(data.countCompleted > 0 ? data.totalRevenue / data.countCompleted : 0)}
                </div>
                <div className="text-xs text-indigo-400 font-medium">
                    Média por cliente
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* PAGAMENTOS (BARRA DE PROGRESSO) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard size={20} className="text-slate-400"/> Receita por Método
                </h3>
                
                <div className="space-y-5">
                    {Object.keys(data.byMethod).length === 0 ? (
                        <div className="text-center py-10 text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
                             <AlertCircle className="mx-auto mb-2 opacity-50" />
                             Nenhum pagamento concluído neste mês.
                        </div>
                    ) : (
                        Object.entries(data.byMethod)
                            .sort(([, a], [, b]) => b - a)
                            .map(([method, value]) => {
                                const percent = (value / data.totalRevenue) * 100;
                                return (
                                    <div key={method}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-300 font-medium">{method}</span>
                                            <span className="text-slate-200 font-mono">{formatMoney(value)} <span className="text-xs text-slate-500 ml-1">({percent.toFixed(0)}%)</span></span>
                                        </div>
                                        <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-white/5">
                                            <div 
                                                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" 
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })
                    )}
                </div>
            </div>

            {/* HISTÓRICO DIÁRIO */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                     <Calendar size={20} className="text-slate-400"/> Detalhamento Diário
                </h3>
                <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                     {Object.keys(data.dailyData).length === 0 ? (
                        <div className="text-center py-10 text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
                            Sem movimentações financeiras.
                        </div>
                     ) : (
                        Object.entries(data.dailyData)
                            .sort(([dateA], [dateB]) => dateB.localeCompare(dateA)) // Mais recente primeiro
                            .map(([day, value]) => {
                                const [y, m, d] = day.split("-");
                                const formattedDay = `${d}/${m}`;
                                return (
                                    <div key={day} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5 hover:border-emerald-500/30 transition">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded text-xs font-mono font-bold">
                                                {formattedDay}
                                            </div>
                                            <span className="text-sm text-slate-400">Total Faturado</span>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-400 font-mono">{formatMoney(value)}</span>
                                    </div>
                                )
                            })
                     )}
                </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}