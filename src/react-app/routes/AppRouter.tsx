// src/react-app/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import BookPage from "../pages/booking/BookPage";

import OnboardingRouter from "../pages/onboarding/OnboardingRouter";
import DashboardHome from "../pages/dashboard/DashboardHome";

// Certifique-se de ter renomeado o arquivo para StaffAgendaPage.tsx
import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import ClientPanelPage from "../pages/client/ClientPanelPage";
import SettingsPage from "../pages/owner/SettingsPage";
import ServicesPage from "../pages/owner/ServicesPage";
import ShopsPage from "../pages/owner/ShopsPage";
import StaffPage from "../pages/owner/StaffPage";


import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICA RAIZ */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* BOOKING PÚBLICO */}
        <Route path="/book/:slug" element={<BookPage />} />

        {/* ONBOARDING MULTI-ETAPA (DONO) */}
        <Route
          path="/onboarding/*"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <OnboardingRouter />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD DO DONO */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        {/* --- ROTAS DO PAINEL (COM LAYOUT) --- */}
        <Route element={<AppLayout />}>
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/shops"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <ShopsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/services"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/staff"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <StaffPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/settings"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff/agenda"
            element={
              <ProtectedRoute allowedRoles={["staff", "dono"]}>
                <StaffAgendaPage />
              </ProtectedRoute>
            }
          />

          {/* Adicione as rotas futuras aqui (services, shops, etc) */}
        </Route>
        {/* --- FIM ROTAS DO PAINEL --- */}
        {/* AGENDA DO PROFISSIONAL */}
        <Route
          path="/staff/agenda"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffAgendaPage />
            </ProtectedRoute>
          }
        />

        {/* PAINEL DO CLIENTE */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <ClientPanelPage />
            </ProtectedRoute>
          }
        />

        {/* CONFIGURAÇÕES DA LOJA (Corrigido: Removida a duplicata) */}
        <Route
          path="/owner/settings"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
