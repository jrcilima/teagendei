import { useEffect, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { getStaffAppointmentsToday, updateAppointmentStatus } from "@/react-app/lib/api/appointments";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/shared/types";

// Helper: Formata hora (14:30)
const formatTime = (isoString: string) => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

// Helper: Formata dinheiro (R$ 50,00)
const formatMoney = (val: number) => 
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export default function StaffAgendaPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega ao montar ou mudar usuário
  useEffect(() => {
    loadAgenda();
    
    // Auto-refresh a cada 60 segundos para pegar novos agendamentos
    const interval = setInterval(loadAgenda, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  async function loadAgenda() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getStaffAppointmentsToday(user.id);
      setAppointments(data);
    } catch (err) {
      console.error("Erro ao carregar agenda", err);
    } finally {
      setLoading(false);
    }
  }

  // Lógica de atualização de status
  async function handleStatusChange(id: string, newStatus: AppointmentStatus, payStatus?: PaymentStatus) {
    // 1. Atualização Otimista (Muda na tela antes de ir pro servidor para parecer instantâneo)
    setAppointments(prev => prev.map(appt => 
      appt.id === id ? { ...appt, status: newStatus, payment_status: payStatus || appt.payment_status } : appt
    ));

    try {
      // 2. Envia pro servidor
      await updateAppointmentStatus(id, newStatus, payStatus);
    } catch (err) {
      console.error("Erro ao atualizar status", err);
      alert("Erro ao atualizar o agendamento. Recarregando...");
      loadAgenda(); // Reverte se der erro
    }
  }

  // --- RENDER ---

  if (loading && appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
        <p>Sincronizando agenda...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      
      {/* Cabeçalho da Agenda */}
      <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Minha Agenda</h1>
          <p className="text-slate-400 text-xs md:text-sm capitalize">
            {new Date().toLocaleDateString("pt-BR", { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <button 
          onClick={loadAgenda} 
          className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-300 transition border border-white/5 shadow-lg"
          title="Atualizar agora"
        >
          🔄
        </button>
      </div>

      {/* Lista Vazia */}
      {appointments.length === 0 ? (
        <div className="text-center py-20 px-6 bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
          <div className="text-5xl mb-4 grayscale opacity-50">☕</div>
          <h3 className="text-lg font-medium text-white">Agenda livre hoje</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
            Nenhum agendamento encontrado para hoje até o momento. Aproveite para descansar ou organizar o espaço.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt: any) => {
            // Extração segura dos dados expandidos
            const clientName = appt.expand?.client_id?.name || "Cliente (Sem nome)";
            const serviceName = appt.expand?.service_id?.name || "Serviço";
            const status = appt.status as AppointmentStatus;
            
            // Estilos dinâmicos baseados no status
            let statusColor = "border-slate-600";
            let bgColor = "bg-slate-900";
            let opacity = "opacity-100";
            
            if (status === AppointmentStatus.Confirmed || status === AppointmentStatus.Pending) { // Confirmado (2) ou Pendente (1)
               statusColor = "border-sky-500";
            } else if (status === AppointmentStatus.InProgress) { // Em andamento (3)
               statusColor = "border-amber-500";
               bgColor = "bg-slate-800 ring-1 ring-amber-500/30";
            } else if (status === AppointmentStatus.Completed) { // Concluído (4)
               statusColor = "border-emerald-500";
               opacity = "opacity-60 hover:opacity-100 transition-opacity";
            }

            return (
              <div key={appt.id} className={`relative flex flex-col md:flex-row gap-4 p-5 rounded-2xl border-l-4 shadow-lg ${statusColor} ${bgColor} ${opacity} border-y border-r border-white/5`}>
                
                {/* Coluna 1: Horário e Status Visual */}
                <div className="flex md:flex-col items-center md:items-start justify-between min-w-[80px] gap-2">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {formatTime(appt.start_time)}
                  </span>
                  
                  {status === AppointmentStatus.InProgress && (
                    <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full animate-pulse border border-amber-500/30">
                      Andamento
                    </span>
                  )}
                  {status === AppointmentStatus.Completed && (
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-500/30">
                      Concluído
                    </span>
                  )}
                  {(status === AppointmentStatus.Confirmed || status === AppointmentStatus.Pending) && (
                    <span className="text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 px-2 py-1 rounded-full border border-sky-500/30">
                      Agendado
                    </span>
                  )}
                </div>

                {/* Coluna 2: Detalhes do Cliente/Serviço */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
                  <h3 className="text-lg font-semibold text-slate-100">{clientName}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                    <span className="text-emerald-400 font-medium">{serviceName}</span>
                    {appt.notes && (
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-xs text-slate-300 truncate max-w-[200px]">
                            Nota: {appt.notes}
                        </span>
                    )}
                  </div>
                </div>

                {/* Coluna 3: Ações e Pagamento */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-lg font-bold text-white">
                      {formatMoney(appt.total_amount || 0)}
                    </p>
                    <p className={`text-xs font-medium ${appt.payment_status === PaymentStatus.PAGO ? "text-emerald-400" : "text-amber-400"}`}>
                      {appt.payment_status === PaymentStatus.PAGO ? "Pago ✅" : "Pendente ⏳"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* Botões para Agendado */}
                    {(status === AppointmentStatus.Pending || status === AppointmentStatus.Confirmed) && (
                      <>
                        <button 
                          onClick={() => {
                              if(confirm("Cancelar este agendamento?")) 
                                handleStatusChange(appt.id, AppointmentStatus.Cancelled)
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 text-xs font-medium transition"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={() => handleStatusChange(appt.id, AppointmentStatus.InProgress)}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition transform active:scale-95"
                        >
                          Iniciar Atendimento
                        </button>
                      </>
                    )}

                    {/* Botões para Em Andamento */}
                    {status === AppointmentStatus.InProgress && (
                      <button 
                        onClick={() => handleStatusChange(appt.id, AppointmentStatus.Completed, PaymentStatus.PAGO)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition transform active:scale-95 flex items-center gap-2"
                      >
                        <span>Finalizar & Receber</span>
                      </button>
                    )}

                    {/* Botões para Concluído */}
                    {status === AppointmentStatus.Completed && (
                       <button 
                          onClick={() => {
                              if(confirm("Reabrir este atendimento?"))
                                handleStatusChange(appt.id, AppointmentStatus.Confirmed, PaymentStatus.A_PAGAR)
                          }}
                          className="text-xs text-slate-600 hover:text-slate-400 underline"
                        >
                          Reabrir
                        </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}