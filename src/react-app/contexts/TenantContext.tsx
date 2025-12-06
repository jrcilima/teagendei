import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ApiClient from "../lib/apiClient";
import { shopsApi } from "../lib/api/shopsApi";
import ShopSchema, { type Shop } from "../../shared/schemas/shop";
import { useAuth } from "./AuthContext";

const api = new ApiClient();
const shopService = shopsApi(api);

type TenantContextType = {
  shop: Shop | null;
  loading: boolean;
  refreshShop: () => Promise<void>;
};

const TenantContext = createContext<TenantContextType>({
  shop: null,
  loading: true,
  refreshShop: async () => {},
});

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  const loadShop = async () => {
    if (!user?.shop_id) {
      setShop(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // ✅ aqui é findById, NÃO getById
      const data = await shopService.findById(user.shop_id);
      const validated = ShopSchema.parse(data);
      setShop(validated);
    } catch (err) {
      console.error("Failed to load shop:", err);
      setShop(null);
    } finally {
      setLoading(false);
    }
  };

  // recarrega quando o usuário (e o shop_id) mudar
  useEffect(() => {
    loadShop();
  }, [user?.shop_id]);

  // se o authStore mudar (ex: troca de sessão), recarrega também
  useEffect(() => {
    const unsub = api.pb.authStore.onChange(() => {
      loadShop();
    });
    return () => unsub();
  }, []);

  return (
    <TenantContext.Provider
      value={{
        shop,
        loading,
        refreshShop: loadShop,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
