// Caminho: src/react-app/pages/BookingPage.tsx
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext'; // Para acessar serviços se quiser, ou importar direto

// Imports da API
import { shopsApi, servicesApi, usersApi, appointmentsApi, shopHoursApi } from '../lib/api';
import { pb } from '../lib/pocketbase';

// Tipos e Utils
import { Shop, Service, User, Appointment, PaymentMethod, AppointmentStatus, PaymentStatus } from '../../shared/types';
import { ShopHour } from '../../shared/schemas/shopHours';
import { generateAvailableSlots } from '../../shared/utils/timeSlots';
import { 
  User as UserIcon, CheckCircle, Loader2, MapPin, ChevronLeft, 
  CalendarX, Clock, CreditCard, FileText 
} from 'lucide-react';
import { format, parse, setHours, setMinutes, setSeconds, addMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export default function BookingPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados de Dados
  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [shopHours, setShopHours] = useState<ShopHour[]>([]); // NOVO: Estado para os horários

  // Estados de Seleção
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Estados de Agendamento
  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // 1. CARREGAMENTO INICIAL
  useEffect(() => {
    if (!slug) return;
    const loadData = async () => {
      try {
        const shopData = await shopsApi.getBySlug(slug);
        setShop(shopData);

        // Carrega Serviços, Staff e Horários em paralelo
        const [servicesData, staffData, hoursData] = await Promise.all([
          servicesApi.listByShop(shopData.id),
          usersApi.listStaffByShop(shopData.id),
          shopHoursApi.listByShop(shopData.company_id, shopData.id)
        ]);

        setServices(servicesData.filter((s) => s.is_active));
        setStaff(staffData.filter((u) => u.is_professional));
        setShopHours(hoursData.items); // Salva os horários da tabela nova

      } catch (error) {
        console.error('Erro ao carregar loja:', error);
        alert('Loja não encontrada ou indisponível.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  // 2. BUSCAR AGENDAMENTOS EXISTENTES (Para evitar conflito)
  useEffect(() => {
    if (!shop || !selectedDate || step !== 3) return;

    const fetchAppointments = async () => {
      setSlotsLoading(true);
      try {
        // Busca agendamentos do dia selecionado
        const appts = await appointmentsApi.listByShopAndDate(shop.id, selectedDate);
        
        // Filtra apenas agendamentos válidos
        const activeAppts = Array.isArray(appts)
          ? appts.filter((a) => a.status !== AppointmentStatus.CANCELADO)
          : [];
          
        setExistingAppointments(activeAppts);
      } catch (err) {
        console.warn('Erro ao buscar disponibilidade:', err);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchAppointments();
  }, [shop, selectedDate, step, selectedStaff]); // Recarrega se mudar staff ou data

  // 3. CALCULAR SLOTS DISPONÍVEIS (Usando a nova função utilitária)
  const availableSlots = useMemo(() => {
    if (!shop || !selectedDate || !selectedService || shopHours.length === 0) return [];

    // Filtra agendamentos do staff selecionado (se houver)
    const relevantAppointments = selectedStaff 
      ? existingAppointments.filter(a => a.barber_id === selectedStaff.id)
      : existingAppointments;

    return generateAvailableSlots({
      date: parse(selectedDate, 'yyyy-MM-dd', new Date()),
      serviceDuration: selectedService.duration,
      shopHours: shopHours, // Passamos a lista da tabela nova
      existingAppointments: relevantAppointments,
      minAdvanceMinutes: shop.min_advance_time ?? 30
    });

  }, [shop, selectedDate, selectedService, existingAppointments, selectedStaff, shopHours]);

  // 4. FINALIZAR AGENDAMENTO
  const handleBooking = async () => {
    if (!user) {
      alert('Você precisa fazer login para agendar.');
      navigate('/login');
      return;
    }

    if (!shop?.id || !selectedService?.id || !selectedStaff?.id || !selectedTime || !selectedPaymentMethodId) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setBookingLoading(true);
    try {
      // Monta as datas ISO
      const baseDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startDate = setSeconds(setMinutes(setHours(baseDate, hours), minutes), 0);
      const endDate = addMinutes(startDate, selectedService.duration);

      // Verificação Final de Conflito (Double Check)
      const latestAppointments = await appointmentsApi.listByShopAndDate(shop.id, baseDate);
      const hasConflict = latestAppointments.some(appt => {
        if (appt.status === AppointmentStatus.CANCELADO) return false;
        if (appt.barber_id !== selectedStaff.id) return false;
        
        const apptStart = new Date(appt.start_time);
        const apptEnd = new Date(appt.end_time);
        // Colisão: (StartA < EndB) e (EndA > StartB)
        return startDate < apptEnd && endDate > apptStart;
      });

      if (hasConflict) {
        throw new Error('SLOT_TAKEN');
      }

      await appointmentsApi.create({
        shop_id: shop.id,
        client_id: user.id,
        barber_id: selectedStaff.id,
        service_id: selectedService.id,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        status: AppointmentStatus.AGENDADO, 
        payment_status: PaymentStatus.NAO_PAGO, 
        total_amount: Number(selectedService.price),
        payment_method: selectedPaymentMethodId, 
        notes: notes,
      });

      alert('Agendamento realizado com sucesso!');
      navigate('/client');

    } catch (error: any) {
      console.error('Erro ao agendar:', error);
      if (error.message === 'SLOT_TAKEN') {
        alert("Ops! Este horário acabou de ser ocupado. A lista será atualizada.");
        // Força atualização da lista
        const baseDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
        appointmentsApi.listByShopAndDate(shop.id, baseDate).then(appts => {
           setExistingAppointments(appts.filter(a => a.status !== AppointmentStatus.CANCELADO));
        });
        setStep(3);
      } else {
        alert("Falha ao agendar. Tente novamente.");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  // --- RENDERIZAÇÃO (Manteve-se o layout, mudou-se a lógica acima) ---
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-purple-600"/></div>;
  if (!shop) return <div className="p-8 text-center">Loja não encontrada</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-900">{shop.name}</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3" /> <span className="truncate max-w-[250px]">{shop.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        
        {/* STEP 1: Serviços */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Escolha um serviço</h2>
            {services.map(service => (
              <div key={service.id} onClick={() => { setSelectedService(service); setStep(2); }} 
                   className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-purple-500 hover:shadow-md transition-all">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3"/> {service.duration} min
                    </span>
                    <span className="font-bold text-gray-900">{formatCurrency(service.price)}</span>
                  </div>
                </div>
                <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">Reservar</div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: Profissional */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quem vai te atender?</h2>
            <div className="grid grid-cols-2 gap-4">
              {staff.map(professional => (
                <div key={professional.id} onClick={() => { setSelectedStaff(professional); setStep(3); }}
                     className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-500 hover:shadow-md transition-all text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                    {professional.avatar ? (
                      <img src={`${pb.baseUrl}/api/files/users/${professional.id}/${professional.avatar}`} className="w-full h-full object-cover" alt={professional.name}/>
                    ) : <UserIcon className="w-8 h-8 text-gray-400"/>}
                  </div>
                  <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800">Escolha o horário</h2>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input type="date" value={selectedDate} min={format(new Date(), 'yyyy-MM-dd')}
                     onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(null); }}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"/>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex justify-between">
                <span>Horários</span>
                {slotsLoading && <Loader2 className="w-4 h-4 animate-spin text-purple-600"/>}
              </h3>
              
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-3">
                  {availableSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedTime === time ? 'bg-purple-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400'
                            }`}>
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                  <CalendarX className="w-10 h-10 text-gray-300 mx-auto mb-2"/>
                  <p className="text-gray-500">{slotsLoading ? 'Verificando...' : 'Sem horários disponíveis.'}</p>
                </div>
              )}
            </div>

            <button disabled={!selectedTime} onClick={() => setStep(4)}
                    className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 shadow-lg transition-all">
              Continuar
            </button>
          </div>
        )}

        {/* STEP 4: Confirmação */}
        {step === 4 && selectedService && selectedStaff && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600"/>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Quase lá!</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">Serviço</span>
                <span className="font-medium">{selectedService.name}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">Profissional</span>
                <span className="font-medium">{selectedStaff.name}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">Data</span>
                <span className="font-medium capitalize">
                  {format(parse(selectedDate, 'yyyy-MM-dd', new Date()), "EEE, d 'de' MMM", { locale: ptBR })} às {selectedTime}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600"/> Forma de Pagamento
                </label>
                <select value={selectedPaymentMethodId} onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                  <option value="">Selecione...</option>
                  {shop.expand?.accepted_payment_methods?.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600"/> Observações
                </label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 rounded-lg h-20 resize-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Ex: Tenho alergia..."/>
              </div>

              <div className="flex justify-between pt-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-purple-600">{formatCurrency(selectedService.price)}</span>
              </div>
            </div>

            <button onClick={handleBooking} disabled={bookingLoading}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg flex justify-center gap-2 disabled:opacity-70">
              {bookingLoading ? <Loader2 className="w-6 h-6 animate-spin"/> : 'Confirmar Agendamento'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}