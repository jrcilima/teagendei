// src/react-app/pages/client/ClientPanelPage.tsx
export default function ClientPanelPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-3">
        <h1 className="text-2xl font-semibold">Meus agendamentos</h1>
        <p className="text-sm text-slate-300">
          Aqui o cliente verá seus próximos horários, histórico e poderá
          remarcar/cancelar.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
          Ainda é um placeholder. Mais à frente vamos integrar com a coleção de
          agendamentos do PocketBase.
        </div>
      </div>
    </div>
  );
}
