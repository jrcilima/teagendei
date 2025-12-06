import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { appointmentsApi } from '../lib/api';
import { Appointment, AppointmentStatus, PaymentStatus, AppointmentStatusType } from '../../shared/types';
import {
  Calendar as CalendarIcon,
  User as UserIcon,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Scissors,
  CreditCard,
  DollarSign,
  Clock
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function Appointments() {
  const { user } = useAuth();
  const { selectedShop } = useTenant();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadAppointments = async () => {
    if (!selectedShop || !user) return;
    setLoading(true);
    try {
      const data = await appointmentsApi.listByShopAndDate(
        selectedShop.id,
        selectedDate
      );
      
      let activeData = data.filter(a => a.status !== AppointmentStatus.CANCELADO);

      if (user.role === 'staff') {
        activeData = activeData.filter(a => a.barber_id === user.id);
      }

      setAppointments(activeData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedShop, selectedDate, user]);

  const handleStatusChange = async (id: string, newStatus: AppointmentStatusType) => {
    const statusText = newStatus === AppointmentStatus.CONCLUIDO ? 'concluído' : 'cancelado';
    if (!confirm(`Deseja marcar como ${statusText}?`)) return;
    try {
      await appointmentsApi.update(id, { status: newStatus });
      loadAppointments();
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar status');
    }
  };

  const handlePaymentToggle = async (appt: Appointment) => {
    const currentStatus = appt.payment_status;
    const newStatus = currentStatus === PaymentStatus.PAGO ? PaymentStatus.NAO_PAGO : PaymentStatus.PAGO;
    const actionText = newStatus === PaymentStatus.PAGO ? "MARCAR COMO PAGO" : "MARCAR COMO NÃO PAGO";

    if(!confirm(`Deseja realmente ${actionText}?`)) return;

    try {
      await appointmentsApi.update(appt.id, { payment_status: newStatus });
      loadAppointments();
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar pagamento');
    }
  };

  const changeDate = (days: number) => {
    setSelectedDate(prev => addDays(prev, days));
  };

  const getStatusBadge = (status: string) => {
    if (status === AppointmentStatus.AGENDADO)
      return (
        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 border border-blue-200">
          Agendado
        </span>
      );
    if (status === AppointmentStatus.CONCLUIDO)
      return (
        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 border border-green-200">
          Concluído
        </span>
      );
    return (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700 border border-gray-200">
        Outro
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus: string, appointmentStatus: string) => {
    if (paymentStatus === PaymentStatus.PAGO) {
      return (
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
           Pago
        </span>
      );
    }
    
    if (appointmentStatus === AppointmentStatus.CONCLUIDO) {
       return (
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
           Pendente
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
         A Pagar
      </span>
    );
  };

  if (!selectedShop) {
    return (
      <div className="p-8 text-center text-gray-500">
        Selecione uma unidade.
      </div>
    );
  }

  const scheduled = appointments.filter(a => a.status === AppointmentStatus.AGENDADO);
  const completed = appointments.filter(a => a.status === AppointmentStatus.CONCLUIDO);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center justify-between">
          <button onClick={() => changeDate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900 capitalize">
              {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
          <button onClick={() => changeDate(1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <span className="text-blue-600 text-sm font-medium">Agendados</span>
            <p className="text-2xl font-bold text-blue-800">{scheduled.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <span className="text-green-600 text-sm font-medium">Concluídos</span>
            <p className="text-2xl font-bold text-green-800">{completed.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum agendamento para este dia.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 pt-1 text-center min-w-[70px]">
                    <span className="block text-lg font-bold text-gray-900">
                      {format(new Date(appt.start_time), 'HH:mm')}
                    </span>
                    <div className="flex flex-col gap-1 items-center mt-1">
                      {getStatusBadge(appt.status)}
                      {getPaymentBadge(appt.payment_status, appt.status)}
                    </div>
                  </div>

                  <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <UserIcon className="w-4 h-4 text-gray-500" />
                      {appt.expand?.client_id?.name || 'Cliente sem nome'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <Scissors className="w-3 h-3" />
                      {appt.expand?.service_id?.name || 'Serviço'}
                      <span className="text-gray-300">|</span>
                      {appt.expand?.barber_id?.name || 'Profissional'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <CreditCard className="w-3 h-3" />
                      {appt.expand?.payment_method?.name || 'Não informado'}
                    </div>
                    <div className="text-purple-600 font-bold text-sm mt-1">
                      {formatCurrency(appt.total_amount || 0)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4 justify-end md:justify-start">
                  
                  <button
                    onClick={() => handlePaymentToggle(appt)}
                    title={appt.payment_status === PaymentStatus.PAGO ? "Marcar como Não Pago" : "Marcar como Pago"}
                    className={`p-2 rounded-lg transition-colors ${
                      appt.payment_status === PaymentStatus.PAGO 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                  </button>

                  {appt.status === AppointmentStatus.AGENDADO && (
                    <>
                      <button
                        onClick={() => handleStatusChange(appt.id, AppointmentStatus.CONCLUIDO)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Concluir Atendimento"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(appt.id, AppointmentStatus.CANCELADO)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Cancelar Agendamento"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
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