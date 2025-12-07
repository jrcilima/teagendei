import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { usersApi } from '../lib/api';
import { User } from '../../shared/types';
import { ArrowLeft, Loader2, Save, Upload, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

const staffSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  is_professional: z.boolean(),
  password: z.string().optional(),
  passwordConfirm: z.string().optional(),
}).refine(data => {
  if (data.password && data.password !== data.passwordConfirm) {
    return false;
  }
  return true;
}, {
  message: "As senhas não coincidem",
  path: ["passwordConfirm"],
});

type StaffFormData = z.infer<typeof staffSchema> & {
  role: 'staff' | 'dono';
};

export default function StaffForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedShop } = useTenant();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    role: 'staff',
    is_professional: true
  });

  useEffect(() => {
    if (id && selectedShop) {
      usersApi.getById(id)
        .then((data: User) => {
          // SEGURANÇA: Verifica se o profissional pertence à loja selecionada
          if (data.shop_id && data.shop_id !== selectedShop.id) {
            setError('Você não tem permissão para editar este profissional.');
            setTimeout(() => navigate('/staff'), 2000);
            return;
          }

          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            password: '',
            passwordConfirm: '',
            role: data.role as 'staff' | 'dono',
            is_professional: data.is_professional 
          });
          if (data.avatar) {
             const url = `${import.meta.env.VITE_POCKETBASE_URL || 'http://136.248.77.97:8090'}/api/files/users/${data.id}/${data.avatar}`;
             setAvatarPreview(url);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Erro ao carregar dados do profissional.');
        })
        .finally(() => setInitialLoading(false));
    } else if (!id) {
       setInitialLoading(false);
    }
  }, [id, selectedShop, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop) return;
    setError('');

    const validation = staffSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    if (!id && (!formData.password || formData.password.length < 8)) {
      setError('A senha deve ter no mínimo 8 caracteres para novos usuários.');
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('phone', formData.phone || '');
      payload.append('is_professional', String(formData.is_professional));
      
      if (!id) {
        payload.append('email', formData.email);
        payload.append('password', formData.password || '');
        payload.append('passwordConfirm', formData.passwordConfirm || '');
        payload.append('role', 'staff');
        payload.append('shop_id', selectedShop.id);
        payload.append('company_id', selectedShop.company_id);
      }

      if (avatarFile) {
        payload.append('avatar', avatarFile);
      }

      if (id) {
        await usersApi.updateStaff(id, payload);
      } else {
        await usersApi.createStaff(payload);
      }

      navigate('/staff');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao salvar profissional.');
    } finally {
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
          <Link to="/staff" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para Equipe</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {id ? 'Editar Perfil Profissional' : 'Novo Profissional'}
          </h1>
          <p className="text-gray-500 mb-8">
            {id ? 'Atualize as informações do perfil.' : 'Cadastre um novo membro para sua equipe.'}
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-500">Clique para alterar a foto</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="Ex: Ana Silva"
                required
              />
            </div>

            {/* Checkbox "Atende Clientes?" */}
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-3">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="is_professional"
                  type="checkbox"
                  checked={formData.is_professional}
                  onChange={e => setFormData({...formData, is_professional: e.target.checked})}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="is_professional" className="font-medium text-purple-900 block">
                  Realiza atendimentos?
                </label>
                <p className="text-sm text-purple-700 mt-1">
                  Marque se essa pessoa deve aparecer na agenda para os clientes. 
                  <span className="block font-bold mt-1">
                    {formData.role === 'dono' && 'Como você é Dono, marque isso se você também corta cabelo.'}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={!!id}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            {!id && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                <p className="text-sm font-medium text-gray-700">Definir Senha de Acesso</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Senha (min 8 chars)"
                      required={!id}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={e => setFormData({...formData, passwordConfirm: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Confirmar Senha"
                      required={!id}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Profissional
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
