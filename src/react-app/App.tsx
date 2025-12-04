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
import ClientDashboard from "./pages/ClientDashboard"; // Importar a nova página

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

            {/* Protected Routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />
            
            {/* Dashboard do Dono/Staff */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Dashboard do Cliente (NOVA ROTA) */}
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