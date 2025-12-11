// Caminho: src/react-app/pages/booking/BookPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopBySlug } from "@/react-app/lib/api/register";
import type { Shop, Service, User } from "@/shared/types";

// Import dos passos (Steps)
import StepService from "@/react-app/components/booking/StepService";
import StepProfessional from "@/react-app/components/booking/StepProfessional";
import StepDateTime from "@/react-app/components/booking/StepDateTime";
import StepConfirm from "@/react-app/components/booking/StepConfirm";

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();

  // Estados Globais do Agendamento
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do Wizard (Passo a Passo)
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // 1. Carrega a Loja pelo Slug ao abrir a página
  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getShopBySlug(slug);
        if (!data) {
          setError("Unidade não encontrada ou endereço incorreto.");
        } else {
          setShop(data);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar a unidade. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // Renderização de Erro/Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="animate-pulse">Carregando agendamento...</div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-red-400 mb-2">● Unidade não localizada</div>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  // Renderização do Wizard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-6 px-4 md:py-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Cabeçalho da Loja */}
        <div className="mb-8 text-center space-y-2">
          {shop.logo && (
             <img src={shop.logo} alt="Logo" className="w-16 h-16 mx-auto rounded-full object-cover bg-slate-800" />
          )}
          <h1 className="text-2xl md:text-3xl font-bold">{shop.name}</h1>
          <p className="text-slate-400 text-sm">{shop.address || "Endereço não informado"}</p>
        </div>

        {/* Área do Conteúdo (Passos) */}
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
          
          {/* PASSO 1: SERVIÇO */}
          {step === 1 && (
            <StepService
              shop={shop}
              service={selectedService}
              onChange={(data) => {
                if (data.service !== undefined) setSelectedService(data.service);
              }}
              onNext={() => setStep(2)}
            />
          )}

          {/* PASSO 2: PROFISSIONAL */}
          {step === 2 && selectedService && (
            <StepProfessional
              shop={shop}
              service={selectedService}
              professional={selectedProfessional}
              onChange={(data) => {
                if (data.professional !== undefined) setSelectedProfessional(data.professional);
              }}
              onBack={() => setStep(1)}
              onNext={() => {
                setStep(3);
              }}
            />
          )}

          {/* PASSO 3: DATA E HORA */}
          {step === 3 && selectedService && selectedProfessional && (
            <StepDateTime
              shop={shop}
              service={selectedService}
              professional={selectedProfessional}
              onBack={() => setStep(2)}
              onNext={(date, time) => {
                setSelectedDate(date);
                setSelectedTime(time);
                setStep(4); 
              }}
            />
          )}

          {/* PASSO 4: CONFIRMAÇÃO */}
          {step === 4 && selectedService && selectedProfessional && selectedDate && selectedTime && (
            <StepConfirm
              shop={shop}
              service={selectedService}
              // O '!' aqui garante ao TypeScript que não é nulo, pois o IF acima já verificou
              professional={selectedProfessional}
              date={selectedDate}
              time={selectedTime}
              onBack={() => setStep(3)}
            />
          )}

        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">
            Powered by TeaAgendei
          </p>
        </div>
      </div>
    </div>
  );
}