import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import { appointmentsApi } from '../lib/api';
import { Appointment } from '../../shared/types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  ArrowLeft,
  Scissors
} from 'lucide-react';

// Enums locais para comparação (mesmo se types.ts não estiver atualizado)
const StatusEnum = {
  CANCELADO: 0,
  AGENDADO: 1,
  CONFIRMADO: 2,
  CONCLUIDO: 4
};

// Função que pega a hora UTC (09:00Z) e exibe "09:00" (ignorando que o navegador converteria para 06:00)
const formatTimeDisplay = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // getUTCHours pega a hora '9' de '09:00Z', ignorando o fuso local
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function Appointments() {
  const { selectedShop } = useTenant();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadAppointments = async () => {
    if (!selectedShop) return;
    setLoading(true);
    try {
      const data = await appointmentsApi.listByShopAndDate(selectedShop.id, selectedDate);
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedShop, selectedDate]);

  const handleStatusChange = async (id: string, newStatus: number) => {
    const statusText = newStatus === StatusEnum.CONCLUIDO ? 'concluído' : 'cancelado';
    if (!confirm(`Deseja marcar como ${statusText}?`)) return;
    try {
      await appointmentsApi.update(id, { status: newStatus });
      loadAppointments(); 
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar status');
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const getStatusBadge = (status: any) => {
    const s = Number(status);
    if (s === StatusEnum.AGENDADO) return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">Agendado</span>;
    if (s === StatusEnum.CONCLUIDO) return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">Concluído</span>;
    if (s === StatusEnum.CANCELADO) return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">Cancelado</span>;
    return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">Outro</span>;
  };

  if (!selectedShop) {
    return <div className="p-8 text-center text-gray-500">Selecione uma unidade.</div>;
  }

  // Filtros usando valores numéricos
  const scheduled = appointments.filter(a => Number(a.status) === StatusEnum.AGENDADO);
  const completed = appointments.filter(a => Number(a.status) === StatusEnum.CONCLUIDO);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
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
              {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
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
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <span className="block text-lg font-bold text-gray-900">
                      {/* CORREÇÃO: Exibe a hora UTC sem converter para local */}
                      {formatTimeDisplay(appt.start_time)}
                    </span>
                    {getStatusBadge(appt.status)}
                  </div>

                  <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <User className="w-4 h-4 text-gray-500" />
                      {appt.expand?.client_id?.name || 'Cliente sem nome'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <Scissors className="w-3 h-3" />
                      {appt.expand?.service_id?.name || 'Serviço'} 
                      <span className="text-gray-300">|</span> 
                      {appt.expand?.barber_id?.name || 'Profissional'}
                    </div>
                    <div className="text-purple-600 font-bold text-sm mt-1">
                      R$ {appt.total_amount?.toFixed(2)}
                    </div>
                  </div>
                </div>

                {Number(appt.status) === StatusEnum.AGENDADO && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleStatusChange(appt.id, StatusEnum.CONCLUIDO)}
                      className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Concluir
                    </button>
                    <button 
                      onClick={() => handleStatusChange(appt.id, StatusEnum.CANCELADO)}
                      className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}