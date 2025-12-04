import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { servicesApi, categoriesApi } from '../lib/api';
import { Service, Category } from '../../shared/types';
import { ArrowLeft, Loader2, Save, Trash2, Plus } from 'lucide-react';

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedShop } = useTenant();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    duration: 30,
    category_id: '',
    is_active: true,
    required_staff: 1,
    buffer_time: 0
  });

  useEffect(() => {
    if (!selectedShop) return;

    const loadData = async () => {
      try {
        // CORRIGIDO: Removido cast desnecessário
        const cats = await categoriesApi.listByShop(selectedShop.id);
        setCategories(cats);

        if (id) {
          const service = await servicesApi.getById(id);
          setFormData({
            ...service,
            category_id: service.category_id || ''
          });
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados.');
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, selectedShop]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim() || !selectedShop) return;
    
    try {
      // CORRIGIDO: Removido cast desnecessário
      const newCat = await categoriesApi.create({
        name: newCategoryName,
        shop_id: selectedShop.id
      });

      setCategories([...categories, newCat]);
      setFormData({ ...formData, category_id: newCat.id });
      setNewCategoryName('');
      setShowNewCategoryInput(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar categoria.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop) return;

    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        shop_id: selectedShop.id,
      };

      if (id) {
        await servicesApi.update(id, payload);
      } else {
        await servicesApi.create(payload);
      }

      navigate('/services');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao salvar serviço.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm('Tem certeza? Essa ação não pode ser desfeita.')) return;
    setLoading(true);
    try {
      await servicesApi.delete(id);
      navigate('/services');
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir.');
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        <div className="flex items-center justify-between mb-6">
          <Link to="/services" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para Serviços</span>
          </Link>
          {id && (
            <button 
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
              title="Excluir Serviço"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {id ? 'Editar Serviço' : 'Novo Serviço'}
          </h1>
          <p className="text-gray-500 mb-8">Preencha as informações do serviço.</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Serviço</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="Ex: Corte Masculino"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duração (minutos)</label>
                <input
                  type="number"
                  step="5"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                  placeholder="30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              
              {!showNewCategoryInput ? (
                <div className="flex gap-2">
                  <select
                    value={formData.category_id || ''}
                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-white"
                  >
                    <option value="">Sem Categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(true)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Nova Categoria"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    placeholder="Nome da nova categoria"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Criar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição <span className="text-gray-400 font-normal">(Opcional)</span></label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow h-24 resize-none"
                placeholder="Detalhes sobre o serviço..."
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Serviço
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}