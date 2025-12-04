import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopsApi, servicesApi, usersApi, appointmentsApi } from '../lib/api';
import { Shop, Service, User } from '../../shared/types';
import { User as UserIcon, CheckCircle, Loader2, MapPin, ChevronLeft, Scissors, CalendarX, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Tipos auxiliares para o horário (mesmos do Settings)
type DaySchedule = {
  open: boolean;
  start: string;
  end: string;
};

type BusinessHours = {
  [key: string]: DaySchedule;
};

// Mapa para converter Date.getDay() (0-6) para as chaves do nosso JSON
const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function BookingPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  
  const [step, setStep] = useState(1); // 1: Serviço, 2: Profissional, 3: Data/Hora, 4: Confirmar
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  
  // Data inicial: Hoje
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Carregar dados da loja
  useEffect(() => {
    if (!slug) return;
    const loadData = async () => {
      try {
        const shopData = await shopsApi.getBySlug(slug);
        setShop(shopData);
        
        // Carrega serviços e staff em paralelo
        const [servicesData, staffData] = await Promise.all([
          servicesApi.listByShop(shopData.id),
          usersApi.listStaffByShop(shopData.id)
        ]);
        
        // Filtra apenas serviços ativos
        setServices(servicesData.filter(s => s.is_active));
        
        // Filtra staff que "atende clientes" (is_professional = true)
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

  // Função inteligente para gerar slots baseada no horário da loja
  const availableSlots = useMemo(() => {
    if (!shop || !selectedDate) return [];

    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dayOfWeek = dateObj.getDay(); // 0 (Dom) a 6 (Sab)
    const dayKey = DAY_KEYS[dayOfWeek];

    const businessHours = shop.business_hours as BusinessHours;
    
    // Se não tiver configuração ou estiver fechado no dia
    if (!businessHours || !businessHours[dayKey] || !businessHours[dayKey].open) {
      return []; // Fechado
    }

    const { start, end } = businessHours[dayKey];
    const slots: string[] = [];
    
    // Converter "09:00" para minutos do dia (ex: 540)
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    let currentMinutes = startHour * 60 + startMin;
    const closeMinutes = endHour * 60 + endMin;
    const interval = selectedService?.duration || 30; // Usa duração do serviço ou 30min padrão

    // Data atual para validar horários passados
    const now = new Date();
    const isToday = selectedDate === now.toISOString().split('T')[0];
    const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

    while (currentMinutes + interval <= closeMinutes) {
      // Se for hoje, não mostrar horários passados
      if (isToday && currentMinutes < currentMinutesNow) {
        currentMinutes += interval;
        continue;
      }

      const h = Math.floor(currentMinutes / 60);
      const m = currentMinutes % 60;
      const timeString = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      
      slots.push(timeString);
      currentMinutes += interval;
    }

    return slots;
  }, [shop, selectedDate, selectedService]);

  const handleBooking = async () => {
    if (!user) {
      // Salva o estado atual para voltar depois do login (futura melhoria)
      alert("Você precisa fazer login ou criar uma conta para agendar.");
      navigate('/login');
      return;
    }
    
    if (!shop || !selectedService || !selectedStaff || !selectedTime) return;

    setBookingLoading(true);
    try {
      // Construir data completa (UTC handling simplificado para MVP)
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);
      
      // Data fim
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + selectedService.duration);

      await appointmentsApi.create({
        shop_id: shop.id,
        client_id: user.id,
        barber_id: selectedStaff.id,
        service_id: selectedService.id,
        start_time: startTime.toISOString().replace('T', ' ').substring(0, 19),
        end_time: endTime.toISOString().replace('T', ' ').substring(0, 19),
        status: 'agendado',
        payment_status: 'nao_pago',
        total_amount: selectedService.price,
        reminder_sent: false,
        confirmation_sent: false
      });

      alert("Agendamento realizado com sucesso!");
      navigate('/client');
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar agendamento. Tente novamente.");
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
        <p className="text-gray-500">Verifique o endereço digitado.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header da Loja */}
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
        
        {/* Passo 1: Selecionar Serviço */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Escolha um serviço</h2>
              <p className="text-sm text-gray-500">Selecione o procedimento que deseja realizar</p>
            </div>
            
            {services.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Nenhum serviço disponível no momento.</p>
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

        {/* Passo 2: Selecionar Profissional */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quem vai te atender?</h2>
              <p className="text-sm text-gray-500">Escolha o profissional de sua preferência</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Opção "Qualquer Profissional" (Primeiro Disponível) */}
              {staff.length > 0 && (
                 <div 
                 onClick={() => {
                   setSelectedStaff(staff[0]); // Simplificação: pega o primeiro (backend poderia distribuir melhor)
                   setStep(3);
                 }}
                 className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-500 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group h-40"
               >
                 <div className="w-16 h-16 bg-purple-100 rounded-full mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Scissors className="w-8 h-8 text-purple-600" />
                 </div>
                 <h3 className="font-semibold text-gray-900">Primeiro Disponível</h3>
                 <p className="text-xs text-gray-500 mt-1">Horário mais próximo</p>
               </div>
              )}

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
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(null); // Reseta horário ao trocar dia
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 bg-gray-50"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                <span>Horários Disponíveis</span>
                <span className="text-xs font-normal text-gray-500">Duração: {selectedService?.duration} min</span>
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
                  <p className="text-gray-500 font-medium">Fechado ou sem horários</p>
                  <p className="text-sm text-gray-400">Tente selecionar outra data.</p>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:bg-transparent md:border-0 md:p-0">
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

        {/* Passo 4: Confirmação */}
        {step === 4 && selectedService && selectedStaff && (
          <div className="space-y-6 animate-fade-in">
             <div className="text-center mb-6">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                 <CheckCircle className="w-8 h-8 text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900">Quase lá!</h2>
               <p className="text-gray-500">Confira os dados antes de confirmar</p>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Serviço</span>
                  <span className="font-medium text-gray-900">{selectedService.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Profissional</span>
                  <span className="font-medium text-gray-900">{selectedStaff.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Data</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {new Date(selectedDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Horário</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between pt-2">
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