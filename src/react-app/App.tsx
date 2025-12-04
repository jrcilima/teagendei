import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import OnboardingPage from "./pages/Onboarding";
import DashboardPage from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ServicesList from "./pages/ServicesList";
import ServiceForm from "./pages/ServiceForm";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments"; // Importar Agenda

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rota de Agendamento (Pública/Híbrida) */}
            <Route path="/book/:slug" element={<BookingPage />} />

            {/* Protected Routes - Dono */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - Staff e Dono */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* AGENDA (NOVO) */}
            <Route
              path="/appointments"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            {/* Gestão de Serviços */}
            <Route
              path="/services"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <ServicesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/new"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <ServiceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/:id"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <ServiceForm />
                </ProtectedRoute>
              }
            />

            {/* Dashboard do Cliente */}
            <Route
              path="/client"
              element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TenantProvider>
    </AuthProvider>
  );
}