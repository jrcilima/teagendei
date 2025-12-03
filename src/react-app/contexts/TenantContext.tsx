import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Company, Shop } from '../../shared/types';
import { useAuth } from './AuthContext';
import { companiesApi, shopsApi } from '../lib/api';

interface TenantContextType {
  company: Company | null;
  shops: Shop[];
  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop | null) => void;
  refreshCompany: () => Promise<void>;
  refreshShops: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const refreshCompany = async () => {
    if (!user) return;
    try {
      const companies = await companiesApi.list();
      if (companies.length > 0) {
        setCompany(companies[0]);
      }
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  };

  const refreshShops = async () => {
    if (!user) return;
    try {
      const shopsList = await shopsApi.list();
      setShops(shopsList);
      
      if (shopsList.length > 0 && !selectedShop) {
        setSelectedShop(shopsList[0]);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  useEffect(() => {
    if (user) {
      refreshCompany();
      refreshShops();
    } else {
      setCompany(null);
      setShops([]);
      setSelectedShop(null);
    }
  }, [user]);

  return (
    <TenantContext.Provider
      value={{
        company,
        shops,
        selectedShop,
        setSelectedShop,
        refreshCompany,
        refreshShops,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}