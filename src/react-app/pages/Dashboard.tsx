import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { Link } from 'react-router';
import { 
  Calendar, 
  Store, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Clock,
  LogOut
} from 'lucide-react';
import { Service } from '../../shared/types';
import { servicesApi } from '../lib/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { company, shops, selectedShop, setSelectedShop } = useTenant();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (selectedShop) {
      servicesApi.listByShop(selectedShop.id).then((data: any) => {
        setServices(data);
      });
    }
  }, [selectedShop]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Você ainda não possui uma empresa cadastrada
          </h2>
          <Link
            to="/onboarding"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Cadastrar Empresa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teagendei</h1>
              <p className="text-sm text-gray-600">{company.legal_name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {shops.length > 1 && (
                <select
                  value={selectedShop?.id || ''}
                  onChange={(e) => {
                    const shop = shops.find(s => s.id === parseInt(e.target.value));
                    setSelectedShop(shop || null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {shops.map(shop => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name}
                    </option>
                  ))}
                </select>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">24</h3>
            <p className="text-sm text-gray-600">Agendamentos Hoje</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">R$ 1.850</h3>
            <p className="text-sm text-gray-600">Faturamento Hoje</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-sm text-gray-600">Profissionais Ativos</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">85%</h3>
            <p className="text-sm text-gray-600">Taxa de Ocupação</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/appointments"
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all group"
          >
            <Calendar className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Agenda</h3>
            <p className="text-purple-200 text-sm">Gerenciar agendamentos</p>
          </Link>

          <Link
            to="/services"
            className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all group"
          >
            <Store className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Serviços</h3>
            <p className="text-pink-200 text-sm">Catálogo de serviços</p>
          </Link>

          <Link
            to="/staff"
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all group"
          >
            <Users className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Equipe</h3>
            <p className="text-blue-200 text-sm">Gerenciar profissionais</p>
          </Link>

          <Link
            to="/settings"
            className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all group"
          >
            <Settings className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Configurações</h3>
            <p className="text-gray-200 text-sm">Configurar unidade</p>
          </Link>
        </div>

        {/* Services List */}
        {selectedShop && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Serviços de {selectedShop.name}
              </h2>
              <Link
                to="/services/new"
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Novo Serviço
              </Link>
            </div>
            
            <div className="divide-y divide-gray-200">
              {services.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Nenhum serviço cadastrado ainda</p>
                  <Link
                    to="/services/new"
                    className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cadastrar Primeiro Serviço
                  </Link>
                </div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>⏱️ {service.duration} min</span>
                          {service.category && <span>📁 {service.category}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">
                          R$ {service.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
