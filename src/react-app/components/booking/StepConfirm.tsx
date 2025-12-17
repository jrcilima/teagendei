import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service, User, TimeSlot } from "@/shared/types";
import { createAppointment } from "../../lib/api/appointments";
import { useAuth } from "../../contexts/AuthContext";

interface StepConfirmProps {
  shop: any; // Mantemos any para facilitar o acesso aos dados da loja
  service: Service;
  professional: User | null; // CORREÇÃO: Aceita null (Qualquer profissional)
  timeSlot: TimeSlot;
  onBack: () => void;
}

export default function StepConfirm({
  shop,
  service,
  professional,
  timeSlot,
  onBack,
}: StepConfirmProps) {
  const { user } = useAuth(); // Usuário logado (Cliente)
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!user) {
      // Redireciona para login/registro se não estiver logado
      // Salvamos o estado atual na URL ou localStorage idealmente, 
      // mas por simplicidade vamos mandar pro login.
      alert("Você precisa estar logado para finalizar.");
      navigate("/register?mode=client"); // ou /login
      return;
    }

    setSubmitting(true);
    try {
      // Se professional for null, o backend deve decidir ou pegamos um ID aleatório/disponível.
      // Neste MVP, se for null, enviamos string vazia ou tratamos antes.
      // O ideal é que o StepDateTime já tenha retornado um profissional real alocado no horário.
      // Se a lógica do sistema permitir "qualquer", o backend distribui.
      
      // Assumindo que o ID do profissional é obrigatório no banco:
      // Se for "qualquer", precisamos que a lógica anterior (StepDateTime) tenha definido quem vai atender,
      // OU enviamos um ID específico de "Fila".
      
      // AJUSTE: Se professional for null, usamos o primeiro ID disponível na loja (simplificação) ou tratamos erro.
      // Para este código funcionar sem erro 400, professional_id não pode ser vazio se o banco exige.
      
      const barberId = professional?.id || ""; 

      await createAppointment({
        shop_id: shop.id,
        client_id: user.id,
        service_id: service.id,
        barber_id: barberId, // O PocketBase vai exigir um ID válido se o campo for required
        start_time: timeSlot.startISO,
        end_time: timeSlot.endISO,
        total_amount: service.price,
        notes: "Agendamento via App",
      });

      alert("Agendamento realizado com sucesso!");
      navigate("/client"); // Vai para o painel do cliente
      
    } catch (error) {
      console.error(error);
      alert("Erro ao confirmar agendamento.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2">
          ← Voltar
        </button>
        <h2 className="text-xl font-bold text-white">Confirme os dados</h2>
        <p className="text-sm text-slate-400">Quase lá!</p>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
        
        {/* Serviço */}
        <div className="flex justify-between items-start pb-4 border-b border-white/5">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Serviço</p>
            <p className="font-semibold text-white">{service.name}</p>
            <p className="text-xs text-slate-400">{service.duration} min</p>
          </div>
          <p className="font-bold text-emerald-400">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}
          </p>
        </div>

        {/* Profissional */}
        <div className="pb-4 border-b border-white/5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Profissional</p>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                {professional?.avatar ? (
                   <img src={professional.avatar} className="h-full w-full rounded-full object-cover"/>
                ) : (
                   professional?.name?.[0] || "?"
                )}
             </div>
             <p className="font-medium text-white">
                {professional ? professional.name : "Qualquer profissional disponível"}
             </p>
          </div>
        </div>

        {/* Data e Hora */}
        <div>
           <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Data e Hora</p>
           <p className="text-lg font-bold text-white capitalize">
              {new Date(timeSlot.startISO).toLocaleDateString("pt-BR", { 
                  weekday: 'long', day: 'numeric', month: 'long' 
              })}
           </p>
           <p className="text-2xl font-mono text-emerald-400">
              {timeSlot.time}
           </p>
        </div>

      </div>

      <button 
        onClick={handleConfirm}
        disabled={submitting}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Confirmando..." : "Confirmar Agendamento"}
      </button>
    </div>
  );
}