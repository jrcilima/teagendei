// Caminho: src/react-app/pages/auth/RegisterPage.tsx
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTenant } from "../../contexts/TenantContext";
import {
  fetchActiveShopsWithCompany,
  getShopById,
  getShopBySlug,
  registerClient,
  registerOwner,
  type ShopWithCompany,
} from "../../lib/api/register";
import type { Shop } from "@/shared/types";

type Mode = "owner" | "client";

export default function RegisterPage() {
  const [mode, setMode] = useState<Mode>("owner");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // client-specific
  const [shops, setShops] = useState<ShopWithCompany[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");
  const [loadingShops, setLoadingShops] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { refreshTenant } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pré-seleção de unidade por query (?shopId / ?slug)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingShops(true);
      setError(null);

      try {
        const shopId = searchParams.get("shopId");
        const slug = searchParams.get("slug");

        const allShops = await fetchActiveShopsWithCompany();

        let preselected: Shop | null = null;

        if (shopId) {
          preselected = await getShopById(shopId);
        } else if (slug) {
          preselected = await getShopBySlug(slug);
        }

        setShops(allShops);

        if (cancelled) return;

        if (preselected) {
          setSelectedShopId(preselected.id);
        } else if (allShops.length > 0) {
          setSelectedShopId(allShops[0].shop.id);
        }
      } catch (err: any) {
        console.error(err);
        setError("Não foi possível carregar as unidades disponíveis.");
      } finally {
        if (!cancelled) {
          setLoadingShops(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const selectedShop = useMemo(
    () => shops.find((s) => s.shop.id === selectedShopId) ?? null,
    [shops, selectedShopId]
  );

  function validateCommon(): string | null {
    if (!name.trim()) return "Informe o nome.";
    if (!email.trim()) return "Informe o e-mail.";
    if (!password) return "Informe a senha.";
    if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    if (password !== passwordConfirm) return "As senhas não conferem.";
    return null;
  }

  function validateClient(): string | null {
    if (!selectedShopId) return "Selecione uma unidade para se vincular.";
    if (!selectedShop) return "Unidade selecionada inválida.";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const baseError = validateCommon();
    if (baseError) {
      setError(baseError);
      return;
    }

    if (mode === "client") {
      const extra = validateClient();
      if (extra) {
        setError(extra);
        return;
      }
    }

    setSubmitting(true);

    try {
      if (mode === "owner") {
        // 1) Cria usuário dono
        await registerOwner({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });

        // 2) Faz login
        await login(email.trim(), password);

        // 3) Atualiza tenant (vai detectar que ainda não há company_id)
        await refreshTenant();

        // 4) Redireciona para onboarding ou dashboard do dono
        // Sugestão: sempre começar pelo onboarding
        navigate("/onboarding", { replace: true });
      } else {
        // CLIENTE
        if (!selectedShop || !selectedShop.shop.company_id) {
          throw new Error("Dados de unidade/empresa inválidos.");
        }

        const companyId = selectedShop.shop.company_id;
        const shopId = selectedShop.shop.id;

        // 1) Cria usuário cliente já amarrado
        await registerClient({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          companyId,
          shopId,
        });

        // 2) Login
        await login(email.trim(), password);

        // 3) Não precisamos de Tenant para cliente; só levar pro fluxo de agendamento
        const slug = selectedShop.shop.slug;
        navigate(`/book/${slug}`, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      // Mensagem amigável; se vier message do PB, usamos
      const message =
        err?.message ||
        "Não foi possível concluir o cadastro. Tente novamente em instantes.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      {/* fundo com glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -right-24 bottom-[-40px] w-96 h-96 bg-sky-500/25 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
        {/* Lado esquerdo: mensagem / hero */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.18em] uppercase text-emerald-300/80">
            TeaAgendei • Plataforma SaaS de agendamento
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Crie seu acesso e
            <span className="text-emerald-400"> comece a organizar</span>{" "}
            seus agendamentos hoje.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Donos gerenciam unidades, equipe e faturamento. Clientes agendam
            em poucos cliques na unidade preferida.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• 15 dias grátis para testar (plano trial da empresa).</li>
            <li>
              • Clientes sempre amarrados à unidade escolhida — nada de
              bagunça nos dados.
            </li>
            <li>• Agenda inteligente, antifuro e antifluxo caótico.</li>
          </ul>
        </div>

        {/* Lado direito: card do formulário */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-6 md:p-7 space-y-6">
          {/* header mini brand */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">
                  Cadastro de acesso
                </span>
                <span className="text-sm font-medium text-slate-50">
                  TeaAgendei
                </span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <div className="flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ambiente seguro</span>
              </div>
              <span>Dados criptografados</span>
            </div>
          </div>

          {/* Toggle dono/cliente */}
          <div className="inline-flex rounded-2xl bg-slate-950/60 border border-white/10 p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode("owner")}
              className={`px-4 py-1.5 rounded-xl transition ${
                mode === "owner"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-sm shadow-emerald-500/40"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              Sou dono do negócio
            </button>
            <button
              type="button"
              onClick={() => setMode("client")}
              className={`px-4 py-1.5 rounded-xl transition ${
                mode === "client"
                  ? "bg-sky-500 text-slate-950 font-semibold shadow-sm shadow-sky-500/40"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              Sou cliente
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campos comuns */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder={
                  mode === "owner"
                    ? "Ex.: João da Barbearia Central"
                    : "Ex.: Maria Souza"
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder="voce@seuemail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                WhatsApp (opcional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder="(00) 90000-0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Confirme a senha
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Bloco específico para CLIENTE */}
            {mode === "client" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Selecione a unidade onde você será atendido
                </label>

                {loadingShops ? (
                  <div className="text-xs text-slate-400">
                    Carregando unidades disponíveis...
                  </div>
                ) : shops.length === 0 ? (
                  <div className="text-xs text-slate-400">
                    Nenhuma unidade disponível para cadastro de cliente no
                    momento.
                  </div>
                ) : (
                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-sky-400/80"
                  >
                    {shops.map(({ shop, company }) => (
                      <option key={shop.id} value={shop.id}>
                        {company?.legal_name ?? "Empresa"} • {shop.name}
                      </option>
                    ))}
                  </select>
                )}

                {selectedShop && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Você ficará vinculado à unidade{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.shop.name}
                    </span>{" "}
                    da empresa{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.company?.legal_name ?? "N/A"}
                    </span>
                    .
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || (mode === "client" && loadingShops)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Criando seu acesso..."
                : mode === "owner"
                ? "Criar acesso de dono"
                : "Criar acesso de cliente"}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Já tem acesso?{" "}
              <a
                href="/login"
                className="text-emerald-300 hover:text-emerald-200"
              >
                Entrar no TeaAgendei
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
