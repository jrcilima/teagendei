// src/react-app/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/shared/types";
import {
  login as pbLogin,
  logout as pbLogout,
  getCurrentUserTyped,
  refreshAuth,
} from "@/react-app/lib/api/pocketbase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  // login REAL retorna o User autenticado
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa sessão ao montar a app
  useEffect(() => {
    const init = async () => {
      try {
        await refreshAuth();
        const current = await getCurrentUserTyped(); // User | null
        setUser(current);
      } catch (err) {
        console.error("Erro ao inicializar auth", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      await pbLogin(email, password);
      const current = await getCurrentUserTyped(); // User | null

      if (!current) {
        // aqui eliminamos o `null` e garantimos o tipo `User`
        throw new Error("Não foi possível carregar o usuário autenticado.");
      }

      setUser(current);
      return current;
    } catch (err) {
      console.error("Erro no login", err);
      // repassa o erro para a tela tratar
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    pbLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};
