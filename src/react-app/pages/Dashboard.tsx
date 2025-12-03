import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Store, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Clock,
  LogOut,
  Loader2
} from 'lucide-react';
import { Service } from '../../shared/types';
import { servicesApi } from '../lib/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { company, shops, selectedShop, setSelectedShop, loading: tenantLoading } = useTenant();
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (selectedShop) {
      setServicesLoading(true);
      servicesApi.listByShop(selectedShop.id)
        .then((data: any) => {
          if (mounted) setServices(data);
        })
        .catch(console.error)
        .finally(() => {
          if (mounted) setServicesLoading(false);
        });
    }
    return () => { mounted = false; };
  }, [selectedShop]);

  if (tenantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Você ainda não possui uma empresa cadastrada
          </h2>
          <p className="text-gray-600 mb-6">Complete seu cadastro para começar a usar o sistema.</p>
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teagendei</h1>
              <p className="text-sm text-gray-600">{company.legal_name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {shops.length > 0 && (
                <select
                  value={selectedShop?.id || ''}
                  onChange={(e) => {
                    const shop = shops.find(s => s.id === e.target.value);
                    setSelectedShop(shop || null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  {shops.map(shop => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name}
                    </option>
                  ))}
                </select>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
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

        {/* Navigation Grid - Resolves unused Settings warning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/appointments"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group flex flex-col items-center text-center hover:border-purple-500"
          >
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Agenda</h3>
            <p className="text-sm text-gray-500">Gerenciar agendamentos</p>
          </Link>

          <Link
            to="/services"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group flex flex-col items-center text-center hover:border-pink-500"
          >
            <div className="p-3 bg-pink-100 text-pink-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Serviços</h3>
            <p className="text-sm text-gray-500">Catálogo de serviços</p>
          </Link>

          <Link
            to="/staff"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group flex flex-col items-center text-center hover:border-blue-500"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Equipe</h3>
            <p className="text-sm text-gray-500">Gerenciar profissionais</p>
          </Link>

          <Link
            to="/settings"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group flex flex-col items-center text-center hover:border-gray-500"
          >
            <div className="p-3 bg-gray-100 text-gray-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Configurações</h3>
            <p className="text-sm text-gray-500">Ajustes da unidade</p>
          </Link>
        </div>

        {selectedShop ? (
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
              {servicesLoading ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                </div>
              ) : services.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Nenhum serviço cadastrado ainda</p>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Selecione uma unidade para ver os detalhes.</p>
          </div>
        )}
      </main>
    </div>
  );
}