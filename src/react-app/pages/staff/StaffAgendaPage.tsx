import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { getStaffAppointmentsByDate, updateAppointmentStatus } from "@/react-app/lib/api/appointments";
import { getPaymentMethods } from "@/react-app/lib/api/shops"; 
import { Appointment, AppointmentStatus, PaymentStatus, PaymentMethod } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal"; 

// Helper Time Visual
const formatTime = (isoString: string) => {
  if (!isoString) return "--:--";
  return isoString.substring(11, 16);
};

// Helper Money
const formatMoney = (val: number) => 
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export default function StaffAgendaPage() {
  const { user } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Estados do Modal de Finalização ---
  const [isFinishModalOpen, setFinishModalOpen] = useState(false);
  const [apptToFinish, setApptToFinish] = useState<Appointment | null>(null);
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([]);
  const [finalPaymentMethod, setFinalPaymentMethod] = useState("");
  const [finishing, setFinishing] = useState(false);

  // Carrega Agendamentos
  useEffect(() => {
    let isMounted = true;

    async function loadAgenda() {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getStaffAppointmentsByDate(user.id, selectedDate);
        if (isMounted) {
          setAppointments(data);
        }
      } catch (err: any) {
        if (err.status === 0 || err.isAbort) return;
        console.error("Erro ao carregar agenda", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAgenda();

    // Carrega métodos de pagamento
    if (user?.company_id) {
        getPaymentMethods(user.company_id).then(methods => {
            if(isMounted) setAvailableMethods(methods);
        }).catch(err => {
            if (err.status !== 0) console.error("Erro pagamentos", err);
        });
    }
    
    // Auto-refresh a cada 1 min
    const interval = setInterval(() => { if(isMounted) loadAgenda(); }, 60000);
    return () => { isMounted = false; clearInterval(interval); };
  }, [user?.id, selectedDate, user?.company_id]);


  // --- CÁLCULOS DO DASHBOARD (KPIS DIÁRIOS) ---
  const dailyStats = useMemo(() => {
    const totalCount = appointments.filter(a => a.status !== AppointmentStatus.Cancelled).length;
    
    const totalRevenue = appointments
        .filter(a => a.status !== AppointmentStatus.Cancelled)
        .reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
        
    const completedCount = appointments.filter(a => a.status === AppointmentStatus.Completed).length;

    return { totalCount, totalRevenue, completedCount };
  }, [appointments]);


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

  // Alteração Simples de Status
  async function handleStatusChange(id: string, newStatus: AppointmentStatus) {
    setAppointments(prev => prev.map(appt => 
      appt.id === id ? { ...appt, status: newStatus } : appt
    ));
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (err) {
      alert("Erro ao atualizar. Recarregando...");
      // Recarrega em caso de erro
      const data = await getStaffAppointmentsByDate(user!.id, selectedDate);
      setAppointments(data);
    }
  }

  // --- Fluxo de Finalização com Pagamento ---
  const openFinishModal = (appt: Appointment) => {
    setApptToFinish(appt);
    setFinalPaymentMethod(appt.payment_method || (availableMethods[0]?.id || ""));
    setFinishModalOpen(true);
  };

  const handleConfirmFinish = async () => {
    if (!apptToFinish) return;
    setFinishing(true);
    try {
        await updateAppointmentStatus(
            apptToFinish.id, 
            AppointmentStatus.Completed, 
            PaymentStatus.PAGO, 
            finalPaymentMethod
        );

        setAppointments(prev => prev.map(appt => 
            appt.id === apptToFinish.id ? { 
                ...appt, 
                status: AppointmentStatus.Completed, 
                payment_status: PaymentStatus.PAGO,
                payment_method: finalPaymentMethod,
                expand: {
                   ...appt.expand,
                   payment_method: availableMethods.find(m => m.id === finalPaymentMethod)
                }
            } : appt
        ));

        setFinishModalOpen(false);
        setApptToFinish(null);
    } catch (error) {
        alert("Erro ao finalizar atendimento.");
    } finally {
        setFinishing(false);
    }
  };

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

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER PESSOAL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white mb-1">Olá, {user?.name?.split(' ')[0]} 👋</h1>
           <p className="text-slate-400">Aqui está sua programação de hoje.</p>
        </div>
        
        {/* Seletor de Data Estilizado */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-white/10 shadow-lg">
            <button onClick={handlePrevDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">←</button>
            <div className="px-2 text-center">
                <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">{isToday ? "Hoje" : "Data"}</span>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 cursor-pointer p-0 w-24 text-center [&::-webkit-calendar-picker-indicator]:hidden"
                />
            </div>
            <button onClick={handleNextDay} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">→</button>
        </div>
      </div>

      {/* CARDS DE RESUMO DO DIA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl flex flex-col justify-between h-28">
             <div className="text-indigo-400 text-sm font-medium">Agendamentos</div>
             <div className="text-3xl font-bold text-white">{dailyStats.totalCount}</div>
          </div>
          <div className="bg-emerald-600/10 border border-emerald-500/20 p-4 rounded-2xl flex flex-col justify-between h-28">
             <div className="text-emerald-400 text-sm font-medium">Faturamento do Dia</div>
             <div className="text-2xl font-bold text-white">{formatMoney(dailyStats.totalRevenue)}</div>
          </div>
          <div className="bg-slate-800/50 border border-white/5 p-4 rounded-2xl flex flex-col justify-between h-28 col-span-2 md:col-span-2">
             <div className="text-slate-400 text-sm font-medium">Progresso</div>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                 <div 
                    className="bg-indigo-500 h-full transition-all duration-500" 
                    style={{ width: `${dailyStats.totalCount > 0 ? (dailyStats.completedCount / dailyStats.totalCount) * 100 : 0}%` }}
                 />
             </div>
             <div className="text-xs text-slate-500 mt-2 text-right">
                {dailyStats.completedCount} de {dailyStats.totalCount} finalizados
             </div>
          </div>
      </div>

      <div className="h-px bg-white/5 w-full my-6"></div>

      <h2 className="text-xl font-bold text-white flex items-center gap-2">
         Agenda <span className="text-slate-500 text-base font-normal capitalize">({displayDate})</span>
      </h2>

      {/* LISTA TIMELINE */}
      {loading ? (
        <div className="flex justify-center py-20 text-slate-500">Carregando agenda...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16 px-6 bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
          <p className="text-slate-400 text-lg">Livre! 🎉</p>
          <p className="text-sm text-slate-500">Nenhum agendamento para este dia.</p>
        </div>
      ) : (
        <div className="relative border-l border-white/10 ml-4 space-y-8">
          {appointments.map((appt: any) => {
            const clientName = appt.expand?.client_id?.name || "Cliente";
            const serviceName = appt.expand?.service_id?.name || "Serviço";
            const paymentName = appt.expand?.payment_method?.name || (appt.payment_method ? "Pagamento Definido" : "Não escolhido");
            const status = appt.status;
            
            // Estilos dinâmicos
            const isCompleted = status === AppointmentStatus.Completed;
            const isCancelled = status === AppointmentStatus.Cancelled;
            const isInProgress = status === AppointmentStatus.InProgress;

            let cardBg = "bg-slate-900";
            let borderColor = "border-white/5";
            let timeColor = "text-slate-400";

            if (isInProgress) {
                cardBg = "bg-indigo-900/20";
                borderColor = "border-indigo-500/50";
                timeColor = "text-indigo-400";
            } else if (isCompleted) {
                cardBg = "bg-emerald-900/10";
                borderColor = "border-emerald-500/20";
                timeColor = "text-emerald-500";
            }

            return (
              <div key={appt.id} className="relative pl-8">
                {/* Bolinha da Timeline */}
                <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${isInProgress ? 'bg-indigo-500 animate-pulse' : isCompleted ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                
                <div className={`p-5 rounded-2xl border ${borderColor} ${cardBg} transition hover:border-white/10 ${isCancelled ? 'opacity-50 grayscale' : ''}`}>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        
                        {/* Info Principal */}
                        <div>
                            <div className={`text-sm font-bold font-mono mb-1 ${timeColor}`}>{formatTime(appt.start_time)}</div>
                            <h3 className="text-lg font-bold text-slate-100">{clientName}</h3>
                            <p className="text-slate-400 text-sm">{serviceName}</p>
                            
                            {/* Tags */}
                            <div className="flex gap-2 mt-3">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-white/5 uppercase tracking-wide">
                                    {paymentName}
                                </span>
                                {isCancelled && <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/20 uppercase">Cancelado</span>}
                                {isCompleted && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 uppercase">Concluído</span>}
                            </div>
                        </div>

                        {/* Ações e Valor */}
                        <div className="flex flex-col justify-between items-end gap-4">
                            <p className="text-xl font-bold text-white">{formatMoney(appt.total_amount || 0)}</p>
                            
                            <div className="flex gap-2">
                                {!isCancelled && !isCompleted && (
                                    <>
                                        {status !== AppointmentStatus.InProgress && (
                                            <button 
                                                onClick={() => { if(confirm("Cancelar?")) handleStatusChange(appt.id, AppointmentStatus.Cancelled) }}
                                                className="px-3 py-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 text-xs font-medium transition"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                        
                                        {status === AppointmentStatus.Pending || status === AppointmentStatus.Confirmed ? (
                                            <button 
                                                onClick={() => handleStatusChange(appt.id, AppointmentStatus.InProgress)}
                                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition"
                                            >
                                                Iniciar Atendimento
                                            </button>
                                        ) : status === AppointmentStatus.InProgress ? (
                                            <button 
                                                onClick={() => openFinishModal(appt)}
                                                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition animate-pulse"
                                            >
                                                Finalizar & Receber
                                            </button>
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE FINALIZAÇÃO */}
      <Modal 
        isOpen={isFinishModalOpen} 
        onClose={() => setFinishModalOpen(false)} 
        title="Finalizar Atendimento"
      >
        <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl text-center border border-white/5">
                <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Valor a Receber</p>
                <p className="text-4xl font-bold text-emerald-400">
                    {formatMoney(apptToFinish?.total_amount || 0)}
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Como o cliente pagou?</label>
                {availableMethods.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">Nenhum método cadastrado na loja.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {availableMethods.map(method => (
                            <button
                                key={method.id}
                                onClick={() => setFinalPaymentMethod(method.id)}
                                className={`p-3 rounded-xl text-sm font-medium border transition flex items-center justify-center gap-2
                                    ${finalPaymentMethod === method.id 
                                        ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20" 
                                        : "bg-slate-900 border-white/10 text-slate-400 hover:bg-slate-800 hover:text-white"}
                                `}
                            >
                                {method.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button 
                onClick={handleConfirmFinish}
                disabled={finishing || !finalPaymentMethod}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
                {finishing ? "Processando..." : "Confirmar Recebimento 💰"}
            </button>
        </div>
      </Modal>

    </div>
  );
}