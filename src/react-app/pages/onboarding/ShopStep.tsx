// src/react-app/pages/onboarding/ShopStep.tsx
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { createInitialShop } from "@/react-app/lib/api/onboarding";
import type { CreateShopDTO } from "@/shared/types";

type Props = {
  onDone: () => void;
};

export default function ShopStep({ onDone }: Props) {
  const { user } = useAuth();
  const { currentCompany, reloadTenants } = useTenant();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [segmentId, setSegmentId] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug && name) {
      const base = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(base);
    }
  }, [name]);

  if (!user || !currentCompany) {
    return (
      <div className="text-slate-200">
        Conclua primeiro o cadastro da empresa para continuar.
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Informe o nome da unidade.");
      return;
    }
    if (!slug.trim()) {
      setError("Informe o slug da unidade.");
      return;
    }

    const payload: CreateShopDTO = {
      name: name.trim(),
      slug: slug.trim(),
      company_id: currentCompany.id,
      owner_id: user.id,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      segment_id: segmentId || undefined,
    };

    setSubmitting(true);

    try {
      await createInitialShop(currentCompany.id, user.id, {
        name: payload.name,
        slug: payload.slug,
        phone: payload.phone,
        address: payload.address,
        segment_id: payload.segment_id,
      });

      await reloadTenants(); // para popular currentShop
      onDone();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Não foi possível criar a unidade.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Crie sua primeira unidade
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Essa unidade será usada para agendamentos e painel de controle.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Nome da unidade
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Ex.: Unidade Centro"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Slug (endereço público)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="ex.: barbearia-central-centro"
          />
          <p className="text-[11px] text-slate-500">
            Esse slug será usado na página de agendamento:{" "}
            <span className="font-mono text-emerald-300">
              /book/{slug || "sua-unidade"}
            </span>
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Telefone / WhatsApp (opcional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="(00) 90000-0000"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Endereço (opcional)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>

        {/* segment_id fica simples aqui (input texto / select manual).
           Depois podemos substituir por dropdown de segments do PB. */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Segmento (opcional, id)
          </label>
          <input
            type="text"
            value={segmentId}
            onChange={(e) => setSegmentId(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="ID do segmento (se houver)"
          />
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
          {submitting ? "Salvando unidade..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
