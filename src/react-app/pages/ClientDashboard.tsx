import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { shopsApi, appointmentsApi } from '../lib/api';
import { Shop, Appointment } from '../../shared/types';
import { Calendar, MapPin, Plus, LogOut, Loader2, Clock, Store as StoreIcon, Scissors } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [myShop, setMyShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // 1. Carregar Unidade Vinculada
        if (user.shop_id) {
          try {
            const shopData = await shopsApi.getById(user.shop_id);
            setMyShop(shopData);
          } catch (e) {
            console.error("Erro ao carregar unidade favorita", e);
          }
        }

        // 2. Carregar Agendamentos Reais
        try {
          const myAppointments = await appointmentsApi.listByClient(user.id);
          setAppointments(myAppointments);
        } catch (e) {
          console.error("Erro ao carregar agendamentos", e);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Olá, {user?.name?.split(' ')[0]}</h1>
              <p className="text-xs text-slate-500">Bem-vindo(a)</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 rounded-lg"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Card da Unidade */}
        {myShop ? (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-xl">{myShop.name}</h2>
                  <div className="flex items-center gap-1 text-purple-100 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{myShop.address || 'Endereço não informado'}</span>
                  </div>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <StoreIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link 
                  to={`/book/${myShop.slug}`} 
                  className="flex-1 bg-white text-purple-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Agendar
                </Link>
                {myShop.phone && (
                  <a 
                    href={`https://wa.me/55${myShop.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 bg-white/20 text-white rounded-xl font-semibold text-sm backdrop-blur-md hover:bg-white/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
            
            {/* Decorativo */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Encontre um local</h3>
            <p className="text-slate-500 text-sm mb-6">Você ainda não está vinculado a nenhuma unidade.</p>
            <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Buscar Estabelecimentos
            </button>
          </div>
        )}

        {/* Lista de Agendamentos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Meus Agendamentos
            </h3>
            {appointments.length > 0 && (
              <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">
                {appointments.length}
              </span>
            )}
          </div>
          
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                       <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {appt.expand?.service_id?.name || 'Serviço'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(appt.start_time).toLocaleDateString('pt-BR')} às {new Date(appt.start_time).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    appt.status === 'agendado' ? 'bg-yellow-100 text-yellow-700' : 
                    appt.status === 'concluido' ? 'bg-green-100 text-green-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 border-dashed">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-medium">Nenhum agendamento.</p>
              <p className="text-slate-400 text-xs mt-1">Seus horários aparecerão aqui.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}