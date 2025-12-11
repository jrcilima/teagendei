// src/react-app/App.tsx
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        {/* O AppRouter já contém BrowserRouter — não duplicar aqui */}
        <AppRouter />
      </TenantProvider>
    </AuthProvider>
  );
}
