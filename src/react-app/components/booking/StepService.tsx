import { useEffect, useState } from "react";
import { Service } from "@/shared/types";
import { getServicesByShop } from "../../lib/api/services";

interface StepServiceProps {
  shopId: string;
  onSelect: (service: Service) => void;
}

export default function StepService({ shopId, onSelect }: StepServiceProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getServicesByShop(shopId);
        if (isMounted) {
          setServices(data);
        }
      } catch (error: any) {
        // CORREÇÃO: Ignora erro de auto-cancelamento (status 0 ou isAbort)
        if (error.status === 0 || error.isAbort) return;

        console.error("Erro ao carregar serviços", error);
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
    return <div className="text-center p-8 text-slate-500">Carregando serviços...</div>;
  }

  // Agrupar serviços por categoria
  const groupedServices = services.reduce((acc, service) => {
    const catName = (service as any).expand?.category_id?.name || "Geral";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold text-white">Selecione o Serviço</h2>
        <p className="text-sm text-slate-400">O que vamos fazer hoje?</p>
      </div>

      {services.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-slate-500">
          Nenhum serviço disponível nesta unidade.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedServices).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 px-1">
                {category}
              </h3>
              <div className="grid gap-3">
                {items.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => onSelect(service)}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-emerald-500/50 hover:bg-slate-800 transition group w-full text-left"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition">
                        {service.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {service.duration} min
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(service.price)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}