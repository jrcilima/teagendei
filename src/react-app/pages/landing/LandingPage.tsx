import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--text)]">

      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--gradient)" }}
      >
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
            <span className="text-[var(--primary)] text-lg">🗓</span>
            Plataforma completa para agendamentos
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Transforme a Gestão <br />
            <span className="text-[var(--primary)]">
              do seu Negócio
            </span>
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto">
            O sistema feito para Barbearias, Salões, Esmalterias e Estéticas que
            precisam crescer, organizar e fidelizar clientes com tecnologia premium.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <a
              href="/login"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg"
            >
              Entrar
            </a>

            <a
              href="/register"
              className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:brightness-110"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Começar grátis 15 dias
            </a>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ferramentas poderosas ao seu alcance
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">📅</div>
            <h3 className="text-xl font-semibold">Agenda Inteligente</h3>
            <p className="text-slate-400 text-sm">
              Evite overbooking com cálculo automático de horários e disponibilidade.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">👥</div>
            <h3 className="text-xl font-semibold">Profissionais organizados</h3>
            <p className="text-slate-400 text-sm">
              Cada profissional acessa sua própria agenda e controla atendimentos.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">📊</div>
            <h3 className="text-xl font-semibold">Faturamento claro</h3>
            <p className="text-slate-400 text-sm">
              Veja o desempenho financeiro do seu negócio em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="py-20 px-6 bg-black/20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Feito para diversos segmentos
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["💈 Barbearias", "💇 Salões", "💅 Esmalterias", "💆 Clínicas Estéticas"].map(
            (item) => (
              <div
                key={item}
                className="p-6 rounded-xl border border-white/10 bg-[var(--card)] text-center font-medium"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      {/* PLANO */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Planos simples e acessíveis</h2>

        <p className="text-slate-400 max-w-lg mx-auto mb-8">
          Comece com 15 dias grátis. Depois escolha o plano ideal para o seu negócio.
        </p>

        <div className="p-8 rounded-3xl border border-white/10 bg-[var(--card)] inline-block shadow-xl shadow-black/10">
          <h3 className="text-2xl font-bold">Plano Profissional</h3>
          <p className="text-5xl font-extrabold my-4">
            R$59<span className="text-xl">,90/mês</span>
          </p>
          <ul className="text-slate-400 space-y-2 text-sm mb-6">
            <li>✔ 1 unidade</li>
            <li>✔ Até 3 profissionais</li>
            <li>✔ Agendamentos ilimitados</li>
          </ul>

          <a
            href="/register"
            className="px-8 py-3 rounded-xl text-white font-semibold"
            style={{ background: "var(--primary)" }}
          >
            Começar 15 dias grátis
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-20 px-6 text-center text-white"
        style={{ background: "var(--gradient)" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para revolucionar seu negócio?
        </h2>

        <p className="text-white/80 mb-6">Comece agora. Leva menos de 1 minuto.</p>

        <a
          href="/register"
          className="px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl"
        >
          Criar conta gratuitamente
        </a>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm">
        © 2025 TeAgendei — Todos os direitos reservados.
      </footer>
    </div>
  );
}
