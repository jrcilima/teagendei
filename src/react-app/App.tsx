import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TenantProvider } from './contexts/TenantContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import ServicesList from './pages/ServicesList';
import ServiceForm from './pages/ServiceForm';
import StaffList from './pages/StaffList';
import StaffForm from './pages/StaffForm';
import Settings from './pages/Settings';
import BookingPage from './pages/BookingPage';
import Onboarding from './pages/Onboarding';
import ClientDashboard from './pages/ClientDashboard';
import ShopForm from './pages/ShopForm';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/:slug" element={<BookingPage />} />
            
            {/* Rotas Protegidas (Área do Cliente) */}
            <Route 
              path="/client" 
              element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Rotas Protegidas (Dono/Staff) */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                // ALTERADO: 'barbeiro' -> 'staff'
                <ProtectedRoute allowedRoles={['dono', 'staff']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
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
                <ProtectedRoute allowedRoles={['dono']}>
                  <ServicesList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/new" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <ServiceForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/:id" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <ServiceForm />
                </ProtectedRoute>
              } 
            />

            {/* Gestão de Equipe */}
            <Route 
              path="/staff" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <StaffList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/new" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <StaffForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/:id" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <StaffForm />
                </ProtectedRoute>
              } 
            />

            {/* Gestão de Unidades */}
            <Route 
              path="/shops/new" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <ShopForm />
                </ProtectedRoute>
              } 
            />

            {/* Configurações */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={['dono']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}