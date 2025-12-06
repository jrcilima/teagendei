import { createContext, useContext, useEffect, useState } from 'react';
import ApiClient from '../lib/apiClient';
import { usersApi } from '../lib/api/usersApi';
import UserSchema, { type User } from '../../shared/schemas/user';
import { ReactNode } from "react";

const api = new ApiClient();
const userService = usersApi(api);

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  refresh: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Sincroniza com o authStore
  useEffect(() => {
    const unsub = api.pb.authStore.onChange(async (_, model) => {
      if (model) {
        try {
          const validated = UserSchema.parse(model);
          setUser(validated);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    // Carrega sessão existente no boot
    if (api.pb.authStore.model) {
      try {
        const validated = UserSchema.parse(api.pb.authStore.model);
        setUser(validated);
      } catch {
        api.pb.authStore.clear();
        setUser(null);
      }
    }

    setLoading(false);
    return () => unsub();
  }, []);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    setLoading(true);

    const auth = await api.pb
      .collection('users')
      .authWithPassword(email, password);

    const validated = UserSchema.parse(auth.record);
    setUser(validated);

    setLoading(false);
  };

  // 🔐 LOGOUT
  const logout = () => {
    api.pb.authStore.clear();
    setUser(null);
  };

  // 🔄 REFRESH
  const refresh = async () => {
    if (!api.pb.authStore.model?.id) return;

    const latest = await userService.findById(api.pb.authStore.model.id);
    setUser(latest);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
