import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTenant } from "../contexts/TenantContext";
import { Link } from "react-router-dom";

import ApiClient from "../lib/apiClient";
import { usersApi } from "../lib/api/usersApi";
import { shopsApi } from "../lib/api/shopsApi";
import { shopHoursApi } from "../lib/api/shopHoursApi"; // API da nova tabela
import { paymentMethodsApi } from "../lib/api"; // API de pagamentos

import type { User } from "../../shared/schemas/user";
import type { Shop } from "../../shared/schemas/shop";
import type { ShopHour } from "../../shared/schemas/shopHours";
import type { PaymentMethod } from "../../shared/types"; // Importe o tipo correto se estiver em outro lugar

import { DAYS_OPTIONS } from "../../shared/utils/days"; // Seu utilitário de dias
import { 
  Save, 
  Loader2, 
  ArrowLeft, 
  Store, 
  Clock, 
  MapPin, 
  CreditCard, 
  Power, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2,
  AlertCircle
} from "lucide-react";

const api = new ApiClient();
const userService = usersApi(api);
const shopService = shopsApi(api);
const hoursApi = shopHoursApi(api);

export default function Settings() {
  const { user } = useAuth();
  const { shop, refreshShop } = useTenant();

  // --- ESTADOS ---
  const [userForm, setUserForm] = useState<Partial<User>>({});
  const [shopForm, setShopForm] = useState<Partial<Shop>>({});
  
  // Estado dos Horários (Chave = 'dom', 'seg'...)
  const [schedule, setSchedule] = useState<Record<string, Partial<ShopHour>>>({});

  // Estados de Pagamento
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethodIds, setSelectedMethodIds] = useState<string[]>([]);
  const [newMethodName, setNewMethodName] = useState('');
  const [creatingMethod, setCreatingMethod] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // --- CARREGAMENTO INICIAL ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      if (user) {
        setUserForm({ name: user.name, phone: user.phone });
      }

      if (shop) {
        // 1. Dados Básicos da Loja
        setShopForm({
          name: shop.name,
          phone: shop.phone,
          address: shop.address,
          description: shop.description,
          min_advance_time: shop.min_advance_time,
          max_advance_time: shop.max_advance_time,
          pix_key: shop.pix_key,
          pix_key_type: shop.pix_key_type,
          is_active: shop.is_active,
        });

        // 2. Métodos de Pagamento Selecionados
        setSelectedMethodIds(shop.accepted_payment_methods || []);

        try {
          // 3. Carregar Horários da tabela 'shop_hours'
          const hoursList = await hoursApi.listByShop(shop.company_id, shop.id);
          const scheduleMap: Record<string, Partial<ShopHour>> = {};
          
          hoursList.items.forEach((h) => {
            scheduleMap[h.weekday] = h;
          });

          // Preenche dias faltantes com padrão "Fechado"
          DAYS_OPTIONS.forEach((day) => {
            if (!scheduleMap[day.key]) {
              scheduleMap[day.key] = {
                weekday: day.key as any,
                is_closed: true,
                start_time: "09:00",
                end_time: "18:00",
              };
            }
          });
          setSchedule(scheduleMap);

          // 4. Carregar Métodos de Pagamento Disponíveis da Empresa
          const methods = await paymentMethodsApi.listByCompany(shop.company_id);
          setAvailableMethods(methods);

        } catch (e) {
          console.error("Erro ao carregar dados complementares:", e);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [user, shop]); // Removido 'hoursApi' das dependências para evitar loop

  // --- MANIPULADORES ---

  const handleScheduleChange = (dayKey: string, field: string, value: any) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], [field]: value },
    }));
  };

  const handleCreateMethod = async () => {
    if (!newMethodName.trim() || !shop) return;
    setCreatingMethod(true);
    try {
      const newMethod = await paymentMethodsApi.create({
        name: newMethodName,
        company_id: shop.company_id,
        is_active: true
      });
      // Cast seguro pois sabemos o retorno
      const typedMethod = newMethod as unknown as PaymentMethod;
      
      setAvailableMethods([...availableMethods, typedMethod]);
      setSelectedMethodIds([...selectedMethodIds, typedMethod.id]);
      setNewMethodName('');
    } catch (err) {
      alert('Erro ao criar método de pagamento.');
    } finally {
      setCreatingMethod(false);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    if (!confirm('Excluir este método de pagamento?')) return;
    try {
      await paymentMethodsApi.delete(id);
      setAvailableMethods(availableMethods.filter(m => m.id !== id));
      setSelectedMethodIds(selectedMethodIds.filter(mid => mid !== id));
    } catch (err) {
      alert('Erro ao excluir método.');
    }
  };

  const toggleMethodSelection = (id: string) => {
    setSelectedMethodIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // --- SALVAR TUDO ---
  const saveAll = async () => {
    if (!shop) return;
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Salvar User
      if (user) await userService.update(user.id, userForm);

      // 2. Salvar Loja (Dados + Pagamentos)
      await shopService.update(shop.id, {
        ...shopForm,
        accepted_payment_methods: selectedMethodIds
      });

      // 3. Salvar Horários (Upsert na tabela shop_hours)
      const savePromises = DAYS_OPTIONS.map((day) => {
        const h = schedule[day.key];
        if (!h) return Promise.resolve();

        const payload = {
          company_id: shop.company_id,
          shop_id: shop.id,
          weekday: day.key as any,
          start_time: h.start_time || "09:00",
          end_time: h.end_time || "18:00",
          is_closed: h.is_closed,
        };

        return h.id 
          ? hoursApi.update(h.id, payload)
          : hoursApi.create(payload);
      });

      await Promise.all(savePromises);
      await refreshShop();
      
      // Recarregar IDs dos horários para garantir integridade
      const reloaded = await hoursApi.listByShop(shop.company_id, shop.id);
      const newMap = { ...schedule };
      reloaded.items.forEach(h => { newMap[h.weekday] = h; });
      setSchedule(newMap);

      setSuccessMsg("Todas as configurações foram salvas com sucesso!");
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error(err);
      setErrorMsg("Erro ao salvar. Verifique sua conexão e tente novamente.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600"/></div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Configurações Gerais</h1>
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-2 animate-fade-in">
            <Save className="w-5 h-5" /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5" /> {errorMsg}
          </div>
        )}

        {/* 1. VISIBILIDADE DA LOJA */}
        {shop && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${shopForm.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {shopForm.is_active ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Status da Loja</h2>
                  <p className="text-sm text-gray-500">
                    {shopForm.is_active 
                      ? "Sua loja está visível para clientes." 
                      : "Sua loja está oculta. Ative para receber agendamentos."}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={shopForm.is_active || false}
                  onChange={e => setShopForm({...shopForm, is_active: e.target.checked})}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* 2. DADOS BÁSICOS (Perfil + Loja) */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Perfil */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900">
              <Store className="w-5 h-5 text-purple-600" /> Seu Perfil
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={userForm.name || ''} 
                  onChange={e => setUserForm({...userForm, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Pessoal</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={userForm.phone || ''} 
                  onChange={e => setUserForm({...userForm, phone: e.target.value})} 
                />
              </div>
            </div>
          </div>

          {/* Loja */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900">
              <MapPin className="w-5 h-5 text-purple-600" /> Endereço e Contato
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Loja</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={shopForm.name || ''} 
                  onChange={e => setShopForm({...shopForm, name: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Loja</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={shopForm.phone || ''} 
                    onChange={e => setShopForm({...shopForm, phone: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={shopForm.address || ''} 
                    onChange={e => setShopForm({...shopForm, address: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. HORÁRIOS DE FUNCIONAMENTO (Nova Tabela) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2 text-gray-900">
            <Clock className="w-5 h-5 text-purple-600" /> Horários de Atendimento
          </h2>
          
          <div className="space-y-1">
            {DAYS_OPTIONS.map((day) => {
              const config = schedule[day.key] || {};
              const isOpen = !config.is_closed;

              return (
                <div key={day.key} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isOpen ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3 w-40">
                    <input
                      type="checkbox"
                      id={`day-${day.key}`}
                      checked={isOpen}
                      onChange={(e) => handleScheduleChange(day.key, 'is_closed', !e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor={`day-${day.key}`} className={`font-medium ${isOpen ? 'text-gray-900' : 'text-gray-400'}`}>
                      {day.label}
                    </label>
                  </div>

                  <div className={`flex items-center gap-2 ${!isOpen ? 'opacity-30 pointer-events-none' : ''}`}>
                    <input
                      type="time"
                      value={config.start_time || "09:00"}
                      onChange={(e) => handleScheduleChange(day.key, 'start_time', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <span className="text-gray-400 font-medium text-sm">às</span>
                    <input
                      type="time"
                      value={config.end_time || "18:00"}
                      onChange={(e) => handleScheduleChange(day.key, 'end_time', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. PAGAMENTOS (Pix e Métodos) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2 text-gray-900">
            <CreditCard className="w-5 h-5 text-purple-600" /> Pagamentos e Pix
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Chave</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                value={shopForm.pix_key_type || 'aleatoria'}
                onChange={e => setShopForm({...shopForm, pix_key_type: e.target.value as any})}
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
                <option value="email">Email</option>
                <option value="telefone">Telefone</option>
                <option value="aleatoria">Chave Aleatória</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Chave Pix</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Cole sua chave Pix aqui..."
                value={shopForm.pix_key || ''}
                onChange={e => setShopForm({...shopForm, pix_key: e.target.value})}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Métodos Aceitos</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {availableMethods.map(method => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={selectedMethodIds.includes(method.id)}
                      onChange={() => toggleMethodSelection(method.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700 font-medium">{method.name}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteMethod(method.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Excluir método"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Novo método (ex: Vale Refeição)"
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                value={newMethodName}
                onChange={e => setNewMethodName(e.target.value)}
              />
              <button 
                onClick={handleCreateMethod}
                disabled={creatingMethod || !newMethodName}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {creatingMethod ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4"/>}
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* BOTÃO FLUTUANTE (Mobile) OU FIXO (Desktop) */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:bg-transparent md:border-0 md:p-0 z-20">
          <div className="max-w-4xl mx-auto flex justify-end">
            <button
              onClick={saveAll}
              disabled={saving}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-70 active:scale-95"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Salvar Todas Alterações
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}