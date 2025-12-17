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
} from "../../lib/api/register";

import type { ShopWithCompany } from "@/shared/types";

type Mode = "owner" | "client";

export default function RegisterPage() {
  const [mode, setMode] = useState<Mode>("owner");

  // Campos comuns
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // CLIENTE - Lista de Lojas (com dados da empresa)
  const [shops, setShops] = useState<ShopWithCompany[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");
  const [loadingShops, setLoadingShops] = useState(false);

  // Estados gerais
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { reloadTenants } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ============================================================
      Pré-seleção de unidade caso venha com ?shopId ou ?slug
  ============================================================ */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingShops(true);
      setError(null);

      try {
        const shopIdParam = searchParams.get("shopId");
        const slugParam = searchParams.get("slug");

        const allShops = await fetchActiveShopsWithCompany();
        
        if (cancelled) return;

        let preselected = null;

        if (shopIdParam) {
          preselected = await getShopById(shopIdParam);
        } else if (slugParam) {
          preselected = await getShopBySlug(slugParam);
        }

        setShops(allShops);

        if (preselected) {
          setSelectedShopId(preselected.id);
        } else if (allShops.length > 0) {
          // Seleciona o primeiro por padrão
          setSelectedShopId(allShops[0].shop.id);
        }
      } catch (err: any) {
        if (err.status !== 0 && !cancelled) {
          console.error("Erro ao carregar lojas:", err);
          setError("Não foi possível carregar as unidades disponíveis.");
        }
      } finally {
        if (!cancelled) setLoadingShops(false);
      }
    }

    if (mode === "client") {
        load();
    }

    return () => {
      cancelled = true;
    };
  }, [searchParams, mode]);

  // Helper para pegar o objeto da loja selecionada
  const selectedShopData = useMemo(
    () => shops.find((s) => s.shop.id === selectedShopId) ?? null,
    [shops, selectedShopId]
  );

  /* ============================================================
      Validações Frontend
  ============================================================ */
  function validateCommon(): string | null {
    if (!name.trim()) return "Informe o nome.";
    if (!email.trim()) return "Informe o e-mail.";
    if (!password) return "Informe a senha.";
    if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
    if (password !== passwordConfirm) return "As senhas não conferem.";
    return null;
  }

  function validateClient(): string | null {
    if (!selectedShopId) return "Selecione uma unidade para se vincular.";
    if (!selectedShopData) return "Unidade selecionada inválida.";
    return null;
  }

  /* ============================================================
      SUBMIT PRINCIPAL
  ============================================================ */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // 1. Validação básica
    const baseError = validateCommon();
    if (baseError) return setError(baseError);

    if (mode === "client") {
      const extra = validateClient();
      if (extra) return setError(extra);
    }

    setSubmitting(true);

    try {
      /* ------------------- CASO: DONO ------------------- */
      if (mode === "owner") {
        await registerOwner({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });

        // Login automático e redirecionamento
        await login(email.trim(), password);
        await reloadTenants();
        navigate("/onboarding", { replace: true });
        return;
      }

      /* ------------------- CASO: CLIENTE ------------------- */
      if (!selectedShopData) throw new Error("Dados de unidade inválidos.");

      const { shop, company } = selectedShopData;

      // Chama API unificada que cria OU vincula se já existir (e senha bater)
      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId: shop.company_id, // ou company.id
        shopId: shop.id,
      });

      // Login automático
      await login(email.trim(), password);
      
      // Redireciona para a página de agendamento da loja
      navigate(`/book/${shop.slug}`, { replace: true });

    } catch (err: any) {
      console.error("Erro no registro:", err);

      let errorMsg = "Não foi possível concluir o cadastro.";

      // Tratamento de erros do PocketBase
      if (err.data && typeof err.data === 'object') {
        const fieldKeys = Object.keys(err.data);
        if (fieldKeys.length > 0) {
          const field = fieldKeys[0];
          const msg = err.data[field]?.message;
          if (msg) errorMsg = `${field}: ${msg}`; // ex: "password: Must be at least 8 characters"
        }
      } 
      // Tratamento para nosso erro customizado de senha errada no login automático
      else if (err.message && err.message.includes("senha informada está incorreta")) {
         errorMsg = err.message;
      }
      else if (err.message) {
         // Erros genéricos
         errorMsg = err.message;
      }

      // Ignora erro se for abortamento de request
      if (err.status === 0 || err.isAbort) return;

      setError(errorMsg);
      setSubmitting(false);
    }
  }

  /* ============================================================
      RENDER
  ============================================================ */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10 relative">

      {/* Fundo decorativo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -right-24 bottom-[-40px] w-96 h-96 bg-sky-500/25 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">

        {/* Lado esquerdo: Texto Marketing */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.18em] uppercase text-emerald-300/80">
            TeaAgendei • Plataforma SaaS
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Crie seu acesso e
            <span className="text-emerald-400"> comece a organizar</span> seus agendamentos hoje.
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Donos gerenciam unidades e equipe. Clientes agendam em poucos cliques.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Simples e Rápido.</li>
            <li>• Histórico de agendamentos.</li>
            <li>• Agenda inteligente e antifuro.</li>
          </ul>
        </div>

        {/* Lado direito: Formulário */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-6 md:p-7 space-y-6">

          {/* Header do Card */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">Cadastro de acesso</span>
                <span className="text-sm font-medium text-slate-50">TeaAgendei</span>
              </div>
            </div>
          </div>

          {/* Toggle Dono vs Cliente */}
          <div className="inline-flex rounded-2xl bg-slate-950/60 border border-white/10 p-1 text-xs w-full">
            <button
              type="button"
              onClick={() => setMode("owner")}
              className={`flex-1 px-4 py-2 rounded-xl transition text-center ${
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
              className={`flex-1 px-4 py-2 rounded-xl transition text-center ${
                mode === "client"
                  ? "bg-sky-500 text-slate-950 font-semibold shadow-sm shadow-sky-500/40"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              Sou cliente
            </button>
          </div>

          {/* Formulário */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Nome */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder={mode === "owner" ? "Ex.: João da Barbearia Central" : "Ex.: Maria Souza"}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="voce@seuemail.com"
              />
            </div>

            {/* Telefone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">WhatsApp (opcional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="(00) 90000-0000"
              />
            </div>

            {/* Senhas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="Min. 8 carac."
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">Confirmar</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            {/* CLIENTE: Seleção de Unidade */}
            {mode === "client" && (
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <label className="block text-xs font-medium text-slate-200">
                  Selecione a unidade onde você será atendido
                </label>

                {loadingShops ? (
                  <div className="text-xs text-slate-400 py-2">Carregando unidades...</div>
                ) : shops.length === 0 ? (
                  <div className="text-xs text-slate-400 py-2">Nenhuma unidade disponível no momento.</div>
                ) : (
                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                    focus:outline-none focus:ring-2 focus:ring-sky-400/80"
                  >
                    {shops.map(({ shop, company }) => (
                      <option key={shop.id} value={shop.id}>
                        {company?.legal_name || company?.fantasy_name || "Empresa"} • {shop.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* Mensagem de Erro */}
            {error && (
              <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100 break-words">
                {error}
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={submitting || (mode === "client" && loadingShops)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition
              shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {submitting
                ? "Criando acesso..."
                : mode === "owner"
                ? "Criar acesso de dono"
                : "Criar acesso de cliente"}
            </button>

            {/* Link para Login */}
            <p className="text-[11px] text-center text-slate-400">
              Já tem acesso?{" "}
              <a href="/login" className="text-emerald-300 hover:text-emerald-200 transition">
                Entrar no TeaAgendei
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}