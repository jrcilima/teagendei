import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { shopsApi } from '../lib/api';
import { Appointment, Shop } from '../../shared/types';
import { Calendar, MapPin, Plus, LogOut, Loader2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [myShop, setMyShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // Carregar dados da unidade vinculada (se houver)
        if (user.shop_id) {
          try {
            const shopData = await shopsApi.getById(user.shop_id);
            setMyShop(shopData);
          } catch (e) {
            console.error("Erro ao carregar unidade favorita", e);
          }
        }

        // TODO: Adicionar função na API para listar agendamentos do cliente (por client_id)
        // Por enquanto, deixamos lista vazia ou mockada
        setAppointments([]); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Mobile-First */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Olá, {user?.name?.split(' ')[0]}</h1>
            <p className="text-xs text-slate-500">Bem-vindo de volta</p>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Unidade Favorita */}
        {myShop ? (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-lg">{myShop.name}</h2>
                <div className="flex items-center gap-1 text-purple-100 text-sm mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{myShop.address || 'Endereço não informado'}</span>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
            <Link 
              to={`/book/${myShop.slug}`} // Futura rota de agendamento
              className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Agendamento
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Encontre um local</h3>
            <p className="text-sm text-slate-500 mb-4">Você ainda não tem uma unidade favorita.</p>
            <button className="text-purple-600 font-medium text-sm">Buscar Estabelecimentos</button>
          </div>
        )}

        {/* Próximos Agendamentos */}
        <div>
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            Meus Agendamentos
          </h3>
          
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {/* Lista de agendamentos renderizada aqui */}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-100 border-dashed">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Nenhum agendamento futuro.</p>
            </div>
          )}
        </div>

        {/* Promoções ou Histórico (Placeholder) */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <h4 className="font-semibold text-purple-800 text-sm mb-1">Histórico</h4>
          <p className="text-purple-600 text-xs">Seus atendimentos passados aparecerão aqui.</p>
        </div>

      </main>
    </div>
  );
}

// Pequeno helper para ícone Store caso não esteja importado
function Store({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
    </svg>
  )
}