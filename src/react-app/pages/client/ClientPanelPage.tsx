import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { getMyAppointments, cancelMyAppointment } from "@/react-app/lib/api/client";
import { Appointment, AppointmentStatus } from "@/shared/types";

// Helpers visuais
const getStatusLabel = (status: string) => {
  switch (status) {
    case AppointmentStatus.Pending: return { text: "Pendente", color: "bg-yellow-500/20 text-yellow-400" };
    case AppointmentStatus.Confirmed: return { text: "Confirmado", color: "bg-sky-500/20 text-sky-400" };
    case AppointmentStatus.InProgress: return { text: "Em Andamento", color: "bg-purple-500/20 text-purple-400" };
    case AppointmentStatus.Completed: return { text: "Concluído", color: "bg-emerald-500/20 text-emerald-400" };
    case AppointmentStatus.Cancelled: return { text: "Cancelado", color: "bg-red-500/20 text-red-400" };
    default: return { text: "Outro", color: "bg-slate-700 text-slate-300" };
  }
};

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString("pt-BR", { 
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" 
  });
};

export default function ClientPanelPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.id]);

  async function loadData() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getMyAppointments(user.id);
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id: string) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;
    try {
      await cancelMyAppointment(id);
      loadData(); // Recarrega a lista
    } catch (error) {
      alert("Erro ao cancelar.");
    }
  }

  // Separar futuros e passados
  const now = new Date();
  const upcoming = appointments.filter(a => new Date(a.start_time) >= now && a.status !== AppointmentStatus.Cancelled);
  const history = appointments.filter(a => new Date(a.start_time) < now || a.status === AppointmentStatus.Cancelled);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white">Meus Agendamentos</h1>
            <p className="text-sm text-slate-400">Gerencie seus horários marcados.</p>
          </div>
          {/* Opcional: Link para voltar a agendar se tiver slug salvo, senão home */}
          <Link to="/" className="text-xs bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl hover:bg-emerald-500/20 transition">
            Novo Agendamento
          </Link>
        </div>

        {/* PRÓXIMOS */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 border-l-4 border-emerald-500 pl-3">Próximos</h2>
          {upcoming.length === 0 ? (
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 text-center text-slate-500 text-sm">
              Você não tem agendamentos futuros.
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((appt: any) => {
                const shopName = appt.expand?.shop_id?.name || "Loja";
                const serviceName = appt.expand?.service_id?.name || "Serviço";
                const barberName = appt.expand?.barber_id?.name || "Profissional";
                const { text, color } = getStatusLabel(appt.status);

                return (
                  <div key={appt.id} className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 transition hover:border-emerald-500/30">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${color}`}>
                          {text}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {formatDate(appt.start_time)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{serviceName}</h3>
                      <p className="text-sm text-slate-400">{shopName} • com {barberName}</p>
                    </div>

                    <div className="flex items-center">
                      {(appt.status === AppointmentStatus.Pending || appt.status === AppointmentStatus.Confirmed) && (
                        <button 
                          onClick={() => handleCancel(appt.id)}
                          className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-4 py-2 rounded-xl hover:bg-red-500/10 transition w-full sm:w-auto"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* HISTÓRICO */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 border-l-4 border-slate-600 pl-3">Histórico</h2>
          <div className="space-y-3 opacity-75">
            {history.map((appt: any) => {
               const shopName = appt.expand?.shop_id?.name;
               const serviceName = appt.expand?.service_id?.name;
               const { text, color } = getStatusLabel(appt.status);

               return (
                 <div key={appt.id} className="bg-slate-900/30 border border-white/5 rounded-xl p-4 flex justify-between items-center">
                    <div>
                       <p className="text-sm font-medium text-slate-300">{serviceName}</p>
                       <p className="text-xs text-slate-500">{shopName} • {formatDate(appt.start_time)}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded ${color}`}>{text}</span>
                 </div>
               );
            })}
            {history.length === 0 && (
                <p className="text-xs text-slate-600">Nenhum histórico disponível.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
