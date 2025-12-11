// src/react-app/pages/staff/StaffAgendaPage.tsx
export default function StaffAgendaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-3">
        <h1 className="text-2xl font-semibold">Agenda do Profissional</h1>
        <p className="text-sm text-slate-300">
          Aqui o staff verá seus horários do dia, clientes e status dos
          atendimentos.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
          Componente placeholder. Vamos ligar com o PocketBase (appointments) na
          fase da agenda real.
        </div>
      </div>
    </div>
  );
}
