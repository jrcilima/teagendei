import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopBySlug } from "../../lib/api/register"; 
import StepService from "../../components/booking/StepService";
import StepProfessional from "../../components/booking/StepProfessional";
import StepDateTime from "../../components/booking/StepDateTime";
import StepConfirm from "../../components/booking/StepConfirm";
import { Service, User, TimeSlot } from "@/shared/types";

export default function BookPage() {
  const { slug } = useParams();
  
  // Dados da Loja
  const [shop, setShop] = useState<any>(null); // any para aceitar o expand sem erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do Wizard
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<User | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

  // Carrega dados da loja pelo Slug
  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!slug) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getShopBySlug(slug);
        
        if (!isMounted) return;

        if (!data) {
          setError("Unidade não encontrada ou link inválido.");
        } else {
          setShop(data);
        }
      } catch (err: any) {
        if (!isMounted) return;

        // Ignora erro de auto-cancelamento
        if (err.status === 0 || err.isAbort) return;

        console.error("Erro ao carregar loja:", err);
        setError("Não foi possível carregar os dados da unidade.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // --- NAVEGAÇÃO DO WIZARD ---

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleProfessionalSelect = (prof: User | null) => {
    setSelectedProfessional(prof);
    setStep(3);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTime(slot);
    setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 p-4">
        <div className="text-4xl mb-4">😕</div>
        <p>{error || "Loja não encontrada."}</p>
        <a href="/login" className="mt-4 text-emerald-400 hover:underline">Voltar ao início</a>
      </div>
    );
  }

  // Nome da empresa vindo do expand ou fallback
  const companyName = shop.expand?.company_id?.fantasy_name || shop.expand?.company_id?.legal_name || "Empresa";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      
      {/* Header Simples */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-sm font-bold text-white">{shop.name}</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{companyName}</p>
        </div>
        <div className="text-xs text-slate-500">
          Passo {step} de 4
        </div>
      </header>

      {/* Conteúdo do Passo */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 md:py-8">
        
        {step === 1 && (
          <StepService 
            shopId={shop.id} 
            onSelect={handleServiceSelect} 
          />
        )}

        {step === 2 && selectedService && (
          <StepProfessional 
            shopId={shop.id}
            serviceName={selectedService.name} 
            onSelect={handleProfessionalSelect}
            onBack={handleBack}
          />
        )}

        {step === 3 && selectedService && (
          <StepDateTime 
            shop={shop}                         // CORREÇÃO: Passa objeto shop
            service={selectedService}           // CORREÇÃO: Passa objeto service
            professional={selectedProfessional} // CORREÇÃO: Passa objeto user | null
            onSelect={handleTimeSelect}
            onBack={handleBack}
          />
        )}

        {step === 4 && selectedService && selectedTime && (
          <StepConfirm 
            shop={shop}
            service={selectedService}
            professional={selectedProfessional}
            timeSlot={selectedTime}
            onBack={handleBack}
          />
        )}

      </main>
    </div>
  );
}