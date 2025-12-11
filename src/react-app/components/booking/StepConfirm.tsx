// Caminho: src/react-app/components/booking/StepConfirm.tsx
import { useState } from "react";
import type { Shop, Service, User } from "@/shared/types";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { createAppointment } from "@/react-app/lib/api/appointments";
import { useNavigate } from "react-router-dom";

type Props = {
  shop: Shop;
  service: Service;
  professional: User;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  onBack: () => void;
};

export default function StepConfirm({ shop, service, professional, date, time, onBack }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formatar data para exibição amigável
  const dateDisplay = new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Calcular horário de término estimado
  function calculateEndTime() {
    const [h, m] = time.split(":").map(Number);
    const dateObj = new Date();
    dateObj.setHours(h, m + service.duration);
    return dateObj.toTimeString().slice(0, 5);
  }

  const endTime = calculateEndTime();

  async function handleConfirm() {
    // Validação de login: O cliente precisa estar logado para agendar?
    // Se sim, aqui verificamos. Se não, precisaríamos de um form de "Guest".
    // Pelo contexto atual, vamos assumir que ele precisa estar logado (ClientPanelPage existe).
    
    if (!user) {
      // Redirecionar para login salvando o estado seria o ideal, 
      // mas por simplicidade vamos pedir login.
      alert("Você precisa fazer login ou criar conta para finalizar.");
      navigate("/login"); 
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Montar data ISO completa para o banco
      const startIso = `${date} ${time}:00`;
      
      // Calcular end_time ISO (opcional, mas bom ter)
      // Simplificação: apenas string para o PB aceitar, idealmente calcularia real
      
      await createAppointment({
        shop_id: shop.id,
        service_id: service.id,
        barber_id: professional.id,
        client_id: user.id,
        start_time: startIso,
        total_amount: service.price,
        notes: "Agendamento via App"
      });

      // Sucesso! Redirecionar para painel do cliente
      navigate("/client");
      
    } catch (err: any) {
      console.error(err);
      setError("Erro ao confirmar agendamento. Tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2 transition">← Voltar</button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">Passo 4 • Confirmação</p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">Confira os detalhes</h2>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5 space-y-4 text-sm">
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Serviço</span>
          <span className="font-medium text-white">{service.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Profissional</span>
          <span className="font-medium text-white">{professional.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Data</span>
          <span className="font-medium text-white capitalize">{dateDisplay}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Horário</span>
          <span className="font-medium text-emerald-400">{time} - {endTime}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-400">Valor Total</span>
          <span className="font-bold text-lg text-white">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.price)}
          </span>
        </div>
      </div>

      {!user && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-xs text-yellow-200">
          Você precisará fazer login na próxima etapa para confirmar.
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-xs text-red-200">
          {error}
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={submitting}
        className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Confirmando..." : "Confirmar Agendamento"}
      </button>
    </div>
  );
}