// Caminho: src/react-app/routes/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BookPage from "../pages/booking/BookPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import DashboardPage from "../pages/owner/DashboardPage";
import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import ClientPanelPage from "../pages/client/ClientPanelPage";
import ProtectedRoute  from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/:slug" element={<BookPage />} />

        {/* Onboarding do dono (já autenticado, mas sem empresa) */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Painel do dono */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Agenda do staff */}
        <Route
          path="/staff/agenda"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffAgendaPage />
            </ProtectedRoute>
          }
        />

        {/* Painel do cliente */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <ClientPanelPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
