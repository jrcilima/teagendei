// src/react-app/pages/auth/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTenant } from "../../contexts/TenantContext";
import type { User } from "@/shared/types";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const { refreshTenant } = useTenant();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password); // login NÃO retorna user

      await refreshTenant(); // sincroniza company/shop

      // user AGORA vem do AuthContext
      if (!user) {
        setError("Erro inesperado ao carregar dados do usuário.");
        return;
      }

      // REDIRECIONAMENTO PÓS LOGIN
      if (user.role === "dono") {
        if (!user.company_id) {
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/app/dashboard", { replace: true });
        }
      } else if (user.role === "staff") {
        navigate("/app/staff/agenda", { replace: true });
      } else if (user.role === "cliente") {
        navigate("/client", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(
        err?.message === "Failed to authenticate."
          ? "E-mail ou senha inválidos."
          : err?.message || "Erro ao entrar. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = submitting;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* fundos blur */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full" />
        <div className="absolute -right-16 bottom-0 w-80 h-80 bg-sky-500/30 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="mb-6 text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-slate-400 mb-2">
            Sistema de agendamentos
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Faça login no TeaAgendei
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitore agenda, equipe e faturamento em tempo real.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] p-6 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-300">
                  Painel de controle
                </span>
                <span className="text-sm font-medium text-slate-50">
                  TeaAgendei
                </span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <div className="flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Status: Online
              </div>
              <span>Agenda em tempo real</span>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-500/10 border border-red-500/40 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-200">
                E-mail
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="voce@studio.com"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-slate-200">Senha</label>
                <button
                  type="button"
                  className="text-sky-300 hover:text-sky-200"
                  onClick={() => {
                    // futura rota de "esqueci minha senha"
                    // por agora, só placeholder
                    alert("Recuperação de senha ainda não implementada.");
                  }}
                >
                  Esqueci a senha
                </button>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500"
                  defaultChecked
                />
                Lembrar acesso neste dispositivo
              </label>
              <span className="text-slate-400">
                Ambiente seguro • SSL ativo
              </span>
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {disabled ? "Entrando..." : "Entrar agora"}
              <span className="text-lg">⟶</span>
            </button>
          </form>
        </div>

        <div className="mt-4 text-[11px] text-center text-slate-500">
          Não tem acesso? Fale com o administrador da sua barbearia/salão para
          criar seu usuário.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
