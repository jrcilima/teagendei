import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { pb } from "../lib/pocketbase";
import type { User } from "../../shared/schemas/user";

// Tipagem do contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // 🔥 Helper para carregar o usuário atual do PocketBase
  // --------------------------------------------------
  const loadCurrentUser = () => {
    const model = pb.authStore.model as any;

    if (!model) {
      setUser(null);
      return;
    }

    const typedUser: User = {
      id: model.id,
      created: model.created,
      updated: model.updated,
      email: model.email,
      emailVisibility: model.emailVisibility,
      verified: model.verified,
      name: model.name || "",
      avatar: model.avatar || "",
      role: model.role,
      phone: model.phone,
      is_professional: model.is_professional,
      company_id: model.company_id,
      shop_id: model.shop_id,
      expand: model.expand,
    };

    setUser(typedUser);
  };

  // --------------------------------------------------
  // 🔥 LOGIN
  // --------------------------------------------------
  const login = async (email: string, password: string) => {
    await pb.collection("users").authWithPassword(email, password);
    loadCurrentUser(); // Carrega o usuário imediatamente
  };

  // --------------------------------------------------
  // 🔥 LOGOUT
  // --------------------------------------------------
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  // --------------------------------------------------
  // 🔄 REFRESH DA SESSÃO
  // --------------------------------------------------
  const refreshUser = async () => {
    try {
      await pb.collection("users").authRefresh();
      loadCurrentUser();
    } catch (e) {
      console.error("Erro ao atualizar sessão:", e);
      logout();
    }
  };

  // --------------------------------------------------
  // 🚀 Ao iniciar o app → tenta restaurar a sessão
  // --------------------------------------------------
  useEffect(() => {
    const init = async () => {
      try {
        if (pb.authStore.isValid) {
          await pb.collection("users").authRefresh();
          loadCurrentUser();
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // --------------------------------------------------
  // 🔀 Se a store mudar (login/logout fora do React)
  // --------------------------------------------------
  useEffect(() => {
    return pb.authStore.onChange(() => {
      loadCurrentUser();
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
