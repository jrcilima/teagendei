import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, AlertTriangle, Clock, CreditCard, Save, ArrowLeft } from 'lucide-react';
import { shopsApi, segmentsApi } from '../lib/api';
import { Segment, Shop } from '../../shared/types';
import { z } from 'zod';

const shopSchema = z.object({
  name: z.string().min(3, "Nome da unidade deve ter no mínimo 3 caracteres"),
  slug: z.string()
    .min(3, "URL deve ter no mínimo 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "URL deve conter apenas letras minúsculas, números e hífens"),
  segment_id: z.string().min(1, "Selecione um segmento"),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  pix_key_type: z.enum(['aleatoria', 'email', 'cnpj', 'cpf', 'telefone']),
  pix_key: z.string().optional(),
  min_advance_time: z.number().min(0, "Tempo mínimo não pode ser negativo"),
  max_advance_time: z.number().min(1, "Agenda deve abrir pelo menos 1 dia"),
});

type ShopFormData = z.infer<typeof shopSchema>;

export default function ShopForm() {
  const { company, refreshShops } = useTenant();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [segments, setSegments] = useState<Segment[]>([]);

  const [shopData, setShopData] = useState<ShopFormData>({
    name: '',
    slug: '',
    segment_id: '',
    phone: '',
    address: '',
    description: '',
    pix_key_type: 'aleatoria',
    pix_key: '',
    min_advance_time: 30,
    max_advance_time: 30,
  });

  useEffect(() => {
    segmentsApi.list().then(setSegments).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !user) {
      setError('Empresa não identificada. Tente recarregar.');
      return;
    }
    setError('');

    const validation = shopSchema.safeParse(shopData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      // CORREÇÃO: manager_id removido
      const apiPayload: Partial<Shop> = {
        ...shopData,
        company_id: company.id,
        owner_id: user.id,
        is_active: true,
      };

      await shopsApi.create(apiPayload);
      await refreshShops();
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Erro ao criar unidade:", err);
      if (err.data?.data?.slug) {
        setError('Esta URL personalizada já está em uso. Escolha outra.');
      } else {
        setError(err.message || 'Erro ao criar unidade.');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nova Unidade</h1>
            <p className="text-gray-500">Cadastre uma nova filial para sua empresa</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Dados Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Segmento</label>
                <select
                  value={shopData.segment_id}
                  onChange={(e) => setShopData({ ...shopData, segment_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                  required
                >
                  <option value="">Selecione o tipo de negócio...</option>
                  {segments.map(segment => (
                    <option key={segment.id} value={segment.id}>{segment.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Unidade</label>
                <input
                  type="text"
                  value={shopData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setShopData({ ...shopData, name, slug: generateSlug(name) });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: Filial Centro"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Personalizada</label>
                <div className="flex items-center">
                  <span className="px-4 py-2 bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg text-gray-500 text-sm">
                    teagendei.com/
                  </span>
                  <input
                    type="text"
                    value={shopData.slug}
                    onChange={(e) => setShopData({ ...shopData, slug: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={shopData.phone}
                  onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={shopData.address}
                  onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Rua, Número, Bairro"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={shopData.description}
                  onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                  placeholder="Breve descrição para seus clientes..."
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4 text-purple-700">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-semibold">Configuração Pix</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={shopData.pix_key_type}
                    onChange={(e) => setShopData({ ...shopData, pix_key_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                  >
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
                    <option value="email">Email</option>
                    <option value="telefone">Telefone</option>
                    <option value="aleatoria">Aleatória</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chave Pix</label>
                  <input
                    type="text"
                    value={shopData.pix_key}
                    onChange={(e) => setShopData({ ...shopData, pix_key: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Chave Pix da unidade"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4 text-purple-700">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Regras de Agenda</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Antecedência Mín. (min)</label>
                  <input
                    type="number"
                    value={shopData.min_advance_time}
                    onChange={(e) => setShopData({ ...shopData, min_advance_time: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agenda Aberta (dias)</label>
                  <input
                    type="number"
                    value={shopData.max_advance_time}
                    onChange={(e) => setShopData({ ...shopData, max_advance_time: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Save className="w-5 h-5" /> Criar Unidade
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
