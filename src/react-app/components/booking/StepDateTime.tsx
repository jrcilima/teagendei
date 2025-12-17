import { useEffect, useState } from "react";
import type { Shop, Service, User, TimeSlot, ShopHour } from "@/shared/types";
import { getShopHours, getProfessionalAppointments } from "@/react-app/lib/api/availability";
import { getProfessionalsByShop } from "@/react-app/lib/api/staff";
import { generateSlots } from "@/react-app/lib/utils/slots";

type Props = {
  shop: Shop;
  service: Service;
  professional: User | null;
  onBack: () => void;
  onSelect: (slot: TimeSlot) => void;
};

export default function StepDateTime({ shop, service, professional, onBack, onSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>(""); // YYYY-MM-DD
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [shopHours, setShopHours] = useState<ShopHour[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  
  // Estado para resolver o "Qualquer Profissional"
  const [effectiveProfessional, setEffectiveProfessional] = useState<User | null>(professional);

  // 1. Inicialização: Horários da Loja + Resolver Profissional
  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const hours = await getShopHours(shop.id);
        if (isMounted) setShopHours(hours);
      } catch (err: any) {
        if (err.status !== 0 && !err.isAbort) {
            console.error("Erro ao buscar horários:", err);
        }
      }

      if (isMounted) {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
      }

      // Se professional for null, buscamos um default da loja
      if (!professional) {
        try {
          const profs = await getProfessionalsByShop(shop.id);
          if (isMounted && profs.length > 0) {
            setEffectiveProfessional(profs[0]);
          }
        } catch (err: any) {
           if (err.status !== 0 && !err.isAbort) console.error(err);
        }
      } else {
        if (isMounted) setEffectiveProfessional(professional);
      }
    }

    init();

    return () => { isMounted = false; };
  }, [shop.id, professional]);

  // 2. Quando muda a data ou o profissional efetivo, recalcula slots
  useEffect(() => {
    if (!selectedDate || shopHours.length === 0 || !effectiveProfessional) return;

    let isMounted = true;

    async function loadSlots() {
      setLoading(true);
      try {
        const appointments = await getProfessionalAppointments(effectiveProfessional!.id, selectedDate);
        
        if (!isMounted) return;

        const generated = generateSlots(
          selectedDate,
          service.duration,
          shopHours,
          appointments
        );
        
        setSlots(generated);
      } catch (err: any) {
        // Ignora cancelamento
        if (err.status === 0 || err.isAbort) return;
        console.error("Erro ao gerar slots", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSlots();

    return () => { isMounted = false; };
  }, [selectedDate, shopHours, effectiveProfessional, service.duration]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2 transition flex items-center gap-1">← Voltar</button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">Passo 3 • Data e Hora</p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">Quando será o atendimento?</h2>
        <p className="text-sm text-slate-300 mt-1">
          Profissional: <span className="text-emerald-300">{professional ? professional.name : "Qualquer profissional"}</span> • Duração: {service.duration} min
        </p>
      </div>

      {/* Seletor de Data */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Selecione o dia</label>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null);
          }}
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 color-scheme-dark"
        />
      </div>

      {/* Grid de Horários */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Horários disponíveis</label>
        
        {!effectiveProfessional ? (
           <div className="py-8 text-center text-slate-500 text-sm">Carregando disponibilidade...</div>
        ) : loading ? (
          <div className="py-8 text-center text-slate-500 text-sm animate-pulse">Calculando agenda...</div>
        ) : slots.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm bg-slate-950/30 rounded-xl border border-white/5">
            Nenhum horário disponível nesta data.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.isAvailable}
                onClick={() => setSelectedSlot(slot)}
                className={`
                  py-2 px-1 rounded-lg text-sm font-medium transition relative
                  ${!slot.isAvailable 
                    ? "bg-slate-800/30 text-slate-600 cursor-not-allowed" 
                    : selectedSlot?.time === slot.time
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105 z-10"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/5">
        <button
          onClick={() => selectedSlot && onSelect(selectedSlot)}
          disabled={!selectedSlot}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          Confirmar Horário
          <span>⟶</span>
        </button>
      </div>
    </div>
  );
}