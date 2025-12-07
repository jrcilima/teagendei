import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopsApi, servicesApi, usersApi, appointmentsApi } from '../lib/api';
import { pb } from '../lib/pocketbase';
import {
  Shop,
  Service,
  User,
  Appointment,
  PaymentMethod,
  AppointmentStatus,
  PaymentStatus
} from '../../shared/types';
import {
  User as UserIcon,
  CheckCircle,
  Loader2,
  MapPin,
  ChevronLeft,
  CalendarX,
  Clock,
  CreditCard,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  addMinutes, 
  format, 
  parse, 
  isBefore, 
  isAfter, 
  setHours, 
  setMinutes, 
  setSeconds, 
  isSameDay 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

// 🔹 NOVOS IMPORTS PARA SHOP_HOURS
import ApiClient from '../lib/apiClient';
import { shopHoursApi } from '../lib/api/shopHoursApi';
import type { ShopHour } from '../../shared/schemas/shopHours';

// 🔹 Agora usamos códigos compatíveis com shop_hours.weekday
const DAY_KEYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const apiClient = new ApiClient();
const shopHoursApiClient = shopHoursApi(apiClient);

export default function BookingPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<User[]>([]);

  // 🔹 NOVO: horários vindos da tabela shop_hours
  const [shopHours, setShopHours] = useState<ShopHour[]>([]);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');
  const [notes, setNotes] = useState('');

  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const loadData = async () => {
      try {
        const shopData = await shopsApi.getBySlug(slug);
        setShop(shopData);

        const [servicesData, staffData, hoursResp] = await Promise.all([
          servicesApi.listByShop(shopData.id),
          usersApi.listStaffByShop(shopData.id),
          shopHoursApiClient.listByShop(shopData.company_id, shopData.id)
        ]);

        setServices(servicesData.filter((s) => s.is_active));
        setStaff(staffData.filter((u) => u.is_professional));

        // 🔹 horários da tabela shop_hours
        setShopHours(hoursResp.items ?? []);
      } catch (error) {
        console.error('Erro ao carregar loja:', error);
        alert('Loja não encontrada ou indisponível.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  useEffect(() => {
    if (!shop || !selectedDate || step !== 3) return;

    const fetchAppointments = async () => {
      setSlotsLoading(true);
      try {
        const searchDate = new Date(`${selectedDate}T00:00:00`);
        const appts = (await appointmentsApi.listByShopAndDate(shop.id, searchDate)) || [];

        const activeAppts = Array.isArray(appts)
          ? appts.filter((a) => a.status !== AppointmentStatus.CANCELADO)
          : [];
        setExistingAppointments(activeAppts);
      } catch (err) {
        console.warn('Erro ao buscar disponibilidade:', err);
        setExistingAppointments([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchAppointments();
  }, [shop, selectedDate, step, selectedStaff]);

  const availableSlots = useMemo(() => {
    if (!shop || !selectedDate || !selectedService) return [];

    const dateObj = parse(selectedDate, 'yyyy-MM-dd', new Date());
    const dayOfWeek = dateObj.getDay(); // 0..6
    const dayKey = DAY_KEYS[dayOfWeek]; // 'dom'..'sab'

    // 🔹 usa shop_hours da tabela, não mais shop.business_hours
    const dayHours = shopHours.filter(h => h.weekday === dayKey);

    // sem horário configurado ou todos fechados
    if (dayHours.length === 0 || dayHours.every(h => h.is_closed)) {
      return [];
    }

    const slots: string[] = [];
    const now = new Date();
    const isToday = isSameDay(dateObj, now);
    const minAdvance = shop.min_advance_time ?? 30;

    for (const h of dayHours) {
      if (h.is_closed) continue;

      const startDate = parse(h.start_time, 'HH:mm', dateObj);
      const endDate = parse(h.end_time, 'HH:mm', dateObj);

      let currentSlot = startDate;

      while (
        isBefore(addMinutes(currentSlot, selectedService.duration), endDate) ||
        currentSlot.getTime() === endDate.getTime()
      ) {
        if (isToday && isBefore(currentSlot, addMinutes(now, minAdvance))) {
          currentSlot = addMinutes(currentSlot, 30);
          continue;
        }

        const slotStart = currentSlot;
        const slotEnd = addMinutes(currentSlot, selectedService.duration);

        const isBlocked = existingAppointments.some((appt) => {
          if (selectedStaff && appt.barber_id !== selectedStaff.id) return false;

          const apptStart = new Date(appt.start_time);
          const apptEnd = new Date(appt.end_time);

          return isBefore(slotStart, apptEnd) && isAfter(slotEnd, apptStart);
        });

        if (!isBlocked) {
          slots.push(format(currentSlot, 'HH:mm'));
        }

        currentSlot = addMinutes(currentSlot, 30);
      }
    }

    return slots;
  }, [shop, selectedDate, selectedService, existingAppointments, selectedStaff, shopHours]);

  const handleBooking = async () => {
    if (!user) {
      alert('Você precisa fazer login ou criar uma conta para agendar.');
      navigate('/login');
      return;
    }

    if (!shop?.id || !selectedService?.id || !selectedStaff?.id || !selectedTime || !user.id || !selectedPaymentMethodId) {
      alert('Por favor, preencha todos os campos, incluindo a forma de pagamento.');
      return;
    }

    setBookingLoading(true);
    try {
      const baseDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
      const [hours, minutes] = selectedTime.split(':').map(Number);
      
      const startDate = setSeconds(setMinutes(setHours(baseDate, hours), minutes), 0);
      const endDate = addMinutes(startDate, selectedService.duration);

      const latestAppointments = await appointmentsApi.listByShopAndDate(shop.id, baseDate);
      
      const hasConflict = latestAppointments.some(appt => {
        if (appt.status === AppointmentStatus.CANCELADO) return false;
        if (appt.barber_id !== selectedStaff.id) return false;

        const apptStart = new Date(appt.start_time);
        const apptEnd = new Date(appt.end_time);

        return isBefore(startDate, apptEnd) && isAfter(endDate, apptStart);
      });

      if (hasConflict) {
        throw new Error('SLOT_TAKEN');
      }

      const payload = {
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
      };

      await appointmentsApi.create(payload);

      alert('Agendamento realizado com sucesso!');
      navigate('/client');
    } catch (error: any) {
      console.error('Erro ao agendar:', error);
      
      if (error.message === 'SLOT_TAKEN' || error?.data?.code === 400 || JSON.stringify(error).includes('unique_active_booking')) {
        alert("Ops! Este horário acabou de ser ocupado por outra pessoa. A lista será atualizada.");
        const baseDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
        const appts = await appointmentsApi.listByShopAndDate(shop.id, baseDate);
        setExistingAppointments(appts.filter(a => a.status !== AppointmentStatus.CANCELADO));
        setStep(3);
      } else {
        let msg = error?.message || 'Erro desconhecido.';
        alert(`Falha ao agendar: ${msg}`);
      }
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

  if (!shop)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loja não encontrada</h1>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                {shop.name}
              </h1>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[250px]">
                  {shop.address || 'Endereço não informado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Escolha um serviço
              </h2>
              <p className="text-sm text-gray-500">
                Selecione o procedimento que deseja realizar
              </p>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Nenhum serviço disponível.</p>
              </div>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setStep(2);
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-purple-500 hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                        {service.description}
                      </p>
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
                    <span className="block font-bold text-gray-900 text-lg">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full mt-1 inline-block">
                      Agendar
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Quem vai te atender?
              </h2>
              <p className="text-sm text-gray-500">
                Escolha o profissional de sua preferência
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {staff.map((professional) => (
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
                        src={`${pb.baseUrl}/api/files/users/${professional.id}/${professional.avatar}`}
                        alt={professional.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {professional.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {professional.role === 'dono'
                      ? 'Especialista'
                      : 'Profissional'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Escolha o horário
              </h2>
              <p className="text-sm text-gray-500">
                Selecione o melhor dia e hora para você
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <input
                type="date"
                value={selectedDate}
                min={format(new Date(), 'yyyy-MM-dd')}
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
                  <span className="text-xs font-normal text-gray-500">
                    Duração: {selectedService?.duration} min
                  </span>
                )}
              </h3>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {availableSlots.map((time) => (
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
                    {slotsLoading
                      ? 'Verificando disponibilidade...'
                      : 'Sem horários disponíveis'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {slotsLoading
                      ? 'Aguarde um instante.'
                      : 'Tente selecionar outra data.'}
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

              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Serviço</span>
                  <span className="font-medium text-gray-900 text-right">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Profissional</span>
                  <span className="font-medium text-gray-900 text-right">
                    {selectedStaff.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Data/Hora</span>
                  <span className="font-medium text-gray-900 text-right capitalize">
                    {format(parse(selectedDate, 'yyyy-MM-dd', new Date()), "EEE, d 'de' MMM", { locale: ptBR })}
                    {' '}às {selectedTime}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-600" /> Forma de
                    Pagamento
                  </label>

                  {shop?.expand?.accepted_payment_methods &&
                  shop.expand.accepted_payment_methods.length > 0 ? (
                    <select
                      value={selectedPaymentMethodId}
                      onChange={(e) =>
                        setSelectedPaymentMethodId(e.target.value)
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50"
                    >
                      <option value="">Selecione uma opção...</option>
                      {shop.expand.accepted_payment_methods.map(
                        (method: PaymentMethod) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <p className="text-sm text-red-500">
                      Esta loja não configurou métodos de pagamento.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" /> Observações
                    (Opcional)
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
                <span className="text-purple-600 font-bold text-xl">
                  {formatCurrency(selectedService.price)}
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {bookingLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Confirmar Agendamento'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
