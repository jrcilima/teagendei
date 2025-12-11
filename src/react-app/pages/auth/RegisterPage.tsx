// src/react-app/pages/auth/RegisterPage.tsx

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
  findUserByEmail,
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

  // CLIENTE
  const [shops, setShops] = useState<ShopWithCompany[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");
  const [loadingShops, setLoadingShops] = useState(false);

  // Estados gerais
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Modal — confirmar vínculo extra
  const [showModal, setShowModal] = useState(false);
  const [pendingCompanyId, setPendingCompanyId] = useState<string>("");
  const [pendingShopId, setPendingShopId] = useState<string>("");

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
      // Limpa erro anterior para não confundir o usuário
      setError(null);

      try {
        const shopId = searchParams.get("shopId");
        const slug = searchParams.get("slug");

        const allShops = await fetchActiveShopsWithCompany();
        
        if (cancelled) return;

        let preselected = null;

        // Se tiver ID ou Slug na URL, tenta achar a loja específica
        if (shopId) {
          preselected = await getShopById(shopId);
        } else if (slug) {
          preselected = await getShopBySlug(slug);
        }

        setShops(allShops);

        if (preselected) {
          setSelectedShopId(preselected.id);
        } else if (allShops.length > 0) {
          setSelectedShopId(allShops[0].shop.id);
        }
      } catch (err: any) {
        // CORREÇÃO: Ignora erro se for cancelamento automático do PocketBase (status 0)
        if (err.status !== 0 && !cancelled) {
          console.error("Erro ao carregar lojas:", err);
          setError("Não foi possível carregar as unidades disponíveis.");
        }
      } finally {
        if (!cancelled) setLoadingShops(false);
      }
    }

    // Se estiver no modo cliente, carrega as lojas
    if (mode === "client") {
        load();
    }

    return () => {
      cancelled = true;
    };
  }, [searchParams, mode]); // Adicionado 'mode' para recarregar se trocar de aba

  const selectedShop = useMemo(
    () => shops.find((s) => s.shop.id === selectedShopId) ?? null,
    [shops, selectedShopId]
  );

  /* ============================================================
      Validações
  ============================================================ */
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

  /* ============================================================
      SUBMIT PRINCIPAL
  ============================================================ */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const baseError = validateCommon();
    if (baseError) return setError(baseError);

    if (mode === "client") {
      const extra = validateClient();
      if (extra) return setError(extra);
    }

    // LIMPA MODAL
    setShowModal(false);

    setSubmitting(true);
    try {
      if (mode === "owner") {
        /* ------------------- DONO ------------------- */
        await registerOwner({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });

        const user = await login(email.trim(), password);
        await reloadTenants();
        navigate("/onboarding", { replace: true });
        return;
      }

      /* ------------------- CLIENTE ------------------- */
      if (!selectedShop) throw new Error("Dados de unidade inválidos.");

      const companyId = selectedShop.shop.company_id;
      const shopId = selectedShop.shop.id;

      // Checa se existe o user
      const existingUser = await findUserByEmail(email.trim());

      if (existingUser) {
        // User existe → perguntar se quer vincular
        setPendingCompanyId(companyId);
        setPendingShopId(shopId);
        setShowModal(true);
        return;
      }

      // Criar novo user e vínculo
      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId,
        shopId,
      });

      await login(email.trim(), password);
      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });

    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente em instantes."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ============================================================
      Confirma cadastro adicional (modal)
  ============================================================ */
  async function confirmLink() {
    if (!selectedShop) return;

    try {
      setSubmitting(true);

      // Só chamar registerClient — ele adiciona vínculo
      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId: pendingCompanyId,
        shopId: pendingShopId,
      });

      await login(email.trim(), password);
      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente."
      );
    } finally {
      setSubmitting(false);
      setShowModal(false);
    }
  }

  function cancelLink() {
    setShowModal(false);
  }

  /* ============================================================
      RENDER
  ============================================================ */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10 relative">

      {/* fundo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -right-24 bottom-[-40px] w-96 h-96 bg-sky-500/25 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">

        {/* Lado esquerdo */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.18em] uppercase text-emerald-300/80">
            TeaAgendei • Plataforma SaaS de agendamento
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Crie seu acesso e
            <span className="text-emerald-400"> comece a organizar</span> seus agendamentos hoje.
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Donos gerenciam unidades, equipe e faturamento. Clientes agendam em poucos cliques na unidade preferida.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• 15 dias grátis para testar.</li>
            <li>• Clientes sempre vinculados à unidade onde se cadastrarem.</li>
            <li>• Agenda inteligente e antifuro.</li>
          </ul>
        </div>

        {/* Card de formulário */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-6 md:p-7 space-y-6">

          {/* header mini brand */}
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

          {/* Formulário */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Campos comuns */}
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
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">Confirmar senha</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* CLIENTE — Seleção de Unidade */}
            {mode === "client" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Selecione a unidade onde você será atendido
                </label>

                {loadingShops ? (
                  <div className="text-xs text-slate-400">Carregando unidades...</div>
                ) : shops.length === 0 ? (
                  <div className="text-xs text-slate-400">Nenhuma unidade disponível no momento.</div>
                ) : (
                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                    focus:outline-none focus:ring-2 focus:ring-sky-400/80"
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
                    Você será vinculado à unidade{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.shop.name}
                    </span>{" "}
                    da empresa{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.company?.legal_name}
                    </span>.
                  </p>
                )}
              </div>
            )}

            {/* ERRO */}
            {error && (
              <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}

            {/* BOTÃO SUBMIT */}
            <button
              type="submit"
              disabled={submitting || (mode === "client" && loadingShops)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition
              shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Criando acesso..."
                : mode === "owner"
                ? "Criar acesso de dono"
                : "Criar acesso de cliente"}
            </button>

            {/* Link para login */}
            <p className="text-[11px] text-center text-slate-400">
              Já tem acesso?{" "}
              <a href="/login" className="text-emerald-300 hover:text-emerald-200">
                Entrar no TeaAgendei
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* ============================================================
          MODAL — Confirmar vínculo adicional
      ============================================================ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-xl text-center space-y-4">

            <h2 className="text-xl font-semibold text-white">
              Você já possui cadastro em outra empresa
            </h2>

            <p className="text-slate-300 text-sm">
              Deseja também se cadastrar nesta unidade?
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={cancelLink}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
                disabled={submitting}
              >
                Cancelar
              </button>

              <button
                onClick={confirmLink}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 shadow-lg shadow-emerald-500/40 transition"
                disabled={submitting}
              >
                Sim, cadastrar também
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}