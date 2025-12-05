import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { usersApi } from '../lib/api';
import { User } from '../../shared/types';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Loader2,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  Shield,
  Scissors
} from 'lucide-react';

export default function StaffList() {
  const { selectedShop } = useTenant();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStaff = async () => {
    if (!selectedShop) return;
    setLoading(true);
    try {
      const data = await usersApi.listStaffByShop(selectedShop.id);
      setStaff(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [selectedShop]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este membro da equipe?'))
      return;
    try {
      await usersApi.deleteStaff(id);
      setStaff(staff.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao remover funcionário');
    }
  };

  const getAvatarUrl = (user: User) => {
    if (!user.avatar) return null;
    return `${
      import.meta.env.VITE_POCKETBASE_URL || 'http://136.248.77.97:8090'
    }/api/files/users/${user.id}/${user.avatar}`;
  };

  if (!selectedShop) {
    return (
      <div className="p-8 text-center text-gray-500">
        Selecione uma unidade para gerenciar a equipe.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Equipe</h1>
              <p className="text-gray-500 text-sm">
                Gerencie os profissionais da {selectedShop.name}
              </p>
            </div>
          </div>

          <Link
            to="/staff/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Novo Profissional
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : staff.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Cadastre sua equipe para começar a receber agendamentos.
            </p>
            <Link
              to="/staff/new"
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Cadastrar primeiro profissional
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/staff/${member.id}`}
                    className="p-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  {member.role !== 'dono' && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    {getAvatarUrl(member) ? (
                      <img
                        src={getAvatarUrl(member)!}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {member.name}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    {/* Badge de Role */}
                    {member.role === 'dono' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                        <ShieldCheck className="w-3 h-3" /> Dono
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                        <Shield className="w-3 h-3" /> Staff
                      </span>
                    )}

                    {/* Badge de Atendimento */}
                    {member.is_professional && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <Scissors className="w-3 h-3" /> Atende
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
