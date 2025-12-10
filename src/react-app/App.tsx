// src/react-app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </TenantProvider>
    </AuthProvider>
  );
}
