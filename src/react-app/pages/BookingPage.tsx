import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopsApi, servicesApi, usersApi, appointmentsApi } from '../lib/api';
import { Shop, Service, User, Appointment, PaymentMethod, AppointmentStatus, PaymentStatus } from '../../shared/types';
import { User as UserIcon, CheckCircle, Loader2, MapPin, ChevronLeft, CalendarX, Clock, CreditCard, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type DaySchedule = {
  open: boolean;
  start: string;
  end: string;
};

type BusinessHours = {
  [key: string]: DaySchedule;
};

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function BookingPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  
  const [step, setStep] = useState(1); 
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Estado para armazenar o ID do método de pagamento (relação)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');
  const [notes, setNotes] = useState('');

  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // 1. Carregar dados
  useEffect(() => {
    if (!slug) return;
    const loadData = async () => {
      try {
        // O shopsApi.getBySlug já faz o expand 'accepted_payment_methods'
        const shopData = await shopsApi.getBySlug(slug);
        setShop(shopData);
        
        const [servicesData, staffData] = await Promise.all([
          servicesApi.listByShop(shopData.id),
          usersApi.listStaffByShop(shopData.id)
        ]);
        
        setServices(servicesData.filter(s => s.is_active));
        setStaff(staffData.filter(u => u.is_professional));

      } catch (error) {
        console.error("Erro ao carregar loja:", error);
        alert("Loja não encontrada ou indisponível.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  // 2. Carregar agendamentos existentes
  useEffect(() => {
    if (!shop || !selectedDate || step !== 3) return;

    const fetchAppointments = async () => {
      setSlotsLoading(true);
      try {
        // Passando a data selecionada corretamente para listar agendamentos do dia
        // Importante: appointmentsApi.listByShopAndDate deve lidar com o filtro de data corretamente
        // Usamos a data no formato YYYY-MM-DD + 00:00:00 local
        const appts = await appointmentsApi.listByShopAndDate(shop.id, new Date(selectedDate + 'T00:00:00')) || [];
        
        // Ajuste: Verifica status numérico (AppointmentStatus.CANCELADO é 0)
        const activeAppts = Array.isArray(appts) ? appts.filter(a => Number(a.status) !== AppointmentStatus.CANCELADO) : [];
        setExistingAppointments(activeAppts);
      } catch (err) {
        console.warn("Erro ao buscar disponibilidade:", err);
        setExistingAppointments([]); 
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchAppointments();
  }, [shop, selectedDate, step, selectedStaff]);

  // 3. Calcular Slots
  const availableSlots = useMemo(() => {
    if (!shop || !selectedDate || !selectedService) return [];

    const [y, m, d] = selectedDate.split('-').map(Number);
    // Criando data localmente correta para pegar o dia da semana
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.getDay(); 
    const dayKey = DAY_KEYS[dayOfWeek];

    const businessHours = shop.business_hours as BusinessHours;
    
    if (!businessHours || !businessHours[dayKey] || !businessHours[dayKey].open) {
      return []; 
    }

    const { start, end } = businessHours[dayKey];
    const slots: string[] = [];
    
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    let currentMinutes = startHour * 60 + startMin;
    const closeMinutes = endHour * 60 + endMin;
    const interval = 30; 

    const now = new Date();
    // Comparação de datas deve ser feita com strings para evitar problemas de fuso
    // Se today for "2023-10-25" e selectedDate "2023-10-25", é hoje.
    const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD local
    const isToday = selectedDate === todayStr;
    const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

    while (currentMinutes + selectedService.duration <= closeMinutes) {
      if (isToday && currentMinutes < (currentMinutesNow + 15)) {
        currentMinutes += interval;
        continue;
      }

      const slotStart = currentMinutes;
      const slotEnd = currentMinutes + selectedService.duration;

      const isBlocked = existingAppointments.some(appt => {
        if (selectedStaff && appt.barber_id !== selectedStaff.id) return false;

        // Precisamos extrair a hora do agendamento vindo do banco (UTC) e converter para local minutes
        // para comparar com os slots locais.
        const apptStart = new Date(appt.start_time);
        const apptEnd = new Date(appt.end_time);

        // A hora salva no banco já está "correta" visualmente (09:00 no banco é 09:00 aqui)
        // se a gente não converteu errado.
        // Mas como o JS converte UTC para local automaticamente, 09:00 UTC vira 06:00 local (-3h).
        // Então precisamos "desfazer" o fuso para pegar a hora original salva.
        
        const apptStartMinutes = apptStart.getUTCHours() * 60 + apptStart.getUTCMinutes();
        const apptEndMinutes = apptEnd.getUTCHours() * 60 + apptEnd.getUTCMinutes();

        // Simplificação da verificação de sobreposição
        return (slotStart < apptEndMinutes) && (slotEnd > apptStartMinutes);
      });

      if (!isBlocked) {
        const h = Math.floor(currentMinutes / 60);
        const mn = currentMinutes % 60;
        const timeString = `${String(h).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
        slots.push(timeString);
      }
      
      currentMinutes += interval; 
    }

    return slots;
  }, [shop, selectedDate, selectedService, existingAppointments, selectedStaff]);

  const handleBooking = async () => {
    if (!user) {
      alert("Você precisa fazer login ou criar uma conta para agendar.");
      navigate('/login');
      return;
    }
    
    // Validação: verifica selectedPaymentMethodId
    if (!shop?.id || !selectedService?.id || !selectedStaff?.id || !selectedTime || !user.id || !selectedPaymentMethodId) { 
      alert("Por favor, preencha todos os campos, incluindo a forma de pagamento."); 
      return; 
    }

    setBookingLoading(true);
    try {
      // CORREÇÃO DE DATA/HORA:
      // A chave do problema é que o PocketBase salva como UTC.
      // Se o usuário escolhe "09:00" local, queremos salvar "09:00:00.000Z" no banco
      // para que quando recuperarmos e exibirmos em qualquer lugar, saibamos que a "hora nominal" é 09:00.
      // Ao exibir, basta tratar como UTC.

      const startString = `${selectedDate} ${selectedTime}:00`;
      
      // Calcular o fim manualmente
      const [hours, minutes] = selectedTime!.split(':').map(Number);
      const endTotalMinutes = hours * 60 + minutes + selectedService.duration;
      const endHours = Math.floor(endTotalMinutes / 60);
      const endMinutes = endTotalMinutes % 60;
      
      // Tratamento simples para virada de dia
      const endTimeString = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`;
      const endString = `${selectedDate} ${endTimeString}`;

      const payload: Partial<Appointment> = {
        shop_id: shop.id,
        client_id: user.id,
        barber_id: selectedStaff.id,
        service_id: selectedService.id,
        start_time: startString, // Enviando string direta "YYYY-MM-DD HH:MM:SS" (sem Z, PB assume UTC)
        end_time: endString,     // Enviando string direta
        status: AppointmentStatus.AGENDADO, 
        payment_status: PaymentStatus.NAO_PAGO, 
        total_amount: Number(selectedService.price),
        payment_method: selectedPaymentMethodId, 
        notes: notes,
        reminder_sent: false,
        confirmation_sent: false
      };

      console.log("Enviando payload:", payload); 

      await appointmentsApi.create(payload);

      alert("Agendamento realizado com sucesso!");
      navigate('/client');
    } catch (error: any) {
      console.error("Erro PocketBase:", error);
      
      let errorMessage = error?.message || "Erro desconhecido.";
      if (error?.data?.data) {
        const fieldErrors = Object.entries(error.data.data)
          .map(([key, val]: any) => `• ${key}: ${val.message}`)
          .join('\n');
        if (fieldErrors) errorMessage = `Erro nos seguintes campos:\n${fieldErrors}`;
      } else if (error?.status === 403) {
        errorMessage = "Permissão negada (403). Verifique se você está logado ou se as regras do banco permitem criar agendamentos.";
      }

      alert(`Falha ao agendar:\n${errorMessage}`);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!shop) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Loja não encontrada</h1>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
             {step > 1 && (
               <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ChevronLeft className="w-6 h-6 text-gray-600" />
               </button>
             )}
             <div>
               <h1 className="text-lg font-bold text-gray-900 leading-tight">{shop.name}</h1>
               <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                 <MapPin className="w-3 h-3 flex-shrink-0" />
                 <span className="truncate max-w-[250px]">{shop.address || "Endereço não informado"}</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        
        {/* Passo 1: Serviço */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Escolha um serviço</h2>
              <p className="text-sm text-gray-500">Selecione o procedimento que deseja realizar</p>
            </div>
            
            {services.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Nenhum serviço disponível.</p>
              </div>
            ) : (
              services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setStep(2);
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-purple-500 hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{service.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" /> {service.duration} min
                      </span>
                      {service.expand?.category_id && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                          {service.expand.category_id.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="block font-bold text-gray-900 text-lg">R$ {service.price.toFixed(2)}</span>
                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full mt-1 inline-block">Agendar</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Passo 2: Profissional */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quem vai te atender?</h2>
              <p className="text-sm text-gray-500">Escolha o profissional de sua preferência</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {staff.map(professional => (
                <div 
                  key={professional.id}
                  onClick={() => {
                    setSelectedStaff(professional);
                    setStep(3);
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-500 hover:shadow-md transition-all text-center flex flex-col items-center justify-center h-40 group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-purple-200 transition-colors">
                    {professional.avatar ? (
                      <img 
                        src={`${import.meta.env.VITE_POCKETBASE_URL || 'http://136.248.77.97:8090'}/api/files/users/${professional.id}/${professional.avatar}`} 
                        alt={professional.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{professional.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{professional.role === 'dono' ? 'Especialista' : 'Profissional'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">Escolha o horário</h2>
              <p className="text-sm text-gray-500">Selecione o melhor dia e hora para você</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input 
                type="date" 
                value={selectedDate}
                min={new Date().toLocaleDateString('en-CA')} // Correção para pegar data local YYYY-MM-DD
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(null); 
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 bg-gray-50"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                <span>Horários Disponíveis</span>
                {slotsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                ) : (
                    <span className="text-xs font-normal text-gray-500">Duração: {selectedService?.duration} min</span>
                )}
              </h3>
              
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {availableSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time 
                          ? 'bg-purple-600 text-white shadow-md scale-105' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200 border-dashed">
                  <CalendarX className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">
                     {slotsLoading ? 'Verificando disponibilidade...' : 'Sem horários disponíveis'}
                  </p>
                  <p className="text-sm text-gray-400">
                     {slotsLoading ? 'Aguarde um instante.' : 'Tente selecionar outra data.'}
                  </p>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:bg-transparent md:border-0 md:p-0 z-20">
              <div className="max-w-2xl mx-auto">
                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(4)}
                  className="w-full py-3.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all active:scale-[0.98]"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Passo 4: Confirmação com Campos Extras */}
        {step === 4 && selectedService && selectedStaff && (
          <div className="space-y-6 animate-fade-in">
             <div className="text-center mb-6">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                 <CheckCircle className="w-8 h-8 text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900">Quase lá!</h2>
               <p className="text-gray-500">Finalize seu agendamento</p>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                
                {/* Resumo do Agendamento */}
                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Serviço</span>
                    <span className="font-medium text-gray-900 text-right">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Profissional</span>
                    <span className="font-medium text-gray-900 text-right">{selectedStaff.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Data/Hora</span>
                    {/* Correção na exibição da data para não sofrer com timezone na visualização final */}
                    <span className="font-medium text-gray-900 text-right capitalize">
                      {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })} às {selectedTime}
                    </span>
                  </div>
                </div>

                {/* Campos Extras de Pagamento e Notas */}
                <div className="space-y-4 pt-2">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                       <CreditCard className="w-4 h-4 text-purple-600" /> Forma de Pagamento
                     </label>
                     
                     {/* Select dinâmico baseado nos métodos do backend */}
                     {shop?.expand?.accepted_payment_methods && shop.expand.accepted_payment_methods.length > 0 ? (
                       <select 
                          value={selectedPaymentMethodId}
                          onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50"
                       >
                          <option value="">Selecione uma opção...</option>
                          {shop.expand.accepted_payment_methods.map((method: PaymentMethod) => (
                            <option key={method.id} value={method.id}>
                              {method.name}
                            </option>
                          ))}
                       </select>
                     ) : (
                       <p className="text-sm text-red-500">
                         Esta loja não configurou métodos de pagamento.
                       </p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                       <FileText className="w-4 h-4 text-purple-600" /> Observações (Opcional)
                     </label>
                     <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ex: Tenho alergia a tal produto..."
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none h-20 bg-gray-50"
                     />
                   </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-lg">Total</span>
                  <span className="text-purple-600 font-bold text-xl">R$ {selectedService.price.toFixed(2)}</span>
                </div>
             </div>

             <button
               onClick={handleBooking}
               disabled={bookingLoading}
               className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
             >
               {bookingLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Agendamento'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
}