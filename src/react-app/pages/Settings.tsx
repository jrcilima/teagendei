import { useEffect, useState } from 'react';
import { useTenant } from '../contexts/TenantContext';
import { shopsApi, paymentMethodsApi } from '../lib/api';
import { PaymentMethod } from '../../shared/types';
import {
  Save,
  Loader2,
  Clock,
  MapPin,
  CreditCard,
  AlertCircle,
  ArrowLeft,
  Plus,
  Trash2,
  Power,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

type DaySchedule = {
  open: boolean;
  start: string;
  end: string;
};

type BusinessHours = {
  [key: string]: DaySchedule;
};

const DAYS = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
];

const DEFAULT_SCHEDULE: DaySchedule = {
  open: true,
  start: '09:00',
  end: '18:00'
};

export default function Settings() {
  const { selectedShop, refreshShops } = useTenant();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Estados Gerais
  const [generalData, setGeneralData] = useState({
    phone: '',
    address: '',
    description: '',
    pix_key: '',
    pix_key_type: 'aleatoria' as 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria',
    is_active: false 
  });

  // Horários
  const [schedule, setSchedule] = useState<BusinessHours>({});

  // Métodos de Pagamento
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethodIds, setSelectedMethodIds] = useState<string[]>([]);
  const [newMethodName, setNewMethodName] = useState('');
  const [creatingMethod, setCreatingMethod] = useState(false);

  // Carregar dados
  useEffect(() => {
    if (selectedShop) {
      // 1. Carrega dados gerais
      setGeneralData({
        phone: selectedShop.phone || '',
        address: selectedShop.address || '',
        description: selectedShop.description || '',
        pix_key: selectedShop.pix_key || '',
        pix_key_type: selectedShop.pix_key_type || 'aleatoria',
        is_active: selectedShop.is_active || false
      });

      // 2. Carrega horários
      const currentHours = (selectedShop.business_hours as BusinessHours) || {};
      const initialSchedule: BusinessHours = {};

      DAYS.forEach((day) => {
        if (currentHours[day.key]) {
          initialSchedule[day.key] = currentHours[day.key];
        } else {
          const isWeekend = day.key === 'saturday' || day.key === 'sunday';
          initialSchedule[day.key] = {
            open: !isWeekend,
            start: '09:00',
            end: '18:00'
          };
        }
      });
      setSchedule(initialSchedule);

      // 3. Carrega métodos selecionados
      setSelectedMethodIds(selectedShop.accepted_payment_methods || []);

      // 4. Busca métodos da empresa no banco
      loadPaymentMethods();
    }
  }, [selectedShop]);

  const loadPaymentMethods = async () => {
    if (!selectedShop) return;
    try {
      const methods = await paymentMethodsApi.listByCompany(
        selectedShop.company_id
      );
      setAvailableMethods(methods);
    } catch (err) {
      console.error('Erro ao carregar métodos:', err);
    }
  };

  const handleScheduleChange = (
    dayKey: string,
    field: keyof DaySchedule,
    value: any
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value
      }
    }));
  };

  const handleCreateMethod = async () => {
    if (!newMethodName.trim() || !selectedShop) return;
    setCreatingMethod(true);
    try {
      // API retorna RecordModel que é compatível com PaymentMethod
      const newMethod = await paymentMethodsApi.create({
        name: newMethodName,
        company_id: selectedShop.company_id,
        is_active: true
      });

      // Conversão segura pois sabemos que o create retorna a estrutura correta
      const typedMethod = newMethod as unknown as PaymentMethod;

      setAvailableMethods([...availableMethods, typedMethod]);
      setSelectedMethodIds([...selectedMethodIds, typedMethod.id]);
      setNewMethodName('');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar método.');
    } finally {
      setCreatingMethod(false);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este método de pagamento?'))
      return;
    try {
      await paymentMethodsApi.delete(id);
      setAvailableMethods(availableMethods.filter((m) => m.id !== id));
      setSelectedMethodIds(selectedMethodIds.filter((mid) => mid !== id));
    } catch (err) {
      alert('Erro ao excluir.');
    }
  };

  const toggleMethodSelection = (id: string) => {
    if (selectedMethodIds.includes(id)) {
      setSelectedMethodIds(selectedMethodIds.filter((mid) => mid !== id));
    } else {
      setSelectedMethodIds([...selectedMethodIds, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop) return;

    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await shopsApi.update(selectedShop.id, {
        ...generalData,
        business_hours: schedule,
        accepted_payment_methods: selectedMethodIds
      });

      await refreshShops();
      setSuccess('Configurações salvas com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar as configurações.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedShop)
    return <div className="p-8 text-center">Selecione uma loja.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Configurações da Loja
            </h1>
            <p className="text-gray-500">
              Gerencie visibilidade, horários e informações de contato
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-2 animate-fade-in">
            <Save className="w-5 h-5" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção Visibilidade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Power className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Status da Loja
              </h2>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    generalData.is_active
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {generalData.is_active ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {generalData.is_active ? 'Loja Ativa' : 'Loja Oculta'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {generalData.is_active
                      ? 'Sua loja está visível para clientes na busca.'
                      : 'Sua loja está oculta e não aparecerá nas buscas.'}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={generalData.is_active}
                  onChange={(e) =>
                    setGeneralData({
                      ...generalData,
                      is_active: e.target.checked
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          {/* Seção Informações Gerais */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Informações Básicas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={generalData.phone}
                  onChange={(e) =>
                    setGeneralData({ ...generalData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  value={generalData.address}
                  onChange={(e) =>
                    setGeneralData({ ...generalData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Rua, Número, Bairro, Cidade"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição (Bio)
                </label>
                <textarea
                  value={generalData.description}
                  onChange={(e) =>
                    setGeneralData({
                      ...generalData,
                      description: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                  placeholder="Fale um pouco sobre seu estabelecimento..."
                />
              </div>
            </div>
          </div>

          {/* Seção Horário de Funcionamento */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Horários de Funcionamento
              </h2>
            </div>

            <div className="space-y-4">
              {DAYS.map((day) => {
                const dayConfig = schedule[day.key] || DEFAULT_SCHEDULE;

                return (
                  <div
                    key={day.key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-2 sm:mb-0 w-40">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={dayConfig.open}
                          onChange={(e) =>
                            handleScheduleChange(
                              day.key,
                              'open',
                              e.target.checked
                            )
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                      <span
                        className={`font-medium ${
                          dayConfig.open ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {day.label}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-2 ${
                        !dayConfig.open ? 'opacity-30 pointer-events-none' : ''
                      }`}
                    >
                      <input
                        type="time"
                        value={dayConfig.start}
                        onChange={(e) =>
                          handleScheduleChange(day.key, 'start', e.target.value)
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <span className="text-gray-400">até</span>
                      <input
                        type="time"
                        value={dayConfig.end}
                        onChange={(e) =>
                          handleScheduleChange(day.key, 'end', e.target.value)
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seção Pagamento */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Formas de Pagamento
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Selecione quais métodos esta unidade aceita ou crie novos.
              </p>

              <div className="space-y-3 mb-6">
                {availableMethods.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    Nenhum método cadastrado. Crie um abaixo.
                  </p>
                )}

                {availableMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedMethodIds.includes(method.id)}
                        onChange={() => toggleMethodSelection(method.id)}
                        className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                      <span className="font-medium text-gray-800">
                        {method.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMethod(method.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Excluir método"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Criar novo método */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  placeholder="Ex: Cartão Elo, Vale Alimentação..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleCreateMethod}
                  disabled={creatingMethod || !newMethodName}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {creatingMethod ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Adicionar
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chave Pix da Unidade (Opcional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={generalData.pix_key_type}
                  onChange={(e) =>
                    setGeneralData({
                      ...generalData,
                      pix_key_type: e.target.value as any
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">Email</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave Aleatória</option>
                </select>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={generalData.pix_key}
                    onChange={(e) =>
                      setGeneralData({
                        ...generalData,
                        pix_key: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Insira sua chave aqui"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" /> Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}