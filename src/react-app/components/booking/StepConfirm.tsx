import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service, User, TimeSlot, PaymentMethod } from "@/shared/types";
import { createAppointment } from "../../lib/api/client";
import { useAuth } from "../../contexts/AuthContext";
import { pb } from "../../lib/api/pocketbase";

interface StepConfirmProps {
  shop: any; 
  service: Service;
  professional: User | null; 
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
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  // Busca métodos de pagamento
  useEffect(() => {
    let isMounted = true;
    async function loadPayments() {
        if (!shop?.accepted_payment_methods || shop.accepted_payment_methods.length === 0) return;
        
        try {
            const filterQuery = shop.accepted_payment_methods.map((id: string) => `id="${id}"`).join(" || ");
            if (filterQuery) {
                const methods = await pb.collection("payment_methods").getFullList<PaymentMethod>({
                    filter: filterQuery,
                    sort: "name"
                });
                if (isMounted) {
                    setPaymentMethods(methods);
                    if (methods.length > 0) setSelectedPayment(methods[0].id);
                }
            }
        } catch (err: any) {
            if (err.status === 0 || err.isAbort) return;
            console.error("Erro pagamentos", err);
        }
    }
    loadPayments();
    return () => { isMounted = false; };
  }, [shop]);

  const handleConfirm = async () => {
    if (!user) {
      alert("Você precisa estar logado para finalizar.");
      navigate("/register?mode=client");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Define quem é o profissional responsável
      // Se user escolheu 'Qualquer' (null), usamos o ID do dono da loja como fallback
      const finalBarberId = professional?.id || shop.owner_id;

      if (!finalBarberId) {
          throw new Error("Erro de configuração: A loja não possui um responsável padrão definido.");
      }

      // 2. Cria o agendamento
      await createAppointment({
        shop_id: shop.id,
        client_id: user.id,
        service_id: service.id,
        barber_id: finalBarberId,
        start_time: timeSlot.startISO,
        end_time: timeSlot.endISO,
        total_amount: service.price,
        payment_method: selectedPayment || undefined,
      });

      alert("Agendamento realizado com sucesso!");
      navigate("/client");
      
    } catch (err: any) {
      console.error("Erro ao agendar:", err);
      // Tratamento específico para erro 400 (Validação)
      if (err.status === 400) {
        // Tenta ler a resposta do servidor para ver qual campo falhou
        const data = err.data?.data || {};
        const fieldErrors = Object.keys(data).join(", ");
        setError(`Erro de validação nos campos: ${fieldErrors || "Dados inválidos"}.`);
      } else {
        setError(err.message || "Erro ao confirmar agendamento. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const dateDisplay = new Date(timeSlot.startISO).toLocaleDateString("pt-BR", { 
      weekday: 'long', day: 'numeric', month: 'long' 
  });
  
  const priceDisplay = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', currency: 'BRL' 
  }).format(service.price);

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
          <p className="font-bold text-emerald-400">{priceDisplay}</p>
        </div>

        {/* Profissional */}
        <div className="pb-4 border-b border-white/5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Profissional</p>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 overflow-hidden">
                {professional?.avatar ? (
                   <img src={professional.avatar} className="h-full w-full object-cover"/>
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
              {dateDisplay}
           </p>
           <p className="text-2xl font-mono text-emerald-400">
              {timeSlot.time}
           </p>
        </div>

      </div>

      {/* SELEÇÃO DE PAGAMENTO */}
      {paymentMethods.length > 0 && (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Como prefere pagar?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map(pm => (
                    <label 
                        key={pm.id} 
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition relative select-none
                        ${selectedPayment === pm.id 
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                            : "bg-black/20 border-white/5 hover:border-white/20 text-slate-400"}`}
                    >
                        <input 
                            type="radio" 
                            name="payment" 
                            value={pm.id} 
                            checked={selectedPayment === pm.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="w-4 h-4 accent-emerald-500"
                        />
                        <span className="font-medium">{pm.name}</span>
                    </label>
                ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
                * O pagamento será realizado no local.
            </p>
          </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

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