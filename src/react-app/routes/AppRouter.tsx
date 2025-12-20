import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BookPage from "../pages/booking/BookPage";
import OnboardingRouter from "../pages/onboarding/OnboardingRouter";
import DashboardHome from "../pages/dashboard/DashboardHome";

// Pages Staff
import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import StaffProfilePage from "../pages/staff/StaffProfilePage"; 

// Pages Owner
import ClientPanelPage from "../pages/client/ClientPanelPage";
import SettingsPage from "../pages/owner/SettingsPage";
import ServicesPage from "../pages/owner/ServicesPage";
import ShopsPage from "../pages/owner/ShopsPage";
import StaffPage from "../pages/owner/StaffPage";
import FinancialPage from "../pages/owner/FinancialPage"; // IMPORTAR AQUI

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import StaffLayout from "../components/layout/StaffLayout" 

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

        {/* ONBOARDING (DONO) */}
        <Route
          path="/onboarding/*"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <OnboardingRouter />
            </ProtectedRoute>
          }
        />

        {/* --- ROTAS DO PAINEL DO DONO (Layout AppLayout) --- */}
        <Route element={<AppLayout />}>
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          
          {/* NOVA ROTA FINANCEIRA */}
          <Route
            path="/owner/financial"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <FinancialPage />
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
        </Route>

        {/* --- ÁREA DO STAFF (Layout StaffLayout) --- */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff", "dono"]}>
              <StaffLayout>
                <Outlet />
              </StaffLayout>
            </ProtectedRoute>
          }
        >
            <Route index element={<Navigate to="agenda" replace />} />
            <Route path="agenda" element={<StaffAgendaPage />} />
            <Route path="settings" element={<StaffProfilePage />} />
        </Route>


        {/* PAINEL DO CLIENTE */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <ClientPanelPage />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
