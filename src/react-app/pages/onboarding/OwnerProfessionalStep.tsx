// Caminho: src/react-app/pages/onboarding/OwnerProfessionalStep.tsx
import { FormEvent, useState } from "react";
// Removemos useNavigate se não for usar, mas mantemos caso precise no futuro
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { onboardingCreateProfessional } from "@/react-app/lib/api/onboarding";

type Props = {
  onDone: () => void;
};

export default function OwnerProfessionalStep({ onDone }: Props) {
  const { user } = useAuth();
  const { currentShop, reloadTenants } = useTenant();
  
  const [isProfessional, setIsProfessional] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificação visual para o render (o usuário vê msg de erro se for null)
  if (!user || !currentShop) {
    return (
      <div className="p-6 text-slate-200 bg-red-900/20 rounded-xl border border-red-500/30">
        <p className="font-semibold text-red-200">Atenção</p>
        <p className="text-sm mt-1">
          Não foi possível identificar a empresa ou unidade criada. 
          Tente recarregar a página.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // CORREÇÃO DOS ERROS DE TYPESCRIPT AQUI:
    // Garantimos ao TS que user e currentShop existem antes de usar
    if (!user || !currentShop) {
      setError("Erro de sessão: Usuário ou Loja não identificados.");
      return;
    }

    // Se o dono NÃO quiser ser profissional, apenas finalizamos
    if (!isProfessional) {
      onDone();
      return;
    }

    setSubmitting(true);

    try {
      // Agora o TS sabe que user.id e currentShop.id são strings válidas
      await onboardingCreateProfessional({
        ownerId: user.id,
        shopId: currentShop.id,
      });

      // Atualiza contexto para refletir a mudança (is_professional = true)
      await reloadTenants(); 

      onDone();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message || "Erro ao definir perfil de profissional. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Você também atende clientes?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Se você também corta cabelo, faz barba ou realiza serviços, 
          vamos ativar seu perfil de profissional nesta unidade.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Checkbox estilizado */}
        <label className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-slate-900/50 cursor-pointer hover:bg-slate-800/50 transition">
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={isProfessional}
              onChange={(e) => setIsProfessional(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium text-slate-200">
              Sim, eu sou um profissional
            </span>
            <span className="block text-xs text-slate-400">
              Serei listado na agenda e poderei receber agendamentos dos clientes.
            </span>
          </div>
        </label>

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-xs text-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-3 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            "Salvando configurações..."
          ) : (
            <>
              Concluir Onboarding
              <span className="text-lg">⟶</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}