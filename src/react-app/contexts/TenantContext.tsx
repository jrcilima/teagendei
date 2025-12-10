// src/react-app/contexts/TenantContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Company, Shop } from '@/shared/types';
import {
  getMyCompanies,
  getShopsByCompany,
} from '@/react-app/lib/api/pocketbase';
import { useAuth } from './AuthContext';

type TenantContextType = {
  currentCompany: Company | null;
  currentShop: Shop | null;
  companies: Company[];
  shops: Shop[];
  setCurrentCompany: (company: Company | null) => void;
  setCurrentShop: (shop: Shop | null) => void;
  reloadTenants: () => Promise<void>;
  refreshTenant: () => Promise<void>; // ✅ alias para o register usar
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const TenantProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [currentCompany, setCurrentCompanyState] = useState<Company | null>(null);
  const [currentShop, setCurrentShopState] = useState<Shop | null>(null);

  const load = async () => {
    if (!user) {
      setCompanies([]);
      setShops([]);
      setCurrentCompanyState(null);
      setCurrentShopState(null);
      return;
    }

    const comps = await getMyCompanies();
    setCompanies(comps);

    if (comps.length === 0) {
      setCurrentCompanyState(null);
      setShops([]);
      setCurrentShopState(null);
      return;
    }

    const company = comps[0];
    setCurrentCompanyState(company);

    const sh = await getShopsByCompany(company.id);
    setShops(sh);
    setCurrentShopState(sh[0] ?? null);
  };

  // Recarrega tenants quando o user muda (login/logout)
  useEffect(() => {
    void load();
  }, [user?.id]);

  const setCurrentCompany = (company: Company | null) => {
    setCurrentCompanyState(company);

    if (!company) {
      setShops([]);
      setCurrentShopState(null);
      return;
    }

    getShopsByCompany(company.id).then((sh) => {
      setShops(sh);
      setCurrentShopState(sh[0] ?? null);
    });
  };

  const setCurrentShop = (shop: Shop | null) => {
    setCurrentShopState(shop);
  };

  return (
    <TenantContext.Provider
      value={{
        currentCompany,
        currentShop,
        companies,
        shops,
        setCurrentCompany,
        setCurrentShop,
        reloadTenants: load,
        refreshTenant: load, // ✅ aqui o alias que o RegisterPage espera
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }
  return ctx;
};
