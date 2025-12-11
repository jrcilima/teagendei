// src/react-app/pages/owner/DashboardHome.tsx
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const { currentCompany, currentShop } = useTenant();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
          <p>
            <span className="text-slate-400">Usuário: </span>
            <span className="font-medium">{user?.name || user?.email}</span>
          </p>
          <p>
            <span className="text-slate-400">Papel: </span>
            <span className="font-medium">{user?.role ?? "—"}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
            <h2 className="text-sm font-semibold mb-2">Empresa atual</h2>
            {currentCompany ? (
              <>
                <p className="font-medium">{currentCompany.legal_name}</p>
                <p className="text-slate-400 text-xs mt-1">
                  ID: {currentCompany.id}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-xs">
                Nenhuma empresa vinculada. Conclua o onboarding.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
            <h2 className="text-sm font-semibold mb-2">Unidade atual</h2>
            {currentShop ? (
              <>
                <p className="font-medium">{currentShop.name}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Slug: {currentShop.slug}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-xs">
                Nenhuma unidade selecionada.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
