// src/react-app/pages/onboarding/DoneStep.tsx
import { useNavigate } from "react-router-dom";

export default function DoneStep() {
  const navigate = useNavigate();

  function go() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Tudo pronto! 🎉</h1>

        <p className="text-slate-300 text-sm">
          Sua empresa, unidade e perfil foram configurados.  
          Você já pode começar a usar o TeaAgendei.
        </p>

        <button
          onClick={go}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-black font-semibold mt-4"
        >
          Ir para o painel
        </button>
      </div>
    </div>
  );
}
