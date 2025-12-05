import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../../shared/types';
import { pb } from '../lib/pocketbase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(pb.authStore.model as User | null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setUser(model as User | null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await pb.collection('users').authWithPassword(email, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    pb.authStore.clear();
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    // ALTERADO: 'barbeiro' -> 'staff'
    role: 'dono' | 'staff' | 'cliente';
    passwordConfirm: string;
  }) => {
    setLoading(true);
    try {
      await pb.collection('users').create({
        ...data,
        emailVisibility: true,
      });
      await pb.collection('users').authWithPassword(data.email, data.password);
    } finally {
      setLoading(false);
    }
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