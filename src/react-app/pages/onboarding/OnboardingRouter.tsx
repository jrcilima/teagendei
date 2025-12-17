// Caminho: src/react-app/pages/onboarding/OnboardingRouter.tsx
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import CompanyStep from "./CompanyStep";
import ShopStep from "./ShopStep";
import OwnerProfessionalStep from "./OwnerProfessionalStep";
import DoneStep from "./DoneStep";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function OnboardingRouter() {
  const { user } = useAuth();
  const { currentCompany, currentShop } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  // Segurança extra (só donos)
  if (!user || user.role !== "dono") {
    return <Navigate to="/login" replace />;
  }

  // Lógica Inteligente de Redirecionamento
  // Verifica o progresso e redireciona se o usuário cair no passo errado
  useEffect(() => {
    // Se estou na raiz (CompanyStep) mas já tenho empresa -> vai para Shop
    if (location.pathname === "/onboarding" || location.pathname === "/onboarding/") {
      if (currentCompany && !currentShop) {
        navigate("shop", { replace: true });
      } else if (currentCompany && currentShop) {
        navigate("owner-pro", { replace: true });
      }
    }

    // Se estou no ShopStep mas já tenho Shop -> vai para OwnerPro
    if (location.pathname.includes("/shop")) {
      if (currentShop) {
        navigate("owner-pro", { replace: true });
      }
    }
  }, [currentCompany, currentShop, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Fundo decorativo simples para o onboarding */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full max-w-lg">
        <Routes>
          {/* Passo 1: Empresa -> Vai para /shop */}
          <Route 
            path="/" 
            element={<CompanyStep onDone={() => navigate("shop")} />} 
          />

          {/* Passo 2: Unidade -> Vai para /owner-pro */}
          <Route 
            path="/shop" 
            element={<ShopStep onDone={() => navigate("owner-pro")} />} 
          />

          {/* Passo 3: Perfil Profissional -> Vai para /done */}
          <Route 
            path="/owner-pro" 
            element={<OwnerProfessionalStep onDone={() => navigate("done")} />} 
          />

          {/* Passo Final: Conclusão */}
          <Route path="/done" element={<DoneStep />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </div>
    </div>
  );
}