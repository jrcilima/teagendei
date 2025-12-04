import { useEffect, useState } from 'react';
import { useTenant } from '../contexts/TenantContext';
import { shopsApi } from '../lib/api';
import { Shop } from '../../shared/types';
import { Save, Loader2, Clock, MapPin, CreditCard, AlertCircle } from 'lucide-react';

// Tipo local para facilitar a manipulação dos horários
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
  { key: 'sunday', label: 'Domingo' },
];

const DEFAULT_SCHEDULE: DaySchedule = { open: true, start: '09:00', end: '18:00' };

export default function Settings() {
  const { selectedShop, refreshShops } = useTenant();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Estados do formulário
  const [generalData, setGeneralData] = useState({
    phone: '',
    address: '',
    description: '',
    pix_key: '',
    pix_key_type: 'aleatoria',
  });

  const [schedule, setSchedule] = useState<BusinessHours>({});

  // Carregar dados
  useEffect(() => {
    if (selectedShop) {
      setGeneralData({
        phone: selectedShop.phone || '',
        address: selectedShop.address || '',
        description: selectedShop.description || '',
        pix_key: selectedShop.pix_key || '',
        pix_key_type: selectedShop.pix_key_type || 'aleatoria',
      });

      // Inicializa horários (se já existir no banco, usa. Senão, padrão fechado ou default)
      const currentHours = selectedShop.business_hours as BusinessHours || {};
      const initialSchedule: BusinessHours = {};
      
      DAYS.forEach(day => {
        if (currentHours[day.key]) {
          initialSchedule[day.key] = currentHours[day.key];
        } else {
          // Padrão: dias de semana abertos, fim de semana fechado
          const isWeekend = day.key === 'saturday' || day.key === 'sunday';
          initialSchedule[day.key] = { 
            open: !isWeekend, 
            start: '09:00', 
            end: '18:00' 
          };
        }
      });
      setSchedule(initialSchedule);
    }
  }, [selectedShop]);

  const handleScheduleChange = (dayKey: string, field: keyof DaySchedule, value: any) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value
      }
    }));
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
        business_hours: schedule, // Salva o JSON completo
      } as Partial<Shop>);

      await refreshShops(); // Atualiza contexto global
      setSuccess('Configurações salvas com sucesso!');
      
      // Remove mensagem de sucesso após 3s
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar as configurações.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedShop) return <div className="p-8 text-center">Selecione uma loja.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configurações da Loja</h1>
          <p className="text-gray-500">Gerencie horários e informações de contato da {selectedShop.name}</p>
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
          
          {/* Seção 1: Informações Gerais */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Informações Básicas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={generalData.phone}
                  onChange={e => setGeneralData({...generalData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
                <input
                  type="text"
                  value={generalData.address}
                  onChange={e => setGeneralData({...generalData, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Rua, Número, Bairro, Cidade"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição (Bio)</label>
                <textarea
                  value={generalData.description}
                  onChange={e => setGeneralData({...generalData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                  placeholder="Fale um pouco sobre seu estabelecimento..."
                />
              </div>
            </div>
          </div>

          {/* Seção 2: Horário de Funcionamento */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Horários de Funcionamento</h2>
            </div>

            <div className="space-y-4">
              {DAYS.map((day) => {
                const dayConfig = schedule[day.key] || DEFAULT_SCHEDULE;
                
                return (
                  <div key={day.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex items-center gap-4 mb-2 sm:mb-0 w-40">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={dayConfig.open}
                          onChange={(e) => handleScheduleChange(day.key, 'open', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                      <span className={`font-medium ${dayConfig.open ? 'text-gray-900' : 'text-gray-400'}`}>
                        {day.label}
                      </span>
                    </div>

                    <div className={`flex items-center gap-2 ${!dayConfig.open ? 'opacity-30 pointer-events-none' : ''}`}>
                      <input
                        type="time"
                        value={dayConfig.start}
                        onChange={(e) => handleScheduleChange(day.key, 'start', e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <span className="text-gray-400">até</span>
                      <input
                        type="time"
                        value={dayConfig.end}
                        onChange={(e) => handleScheduleChange(day.key, 'end', e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seção 3: Pagamento */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Dados Bancários (Pix)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Chave</label>
                <select
                  value={generalData.pix_key_type}
                  onChange={e => setGeneralData({...generalData, pix_key_type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">Email</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave Aleatória</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chave Pix</label>
                <input
                  type="text"
                  value={generalData.pix_key}
                  onChange={e => setGeneralData({...generalData, pix_key: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Insira sua chave aqui"
                />
              </div>
            </div>
          </div>

          {/* Botão Salvar Fixo no Final */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Alterações</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}