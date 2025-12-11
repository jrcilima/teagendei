// Caminho: src/react-app/pages/onboarding/CompanyStep.tsx
import { FormEvent, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { onboardingCreateCompany } from "@/react-app/lib/api/onboarding";

type Props = {
  onDone: () => void;
};

export default function CompanyStep({ onDone }: Props) {
  const { user } = useAuth();
  const { reloadTenants } = useTenant();

  const [legalName, setLegalName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="text-slate-200">
        Você precisa estar autenticado para continuar o onboarding.
      </div>
    );
  }

  // Função utilitária para limpar formatação (deixa só números)
  const cleanCnpj = (value: string) => value.replace(/\D/g, "");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("Sessão inválida. Faça login novamente.");
      return;
    }

    if (!legalName.trim()) {
      setError("Informe o nome da sua empresa.");
      return;
    }

    // Validação de tamanho do CNPJ (se preenchido)
    const rawCnpj = cleanCnpj(cnpj);
    if (cnpj && rawCnpj.length !== 14) {
        setError("O CNPJ deve conter exatamente 14 números.");
        return;
    }

    setSubmitting(true);

    try {
      await onboardingCreateCompany({
        owner_id: user.id,
        legal_name: legalName.trim(),
        // CORREÇÃO: Envia apenas os números para respeitar o limite de 14 chars do banco
        cnpj: rawCnpj || undefined, 
      });

      await reloadTenants();
      onDone();
    } catch (err: any) {
      console.error(err);
      // Mensagem amigável se for erro de validação
      if (err.data?.cnpj) {
         setError("CNPJ inválido ou já cadastrado.");
      } else {
         setError(err?.message || "Não foi possível criar a empresa.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Cadastre sua empresa
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Esses dados identificam o seu negócio dentro do TeaAgendei.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Nome / Razão Social
          </label>
          <input
            type="text"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Ex.: Barbearia Central LTDA"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            CNPJ (opcional)
          </label>
          <input
            type="text"
            value={cnpj}
            // Permite digitar qualquer coisa, mas limpamos no submit
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="00.000.000/0000-00 (Apenas números se preferir)"
            maxLength={18} // Limite visual
          />
          <p className="text-[10px] text-slate-500">Digite apenas números ou use formatação padrão.</p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-6 py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Salvando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}