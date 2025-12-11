// Caminho: src/react-app/components/booking/StepProfessional.tsx
import { useEffect, useState } from "react";
import type { User, Shop, Service } from "@/shared/types";
import { getProfessionalsByShop } from "@/react-app/lib/api/staff";

type StepProfessionalProps = {
  shop: Shop;
  service: Service;
  professional: User | null;
  onChange: (data: Partial<{ professional: User | null }>) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function StepProfessional({
  shop,
  service,
  professional,
  onChange,
  onBack,
  onNext,
}: StepProfessionalProps) {
  const [professionals, setProfessionals] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const list = await getProfessionalsByShop(shop.id);
      if (!cancelled) {
        setProfessionals(list);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [shop.id]);

  const handleSelect = (user: User) => {
    onChange({ professional: user });
  };

  if (loading) {
    return (
      <div className="py-10 text-sm text-slate-300 animate-pulse">
        Buscando profissionais disponíveis...
      </div>
    );
  }

  if (professionals.length === 0) {
    return (
      <div className="space-y-4">
        <div className="py-6 px-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
          Nenhum profissional disponível para atendimento nesta unidade no momento.
        </div>
        <button
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-white transition"
        >
          ← Voltar e escolher outro serviço
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white mb-2 transition flex items-center gap-1"
        >
          ← Voltar
        </button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">
          Passo 2 • Profissional
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Com quem você quer realizar este serviço?
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Serviço selecionado:{" "}
          <span className="font-medium text-emerald-300">{service.name}</span>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {professionals.map((p) => {
          const isSelected = professional?.id === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p)}
              className={[
                "relative w-full text-left rounded-2xl border px-4 py-4 transition group",
                "bg-slate-950/60 hover:bg-slate-900/80",
                "border-white/10 hover:border-emerald-400/50",
                isSelected
                  ? "ring-2 ring-emerald-400/80 border-emerald-400/80 bg-emerald-950/20"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                  }`}
                >
                  {p.avatar ? (
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    (p.name?.[0] || p.email[0] || "?").toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      isSelected ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {p.name || "Profissional sem nome"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {p.role === "dono" ? "Sócio / Profissional" : "Staff"}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={onNext}
          disabled={!professional}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          Ver horários disponíveis
          <span>⟶</span>
        </button>
      </div>
    </div>
  );
}