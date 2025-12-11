// src/react-app/pages/onboarding/OnboardingRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import CompanyStep from "./CompanyStep";
import ShopStep from "./ShopStep";
import OwnerProfessionalStep from "./OwnerProfessionalStep";
import DoneStep from "./DoneStep";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function OnboardingRouter() {
  const { user } = useAuth();

  // Segurança extra (só donos)
  if (!user || user.role !== "dono") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<CompanyStep />} />
      <Route path="/shop" element={<ShopStep />} />
      <Route path="/owner-pro" element={<OwnerProfessionalStep />} />
      <Route path="/done" element={<DoneStep />} />

      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}
