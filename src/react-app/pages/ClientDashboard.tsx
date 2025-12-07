import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { shopsApi, appointmentsApi, authApi } from '../lib/api';
import { pb } from '../lib/pocketbase';
import { Shop, Appointment, AppointmentStatus, PaymentStatus } from '../../shared/types';
import { Calendar, MapPin, Plus, LogOut, Loader2, Store as StoreIcon, Scissors, XCircle, History, CheckCircle, Search, X, AlertCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { format, differenceInHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [myShop, setMyShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

  const [showShopModal, setShowShopModal] = useState(false);
  const [availableShops, setAvailableShops] = useState<Shop[]>([]);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [joiningShopId, setJoiningShopId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const currentUser = pb.authStore.model;
      const currentShopId = currentUser?.shop_id || user.shop_id;

      if (currentShopId) {
        try {
          const shopData = await shopsApi.getById(currentShopId);
          setMyShop(shopData);
        } catch (e) {
          console.error("Erro ao carregar unidade favorita", e);
          setMyShop(null);
        }
      }

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
    
    const diffInHours = differenceInHours(startTime, now);

    if (diffInHours < 2) {
      alert("Para cancelar com menos de 2 horas de antecedência, por favor entre em contato com o estabelecimento pelo WhatsApp.");
      return;
    }

    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;

    setCancelLoading(appt.id);
    try {
      await appointmentsApi.update(appt.id, { status: AppointmentStatus.CANCELADO });
      await loadData(); 
    } catch (error) {
      console.error(error);
      alert("Erro ao cancelar agendamento.");
    } finally {
      setCancelLoading(null);
    }
  };

  const fetchShops = useCallback(async (term: string) => {
    setShopsLoading(true);
    try {
      const shops = await shopsApi.searchActive(term);
      setAvailableShops(shops);
    } catch (err) {
      console.error("Erro ao buscar lojas", err);
    } finally {
      setShopsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!showShopModal) return;
    
    const delayDebounceFn = setTimeout(() => {
      fetchShops(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, showShopModal, fetchShops]);

  const handleOpenShopSearch = () => {
    setShowShopModal(true);
    setSearchTerm(''); 
  };

  const handleJoinShop = async (shop: Shop) => {
    if (!user) return;
    if (!confirm(`Deseja definir "${shop.name}" como sua unidade preferida?`)) return;

    setJoiningShopId(shop.id);
    try {
      await authApi.updateProfile(user.id, { 
        shop_id: shop.id,
        company_id: shop.company_id  });
      await pb.collection('users').authRefresh();
      
      setShowShopModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (err) {
      console.error(err);
      alert("Erro ao vincular unidade. Tente novamente.");
    } finally {
      setJoiningShopId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case AppointmentStatus.AGENDADO:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">Agendado</span>;
      case AppointmentStatus.CONCLUIDO:
        return <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-50 text-green-700">Concluído</span>;
      case AppointmentStatus.CANCELADO:
        return <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-50 text-red-700">Cancelado</span>;
      default:
        return <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-700">Outro</span>;
    }
  };

  const getPaymentStatusDisplay = (appt: Appointment) => {
    const ps = appt.payment_status;
    const as = appt.status;

    if (ps === PaymentStatus.PAGO) {
      return <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Pago</span>;
    }
    
    if (as === AppointmentStatus.CONCLUIDO && ps === PaymentStatus.NAO_PAGO) {
      return <span className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Pendente</span>;
    }

    if (as === AppointmentStatus.AGENDADO && ps === PaymentStatus.NAO_PAGO) {
      return <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><Clock className="w-3 h-3" /> A Pagar</span>;
    }

    return null;
  };

  const now = new Date();
  
  const upcomingAppointments = appointments.filter(
    a => new Date(a.start_time) >= now && 
         a.status !== AppointmentStatus.CANCELADO && 
         a.status !== AppointmentStatus.CONCLUIDO
  ).sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  const historyAppointments = appointments.filter(
    a => new Date(a.start_time) < now || 
         a.status === AppointmentStatus.CANCELADO || 
         a.status === AppointmentStatus.CONCLUIDO
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
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold overflow-hidden">
              {user?.avatar ? (
                 <img 
                   // Uso de pb.baseUrl evita erro de import.meta e garante URL correta
                   src={`${pb.baseUrl}/api/files/users/${user.id}/${user.avatar}`} 
                   className="w-full h-full object-cover" 
                   alt="avatar"
                 />
              ) : (
                 user?.name?.charAt(0).toUpperCase() || 'C'
              )}
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
                <div 
                  className="bg-white/20 p-2 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors" 
                  onClick={handleOpenShopSearch} 
                  title="Trocar unidade"
                >
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
            <button 
              onClick={handleOpenShopSearch}
              className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Buscar Estabelecimentos
            </button>
          </div>
        )}

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
                            {format(new Date(appt.start_time), 'HH:mm')}
                          </p>
                          <p className="text-sm text-slate-500 capitalize">
                            {format(new Date(appt.start_time), "EEEE, d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>
                     </div>
                     {getStatusBadge(appt.status)}
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
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">
                          {formatCurrency(appt.total_amount || 0)}
                        </span>
                        {getPaymentStatusDisplay(appt)}
                      </div>
                      
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
            historyAppointments.length > 0 ? (
              historyAppointments.map((appt) => (
                <div key={appt.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      appt.status === AppointmentStatus.CONCLUIDO ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                       {appt.status === AppointmentStatus.CONCLUIDO ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {appt.expand?.service_id?.name || 'Serviço'}
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-xs text-slate-500 capitalize">
                          {format(new Date(appt.start_time), "dd/MM")} - {format(new Date(appt.start_time), 'HH:mm')}
                        </p>
                        {getPaymentStatusDisplay(appt)}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(appt.status)}
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

        {showShopModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[90vh] flex flex-col animate-slide-up">
               <div className="p-4 border-b border-gray-100">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-lg text-gray-900">Escolher Unidade</h3>
                   <button onClick={() => setShowShopModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                     <X className="w-5 h-5 text-gray-500" />
                   </button>
                 </div>
                 
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input 
                     type="text" 
                     placeholder="Buscar por nome..." 
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     autoFocus
                   />
                 </div>
               </div>
               
               <div className="p-4 overflow-y-auto">
                 {shopsLoading ? (
                   <div className="py-12 flex justify-center">
                     <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                   </div>
                 ) : availableShops.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     <p>Nenhuma loja encontrada.</p>
                     {searchTerm && <p className="text-xs mt-1">Tente outro termo de busca.</p>}
                   </div>
                 ) : (
                   <div className="space-y-3">
                     {availableShops.map(shop => (
                       <button
                         key={shop.id}
                         onClick={() => handleJoinShop(shop)}
                         disabled={!!joiningShopId}
                         className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group relative bg-white"
                       >
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className="font-bold text-gray-900 group-hover:text-purple-700">{shop.name}</h4>
                             <p className="text-sm text-gray-500 mt-1 line-clamp-1">{shop.address || 'Endereço não informado'}</p>
                           </div>
                           {joiningShopId === shop.id && <Loader2 className="w-5 h-5 animate-spin text-purple-600" />}
                         </div>
                       </button>
                     ))}
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
