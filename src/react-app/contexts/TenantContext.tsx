import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import ApiClient from "../lib/api/apiClient";

// Importando as fábricas de serviços
import { usersApi } from "../lib/api/usersApi";
import { shopsApi } from "../lib/api/shopsApi";
import { servicesApi } from "../lib/api/servicesApi";
import { appointmentsApi } from "../lib/api/appointmentsApi";
import { shopHoursApi } from "../lib/api/shopHoursApi";
import { paymentMethodsApi } from "../lib/api/paymentMethodsApi";

// Importando Tipos e Schemas
import type { Shop } from "../../shared/schemas/shop";
import type { User } from "../../shared/schemas/user"; // Importante para o cast

// Instância única do cliente API
const api = new ApiClient();

// Criando as instâncias dos serviços
const userServiceInstance = usersApi(api);
const shopServiceInstance = shopsApi(api);
const servicesApiInstance = servicesApi(api);
const appointmentsApiInstance = appointmentsApi(api);
const shopHoursApiInstance = shopHoursApi(api);
const paymentMethodsApiInstance = paymentMethodsApi(api);

// Tipo do Contexto (Inferindo tipos automaticamente das instâncias)
interface TenantContextData {
  shop: Shop | null;
  loading: boolean;
  refreshShop: () => Promise<void>;
  
  // Expondo os serviços e o cliente
  api: ApiClient;
  userService: typeof userServiceInstance;
  shopService: typeof shopServiceInstance;
  servicesService: typeof servicesApiInstance;
  appointmentsService: typeof appointmentsApiInstance;
  shopHoursService: typeof shopHoursApiInstance;
  paymentMethodsService: typeof paymentMethodsApiInstance;
}

const TenantContext = createContext<TenantContextData>({} as TenantContextData);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth(); // O user aqui pode vir com tipagem genérica
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  const loadShop = async () => {
    // Casting de segurança: Tratamos o user como nosso tipo User completo
    const currentUser = user as unknown as User;

    if (!currentUser) {
      setShop(null);
      setLoading(false);
      return;
    }

    try {
      // 1. Tenta carregar pelo ID vinculado direto no usuário (ideal)
      if (currentUser.shop_id) {
        const data = await shopServiceInstance.findById(currentUser.shop_id);
        setShop(data);
      } 
      // 2. Fallback: Se for dono, busca a loja onde ele é owner
      else if (currentUser.role === 'dono') {
        const shops = await api.list<Shop>('shops', {
          filter: `owner_id = "${currentUser.id}"`,
          perPage: 1
        });
        setShop(shops.items[0] || null);
      } else {
        setShop(null);
      }
    } catch (err) {
      console.error("Erro ao carregar loja:", err);
      setShop(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShop();
  }, [user]);

  return (
    <TenantContext.Provider
      value={{
        shop,
        loading,
        refreshShop: loadShop,
        api,
        userService: userServiceInstance,
        shopService: shopServiceInstance,
        servicesService: servicesApiInstance,
        appointmentsService: appointmentsApiInstance,
        shopHoursService: shopHoursApiInstance,
        paymentMethodsService: paymentMethodsApiInstance,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);