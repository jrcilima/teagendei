// Caminho: src/react-app/components/booking/StepService.tsx
import { useEffect, useState } from "react";
import type { Service, Shop } from "@/shared/types";
import { getServicesByShop } from "@/react-app/lib/api/services";

type StepServiceProps = {
  shop: Shop;
  service: Service | null;
  onChange: (data: Partial<{ service: Service | null }>) => void;
  onNext: () => void;
};

export default function StepService({
  shop,
  service,
  onChange,
  onNext,
}: StepServiceProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formatação de preço em BRL
  const formatPrice = (value: number | null | undefined): string => {
    if (value == null) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const list = await getServicesByShop(shop.id);
        if (!cancelled) {
          setServices(list);
        }
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          setError(
            err?.message ||
              "Não foi possível carregar os serviços desta unidade."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [shop.id]);

  const handleSelect = (s: Service) => {
    onChange({ service: s });
  };

  const handleNext = () => {
    if (!service) return;
    onNext();
  };

  // ESTADOS

  if (loading) {
    return (
      <div className="py-10 text-sm text-slate-300">
        Carregando serviços da unidade <strong>{shop.name}</strong>...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 rounded-2xl border border-red-500/40 bg-red-500/5 px-4 text-sm text-red-100">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-10 text-sm text-slate-300">
        Nenhum serviço está cadastrado ou ativo para esta unidade.
        <br />
        <span className="text-slate-500 text-xs">
          O dono precisa configurar os serviços no painel antes de liberar o
          agendamento público.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">
          Passo 1 • Serviço
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Escolha o serviço que você deseja agendar
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Unidade:{" "}
          <span className="font-medium text-emerald-300">{shop.name}</span>
        </p>
      </div>

      {/* Lista de serviços */}
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((s) => {
          const isSelected = service?.id === s.id;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s)}
              className={[
                "w-full text-left rounded-2xl border px-4 py-3.5 transition shadow-sm",
                "bg-slate-950/60 hover:bg-slate-900/80",
                "border-white/10 hover:border-emerald-400/70",
                isSelected
                  ? "ring-2 ring-emerald-400/80 border-emerald-400/80 shadow-emerald-500/30"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-50">
                      {s.name}
                    </span>
                    {s.duration != null && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                        {s.duration} min
                      </span>
                    )}
                  </div>

                  {s.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-sm font-semibold text-emerald-300">
                    {formatPrice(s.price)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Rodapé do passo */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
        <span>
          Selecione um serviço para avançar para a escolha do profissional.
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!service}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-xs md:text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Avançar
          <span className="text-base">⟶</span>
        </button>
      </div>
    </div>
  );
}
