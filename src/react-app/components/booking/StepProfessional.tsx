import { useEffect, useState } from "react";
import { User } from "@/shared/types";
import { getProfessionalsByShop } from "../../lib/api/staff";

interface StepProfessionalProps {
  shopId: string;
  serviceName: string;
  onSelect: (professional: User | null) => void;
  onBack: () => void;
}

export default function StepProfessional({ 
  shopId, 
  serviceName, 
  onSelect, 
  onBack 
}: StepProfessionalProps) {
  
  const [professionals, setProfessionals] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getProfessionalsByShop(shopId);
        if (isMounted) {
          setProfessionals(data);
        }
      } catch (error: any) {
        // CORREÇÃO: Ignora erro de auto-cancelamento
        if (error.status === 0 || error.isAbort) return;
        
        console.error("Erro ao carregar profissionais", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();

    return () => {
      isMounted = false;
    };
  }, [shopId]);

  if (loading) {
    return <div className="text-center p-8 text-slate-500">Carregando profissionais...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2">
          ← Voltar
        </button>
        <h2 className="text-xl font-bold text-white">Escolha o Profissional</h2>
        <p className="text-sm text-slate-400">
          Para realizar: <span className="text-emerald-400 font-medium">{serviceName}</span>
        </p>
      </div>

      <div className="grid gap-3">
        {/* OPÇÃO: QUALQUER PROFISSIONAL */}
        <button
          onClick={() => onSelect(null)}
          className="flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-white/5 hover:border-emerald-500/50 hover:bg-slate-800/80 transition group text-left"
        >
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 transition">
            🎲
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition">
              Qualquer profissional
            </h3>
            <p className="text-xs text-slate-500">Horários mais flexíveis</p>
          </div>
        </button>

        {/* LISTA DE PROFISSIONAIS */}
        {professionals.map((prof) => {
          const displayName = prof.name || "Profissional";
          const displayLetter = displayName.charAt(0).toUpperCase();

          return (
            <button
              key={prof.id}
              onClick={() => onSelect(prof)}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-emerald-500/50 hover:bg-slate-800 transition group text-left"
            >
              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition">
                {prof.avatar ? (
                  <img src={prof.avatar} alt={displayName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-slate-500 group-hover:text-white">
                    {displayLetter}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition">
                  {displayName}
                </h3>
                <p className="text-xs text-slate-500">Especialista</p>
              </div>
            </button>
          );
        })}

        {professionals.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">
            Nenhum profissional específico encontrado. Tente a opção acima.
          </p>
        )}
      </div>
    </div>
  );
}