// src/react-app/routes/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "@/shared/types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: ReactNode;
}

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  dono: "/owner/dashboard",
  staff: "/staff/agenda",
  cliente: "/client",
};

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth(); // <-- nomes reais
  const location = useLocation();

  // Estado de carregamento inicial
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Não autenticado → volta ao login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user.role as UserRole;

  // Se rota requer role, validar
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const fallback = DEFAULT_ROUTE_BY_ROLE[userRole] ?? "/";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
