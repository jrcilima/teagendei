import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { servicesApi } from '../lib/api';
import { Service } from '../../shared/types';
import { Plus, Edit2, Trash2, Clock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function ServicesList() {
  const { selectedShop } = useTenant();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadServices = async () => {
    if (!selectedShop) return;
    setLoading(true);
    try {
      const data = await servicesApi.listByShop(selectedShop.id);
      setServices(data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar os serviços.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [selectedShop]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;
    try {
      await servicesApi.delete(id);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir serviço');
    }
  };

  if (!selectedShop) {
    return (
      <div className="p-8 text-center text-gray-500">
        Selecione uma unidade para gerenciar os serviços.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Catálogo de Serviços</h1>
              <p className="text-gray-500 text-sm">Gerencie os serviços oferecidos na {selectedShop.name}</p>
            </div>
          </div>
          
          <Link
            to="/services/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Novo Serviço
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço cadastrado</h3>
            <p className="text-gray-500 mb-6">Comece adicionando os serviços que você oferece.</p>
            <Link
              to="/services/new"
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Cadastrar primeiro serviço
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    to={`/services/${service.id}`}
                    className="p-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 h-10">
                    {service.description || 'Sem descrição'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    {service.duration} min
                  </span>
                  {/* Mostra o nome da categoria vindo do expand */}
                  {service.expand?.category_id && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      {service.expand.category_id.name}
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-auto">
                  <span className="text-xs text-gray-400 font-medium">PREÇO</span>
                  <div className="flex items-center text-gray-900 font-bold text-lg">
                    <span className="text-sm text-gray-500 mr-1">R$</span>
                    {service.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}