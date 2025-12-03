import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTenant } from '../contexts/TenantContext';
import { Building2, Store, ArrowRight } from 'lucide-react';
import { companiesApi, shopsApi, segmentsApi } from '../lib/api';
import { Segment } from '../../shared/types';

export default function Onboarding() {
  const { refreshCompany, refreshShops } = useTenant();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [segments, setSegments] = useState<Segment[]>([]);

  const [companyData, setCompanyData] = useState({
    legal_name: '',
    cnpj: '',
  });

  const [shopData, setShopData] = useState({
    name: '',
    slug: '',
    segment_id: 0,
    phone: '',
    address: '',
  });

  useEffect(() => {
    segmentsApi.list().then((data: any) => {
      setSegments(data);
    });
  }, []);

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await companiesApi.create(companyData);
      await refreshCompany();
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar empresa');
    } finally {
      setLoading(false);
    }
  };

  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await shopsApi.create(shopData);
      await refreshShops();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar unidade');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step === 1 ? 'text-purple-400' : 'text-green-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-purple-500' : 'bg-green-500'}`}>
                {step === 1 ? '1' : '✓'}
              </div>
              <span className="ml-2 font-medium">Empresa</span>
            </div>
            
            <div className="w-20 h-0.5 bg-white/20 mx-4"></div>
            
            <div className={`flex items-center ${step === 2 ? 'text-purple-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-purple-500' : 'bg-white/20'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Unidade</span>
            </div>
          </div>

          {/* Step 1: Company */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Cadastre sua Empresa
              </h2>
              <p className="text-gray-300 text-center mb-8">
                Comece informando os dados da sua empresa
              </p>

              <form onSubmit={handleCompanySubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Razão Social
                  </label>
                  <input
                    type="text"
                    value={companyData.legal_name}
                    onChange={(e) => setCompanyData({ ...companyData, legal_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Minha Empresa LTDA"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    value={companyData.cnpj}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setCompanyData({ ...companyData, cnpj: value });
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="00000000000000"
                    maxLength={14}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Criando...' : 'Continuar'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Shop */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Cadastre sua Primeira Unidade
              </h2>
              <p className="text-gray-300 text-center mb-8">
                Agora vamos configurar seu estabelecimento
              </p>

              <form onSubmit={handleShopSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Segmento
                  </label>
                  <select
                    value={shopData.segment_id}
                    onChange={(e) => setShopData({ ...shopData, segment_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Selecione...</option>
                    {segments.map(segment => (
                      <option key={segment.id} value={segment.id} className="bg-slate-800">
                        {segment.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Nome da Unidade
                  </label>
                  <input
                    type="text"
                    value={shopData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setShopData({
                        ...shopData,
                        name,
                        slug: generateSlug(name),
                      });
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Barbearia Centro"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    URL Personalizada
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-white/5 border border-white/20 rounded-l-lg text-gray-400">
                      teagendei.com/
                    </span>
                    <input
                      type="text"
                      value={shopData.slug}
                      onChange={(e) => setShopData({ ...shopData, slug: e.target.value })}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 border-l-0 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={shopData.phone}
                    onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={shopData.address}
                    onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Rua Exemplo, 123 - Bairro"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
                >
                  {loading ? 'Criando...' : 'Finalizar Cadastro'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
