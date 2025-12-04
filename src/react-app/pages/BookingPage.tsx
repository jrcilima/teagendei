import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopsApi, servicesApi, usersApi, appointmentsApi } from '../lib/api';
import { Shop, Service, User } from '../../shared/types';
// REMOVIDO: Calendar e Clock que não estavam sendo usados no JSX (ou substitua se for usar)
import { User as UserIcon, CheckCircle, Loader2, MapPin, ChevronLeft, Scissors } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Helper para gerar horários (ex: 09:00 as 18:00)
const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number) => {
  const slots = [];
  let current = new Date();
  current.setHours(startHour, 0, 0, 0);
  const end = new Date();
  end.setHours(endHour, 0, 0, 0);

  while (current < end) {
    slots.push(current.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }
  return slots;
};

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
        
        const [servicesData, staffData] = await Promise.all([
          servicesApi.listByShop(shopData.id),
          usersApi.listStaffByShop(shopData.id)
        ]);
        
        setServices(servicesData);
        setStaff(staffData);
      } catch (error) {
        console.error("Erro ao carregar loja:", error);
        alert("Loja não encontrada ou indisponível.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const handleBooking = async () => {
    if (!user) {
      alert("Você precisa fazer login ou criar uma conta para agendar.");
      navigate('/login');
      return;
    }
    
    if (!shop || !selectedService || !selectedStaff || !selectedTime) return;

    setBookingLoading(true);
    try {
      // Construir data completa
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0);
      
      // Data fim (baseada na duração)
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + selectedService.duration);

      await appointmentsApi.create({
        shop_id: shop.id,
        client_id: user.id,
        barber_id: selectedStaff.id, // Agora o TypeScript aceita barber_id
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
      navigate('/client'); // Vai para o painel do cliente
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

  if (!shop) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header da Loja */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
             {step > 1 && (
               <button onClick={() => setStep(step - 1)} className="p-1 hover:bg-gray-100 rounded-full">
                 <ChevronLeft className="w-6 h-6 text-gray-600" />
               </button>
             )}
             <div>
               <h1 className="text-lg font-bold text-gray-900">{shop.name}</h1>
               <div className="flex items-center gap-1 text-sm text-gray-500">
                 <MapPin className="w-3 h-3" />
                 {shop.address || "Endereço não informado"}
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        
        {/* Passo 1: Selecionar Serviço */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Escolha um serviço</h2>
            {services.map(service => (
              <div 
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setStep(2);
                }}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-purple-500 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <span className="text-xs text-purple-600 font-medium mt-1 inline-block bg-purple-50 px-2 py-0.5 rounded">
                    {service.duration} min
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-gray-900">R$ {service.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400">Agendar</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Passo 2: Selecionar Profissional */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quem vai te atender?</h2>
            <div className="grid grid-cols-2 gap-4">
              {staff.map(professional => (
                <div 
                  key={professional.id}
                  onClick={() => {
                    setSelectedStaff(professional);
                    setStep(3);
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-500 transition-all text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    {professional.avatar ? (
                      <img src={professional.avatar} alt={professional.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <UserIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                  <p className="text-xs text-gray-500">Profissional</p>
                </div>
              ))}
              
              {staff.length > 0 && (
                 <div 
                 onClick={() => {
                   setSelectedStaff(staff[0]); 
                   setStep(3);
                 }}
                 className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-500 transition-all text-center flex flex-col items-center justify-center"
               >
                 <div className="w-16 h-16 bg-purple-50 rounded-full mb-3 flex items-center justify-center">
                   <Scissors className="w-8 h-8 text-purple-400" />
                 </div>
                 <h3 className="font-semibold text-gray-900">Primeiro Disponível</h3>
               </div>
              )}
            </div>
          </div>
        )}

        {/* Passo 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Quando?</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input 
                type="date" 
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horários Disponíveis</label>
              <div className="grid grid-cols-4 gap-3">
                {generateTimeSlots(9, 18, 60).map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedTime}
              onClick={() => setStep(4)}
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl mt-8 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Passo 4: Confirmação */}
        {step === 4 && selectedService && selectedStaff && (
          <div className="space-y-6">
             <div className="text-center mb-6">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle className="w-8 h-8 text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900">Quase lá!</h2>
               <p className="text-gray-500">Confira os dados do seu agendamento</p>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Serviço</span>
                  <span className="font-medium text-gray-900">{selectedService.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Profissional</span>
                  <span className="font-medium text-gray-900">{selectedStaff.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <span className="text-gray-500">Data e Hora</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-purple-600 font-bold text-xl">R$ {selectedService.price.toFixed(2)}</span>
                </div>
             </div>

             <button
               onClick={handleBooking}
               disabled={bookingLoading}
               className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
             >
               {bookingLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Agendamento'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
}