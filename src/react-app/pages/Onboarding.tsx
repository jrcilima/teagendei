import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Store, ArrowRight, Loader2, AlertTriangle, Clock, CreditCard, UserCheck } from 'lucide-react';
import { companiesApi, shopsApi, segmentsApi, authApi } from '../lib/api';
import { Segment, Company, Shop } from '../../shared/types'; // Import Shop type

// Define a local type for the form state that matches the Shop interface but allows for form handling
interface ShopFormData {
  name: string;
  slug: string;
  segment_id: string;
  phone: string;
  address: string;
  description: string;
  pix_key_type: 'aleatoria' | 'email' | 'cnpj' | 'cpf' | 'telefone'; // Explicitly typed
  pix_key: string;
  min_advance_time: number;
  max_advance_time: number;
}

export default function Onboarding() {
  const { refreshCompany, refreshShops } = useTenant();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [segments, setSegments] = useState<Segment[]>([]);
  // Novo estado para saber se o dono também atende
  const [isProfessional, setIsProfessional] = useState(true);

  const [companyData, setCompanyData] = useState({
    legal_name: '',
    cnpj: '',
  });

  const [createdCompany, setCreatedCompany] = useState<Company | null>(null);

  // Initialize state with the correct type
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
    segmentsApi.list().then((data: any) => {
      setSegments(data);
    }).catch(console.error);
  }, []);

  const formatValidationErrors = (data: any) => {
    if (!data) return 'Dados inválidos.';
    
    return Object.entries(data)
      .map(([field, err]: [string, any]) => {
        const fieldName = field === 'slug' ? 'URL' : 
                          field === 'min_advance_time' ? 'Tempo Mínimo' : field;
        return `${fieldName}: ${err.message}`;
      })
      .join(' | ');
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setError('');
    setLoading(true);

    try {
      const company = await companiesApi.create({
        ...companyData,
        owner_id: user.id,
        plan_status: 'trial',
        plan_type: 'empresarial'
      }) as unknown as Company;
      
      setCreatedCompany(company);

      await authApi.updateProfile(user.id, {
        company_id: company.id,
        role: 'dono'
      });

      await refreshCompany();
      setStep(2);
    } catch (err: any) {
      console.error("Erro criar empresa:", err);
      if (err.status === 403) {
        setError('Permissão negada (403). Verifique regras da coleção "companies".');
      } else if (err.status === 400) {
        setError(`Erro de validação: ${formatValidationErrors(err.data?.data)}`);
      } else {
        setError(err.message || 'Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdCompany || !user) return;

    setError('');
    setLoading(true);

    try {
      // Cast the payload to Partial<Shop> to satisfy TypeScript
      const payload: any = { 
        ...shopData,
        min_advance_time: Number(shopData.min_advance_time),
        max_advance_time: Number(shopData.max_advance_time),
        company_id: createdCompany.id,
        manager_id: user.id,
        owner_id: user.id,
        is_active: true,
        pix_key_type: shopData.pix_key_type // O tipo já está validado pelo TypeScript
      };

      const shop = await shopsApi.create(payload);
      
      // Lógica Automática: Se o dono também é profissional
      if (isProfessional) {
        console.log("Configurando dono como profissional...");
        // Atualiza o perfil do usuário para vinculá-lo a esta unidade (shop_id)
        // E garante que ele tenha o papel de 'dono' (que também pode atuar como staff na lógica do app)
        await authApi.updateProfile(user.id, {
          shop_id: shop.id,
          // Se sua lógica de permissão separar estritamente 'dono' de 'staff', 
          // talvez você precise de um campo extra 'is_professional: true' no user.
          // Por enquanto, vamos apenas vincular a loja.
        });
      }
      
      await refreshShops();
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Erro criar unidade:", err);
      if (err.status === 403) {
        setError('Permissão negada (403). Verifique regras da coleção "shops".');
      } else if (err.status === 400) {
        setError(`Erro de validação: ${formatValidationErrors(err.data?.data)}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          
          {/* Steps Header */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step === 1 ? 'text-purple-400' : 'text-green-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'}`}>
                {step === 1 ? '1' : '✓'}
              </div>
              <span className="ml-2 font-medium">Empresa</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20 mx-4"></div>
            <div className={`flex items-center ${step === 2 ? 'text-purple-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-purple-500 text-white' : 'bg-white/20 text-gray-500'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Unidade</span>
            </div>
          </div>

          {step === 1 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">Cadastre sua Empresa</h2>
              <p className="text-gray-300 text-center mb-8">Dados fiscais da sua organização</p>

              <form onSubmit={handleCompanySubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Razão Social</label>
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
                  <label className="block text-sm font-medium text-gray-200 mb-2">CNPJ</label>
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
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continuar <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">Configure sua Unidade</h2>
              
              <form onSubmit={handleShopSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Segmento</label>
                    <select
                      value={shopData.segment_id}
                      onChange={(e) => setShopData({ ...shopData, segment_id: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:text-black"
                      required
                    >
                      <option value="">Selecione...</option>
                      {segments.map(segment => (
                        <option key={segment.id} value={segment.id}>{segment.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Nome da Unidade</label>
                    <input
                      type="text"
                      value={shopData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setShopData({ ...shopData, name, slug: generateSlug(name) });
                      }}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: Unidade Centro"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">URL Personalizada</label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 bg-white/5 border border-white/20 rounded-l-lg text-gray-400 text-sm">teagendei.com/</span>
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
                    <label className="block text-sm font-medium text-gray-200 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={shopData.phone}
                      onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={shopData.address}
                      onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Rua, Número, Bairro"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Descrição</label>
                    <textarea
                      value={shopData.description}
                      onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                      placeholder="Uma breve descrição do seu negócio..."
                    />
                  </div>
                </div>

                {/* Pergunta sobre atendimento */}
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <UserCheck className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Você atenderá clientes?</h3>
                        <p className="text-purple-200 text-sm">Se ativado, você será cadastrado como profissional nesta unidade.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isProfessional} 
                        onChange={(e) => setIsProfessional(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                {/* Pagamento Pix */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-4 text-purple-300">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Configuração Pix</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Tipo de Chave</label>
                      <select
                        value={shopData.pix_key_type}
                        onChange={(e) => setShopData({ ...shopData, pix_key_type: e.target.value as any })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:text-black"
                      >
                        <option value="cpf">CPF</option>
                        <option value="cnpj">CNPJ</option>
                        <option value="email">Email</option>
                        <option value="telefone">Telefone</option>
                        <option value="aleatoria">Chave Aleatória</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-200 mb-2">Chave Pix</label>
                      <input
                        type="text"
                        value={shopData.pix_key}
                        onChange={(e) => setShopData({ ...shopData, pix_key: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Insira sua chave Pix"
                      />
                    </div>
                  </div>
                </div>

                {/* Regras de Agendamento */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-4 text-purple-300">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Regras de Agendamento</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2" title="Tempo mínimo antes do agendamento">
                        Antecedência Mín. (min)
                      </label>
                      <input
                        type="number"
                        value={shopData.min_advance_time}
                        onChange={(e) => setShopData({ ...shopData, min_advance_time: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2" title="Até quantos dias para frente a agenda abre">
                        Agenda Aberta (dias)
                      </label>
                      <input
                        type="number"
                        value={shopData.max_advance_time}
                        onChange={(e) => setShopData({ ...shopData, max_advance_time: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                 
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
                >
                  {loading ? 'Finalizando...' : 'Finalizar Cadastro'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}