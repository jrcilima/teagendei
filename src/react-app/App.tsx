import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import OnboardingPage from "./pages/Onboarding";
import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TenantProvider>
    </AuthProvider>
  );
}
