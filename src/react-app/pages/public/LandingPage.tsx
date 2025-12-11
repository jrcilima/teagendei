// Caminho: src/react-app/pages/public/LandingPage.tsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* 🔮 Background com glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full" />
        <div className="absolute -right-16 bottom-0 w-80 h-80 bg-sky-500/30 blur-3xl rounded-full" />
      </div>

      {/* HERO */}
      <header className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transforme a forma como você gerencia
          <br />
          <span className="text-emerald-400">agendamentos e clientes</span>
        </h1>

        <p className="text-slate-300 max-w-2xl mt-4 text-sm md:text-base">
          Uma plataforma completa para Barbearias, Salões, Clínicas Estéticas,
          Esmalterias e Studios. Tudo em um só lugar.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg hover:opacity-90"
          >
            Entrar
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold shadow-lg hover:bg-emerald-400"
          >
            Começar grátis por 15 dias
          </Link>
        </div>
      </header>

      {/* FERRAMENTAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ferramentas que fazem diferença
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📅",
              title: "Agenda Inteligente",
              desc: "Evite overbooking com horários automatizados.",
            },
            {
              icon: "💈",
              title: "Profissionais organizados",
              desc: "Cada membro vê sua própria agenda e atualiza atendimentos.",
            },
            {
              icon: "📊",
              title: "Faturamento claro",
              desc: "Veja todos os números importantes em tempo real.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-emerald-600 to-sky-600">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comece agora mesmo
        </h2>
        <p className="text-white/80 mb-6">Leva menos de 1 minuto.</p>

        <Link
          to="/register"
          className="px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl hover:opacity-90"
        >
          Criar conta gratuitamente
        </Link>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm">
        © 2025 TeaAgendei — Todos os direitos reservados.
      </footer>
    </div>
  );
}
