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
  loading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCompany = async () => {
    if (!user) return;
    try {
      const companies = await companiesApi.list();
      // Assumes the owner has only one company for now
      if (companies && companies.length > 0) {
        setCompany(companies[0]);
      } else {
        setCompany(null);
      }
    } catch (error) {
      console.error('Error fetching company:', error);
      setCompany(null);
    }
  };

  const refreshShops = async () => {
    if (!user) return;
    try {
      const shopsList = await shopsApi.list();
      setShops(shopsList);
      
      if (shopsList.length > 0) {
        // Se não tiver loja selecionada, seleciona a primeira
        if (!selectedShop) {
          setSelectedShop(shopsList[0]);
        } else {
          // SE JÁ TIVER, ATUALIZA OS DADOS DELA COM A VERSÃO NOVA DO BANCO
          // Isso corrige o bug de "salvei mas a tela mostra dados antigos"
          const updatedSelected = shopsList.find(s => s.id === selectedShop.id);
          if (updatedSelected) {
            setSelectedShop(updatedSelected);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setShops([]);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (user && mounted) {
        setLoading(true);
        await Promise.all([refreshCompany(), refreshShops()]);
        setLoading(false);
      } else if (!user && mounted) {
        setCompany(null);
        setShops([]);
        setSelectedShop(null);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
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
        loading
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