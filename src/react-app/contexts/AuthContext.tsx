import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../../shared/types';
import { authApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'dono' | 'staff' | 'cliente';
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token salvo
    const token = localStorage.getItem('auth_token');
    if (token) {
      authApi
        .getMe()
        .then((userData) => {
          setUser(userData as User);
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    localStorage.setItem('auth_token', response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'dono' | 'staff' | 'cliente';
  }) => {
    const response: any = await authApi.register(data);
    localStorage.setItem('auth_token', response.token);
    setUser(response.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
