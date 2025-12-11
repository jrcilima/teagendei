// Caminho: src/react-app/pages/onboarding/OnboardingRouter.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CompanyStep from "./CompanyStep";
import ShopStep from "./ShopStep";
import OwnerProfessionalStep from "./OwnerProfessionalStep";
import DoneStep from "./DoneStep";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function OnboardingRouter() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Segurança extra (só donos)
  if (!user || user.role !== "dono") {
    return <Navigate to="/login" replace />;
  }

  return (
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
  );
}