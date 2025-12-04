import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { shopsApi, appointmentsApi } from '../lib/api';
import { Shop, Appointment } from '../../shared/types';
import { Calendar, MapPin, Plus, LogOut, Loader2, Store as StoreIcon, Scissors, XCircle, History, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [myShop, setMyShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

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

      // 2. Carregar Agendamentos
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

  useEffect(() => {
    loadData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCancel = async (appt: Appointment) => {
    const startTime = new Date(appt.start_time);
    const now = new Date();
    const diffInHours = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 2) {
      alert("Para cancelar com menos de 2 horas de antecedência, por favor entre em contato com o estabelecimento pelo WhatsApp.");
      return;
    }

    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;

    setCancelLoading(appt.id);
    try {
      await appointmentsApi.update(appt.id, { status: 'cancelado' });
      await loadData(); // Recarrega a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao cancelar agendamento.");
    } finally {
      setCancelLoading(null);
    }
  };

  // Separação de agendamentos
  const now = new Date();
  const upcomingAppointments = appointments.filter(
    a => new Date(a.start_time) >= now && a.status !== 'cancelado' && a.status !== 'concluido'
  ).sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  const historyAppointments = appointments.filter(
    a => new Date(a.start_time) < now || a.status === 'cancelado' || a.status === 'concluido'
  ).sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
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
        
        {/* Card da Unidade (só mostra se tiver unidade vinculada) */}
        {myShop ? (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-xl">{myShop.name}</h2>
                  <div className="flex items-center gap-1 text-purple-100 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[200px]">{myShop.address || 'Endereço não informado'}</span>
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
                  Novo Agendamento
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

        {/* Abas de Navegação */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'upcoming' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Histórico
          </button>
        </div>

        {/* Lista de Agendamentos */}
        <div className="space-y-4">
          {activeTab === 'upcoming' ? (
            upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appt) => (
                <div key={appt.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                   
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg">
                            {new Date(appt.start_time).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          <p className="text-sm text-slate-500 capitalize">
                            {new Date(appt.start_time).toLocaleDateString('pt-BR', {weekday: 'long', day: 'numeric', month: 'long'})}
                          </p>
                        </div>
                     </div>
                     <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                       Agendado
                     </span>
                   </div>

                   <div className="space-y-2 mb-4">
                     <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Scissors className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{appt.expand?.service_id?.name || 'Serviço'}</span>
                     </div>
                     <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <StoreIcon className="w-4 h-4 text-slate-400" />
                        <span>{appt.expand?.barber_id?.name || 'Profissional'}</span>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-900">R$ {appt.total_amount?.toFixed(2)}</span>
                      <button 
                        onClick={() => handleCancel(appt)}
                        disabled={cancelLoading === appt.id}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        {cancelLoading === appt.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        Cancelar
                      </button>
                   </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                   <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-900 font-medium">Sem agendamentos futuros</p>
                <p className="text-slate-500 text-sm mt-1">Que tal marcar um horário?</p>
              </div>
            )
          ) : (
            // Histórico
            historyAppointments.length > 0 ? (
              historyAppointments.map((appt) => (
                <div key={appt.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      appt.status === 'concluido' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                       {appt.status === 'concluido' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {appt.expand?.service_id?.name || 'Serviço'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(appt.start_time).toLocaleDateString('pt-BR')} - {new Date(appt.start_time).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    appt.status === 'concluido' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <History className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">Histórico vazio</p>
              </div>
            )
          )}
        </div>

      </main>
    </div>
  );
}