import { useState, useEffect } from "react";
import { X, User as UserIcon, Calendar, Clock, Scissors, Search } from "lucide-react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { getServicesByShop } from "@/react-app/lib/api/services";
import { getProfessionalsByShop } from "@/react-app/lib/api/staff";
import { generateSlots } from "@/react-app/lib/utils/slots";
import { getShopHours, getProfessionalAppointments } from "@/react-app/lib/api/availability";
import { createStaffAppointment, searchClients } from "@/react-app/lib/api/appointments";
import { Service, User, TimeSlot, AppointmentStatus } from "@/shared/types";

interface StaffBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function StaffBookingModal({ isOpen, onClose, onSuccess }: StaffBookingModalProps) {
  const { user } = useAuth();
  
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBarber, setSelectedBarber] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<User[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  
  const [clientMode, setClientMode] = useState<"registered" | "guest">("guest");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [foundClients, setFoundClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.shop_id) {
      getServicesByShop(user.shop_id).then(setServices);
      getProfessionalsByShop(user.shop_id).then(users => {
        setBarbers(users);
        if (users.find(u => u.id === user.id)) {
          setSelectedBarber(user.id);
        }
      });
    }
  }, [isOpen, user?.shop_id]);

  useEffect(() => {
    if (!selectedService || !selectedBarber || !date || !user?.shop_id) {
        setSlots([]);
        return;
    }

    async function fetchSlots() {
      setSlotLoading(true);
      try {
        const srv = services.find(s => s.id === selectedService);
        if (!srv) return;

        const [hours, appointments] = await Promise.all([
          getShopHours(user!.shop_id!),
          getProfessionalAppointments(selectedBarber, date)
        ]);

        const generated = generateSlots(date, srv.duration, hours, appointments);
        setSlots(generated);
      } catch (err) {
        console.error(err);
      } finally {
        setSlotLoading(false);
      }
    }

    fetchSlots();
  }, [selectedService, selectedBarber, date, user?.shop_id, services]);

  useEffect(() => {
    if (clientMode === "registered" && clientSearch.length > 2) {
      const timer = setTimeout(() => {
        searchClients(clientSearch).then(res => setFoundClients(res.items as unknown as User[]));
      }, 500);
      return () => clearTimeout(timer);
    } else {
        setFoundClients([]);
    }
  }, [clientSearch, clientMode]);

  async function handleConfirm() {
    if (!user?.shop_id || !selectedSlot || !selectedService || !selectedBarber) return;
    
    if (clientMode === "guest" && !guestName.trim()) {
      alert("Digite o nome do cliente.");
      return;
    }
    if (clientMode === "registered" && !selectedClient) {
      alert("Selecione um cliente da lista.");
      return;
    }

    const serviceObj = services.find(s => s.id === selectedService);
    if (!serviceObj) return;

    setLoading(true);
    try {
      await createStaffAppointment({
        shop_id: user.shop_id,
        barber_id: selectedBarber,
        service_id: selectedService,
        start_time: selectedSlot, 
        duration_minutes: serviceObj.duration, 
        total_amount: serviceObj.price, 
        status: AppointmentStatus.Confirmed, 
        client_id: clientMode === "registered" ? selectedClient?.id : undefined,
        customer_name: clientMode === "guest" ? guestName : undefined,
        customer_phone: clientMode === "guest" ? guestPhone : undefined,
      });
      
      alert("Agendamento criado com sucesso!");
      onSuccess();
      onClose();
      
      setSelectedSlot(null);
      setGuestName("");
      setGuestPhone("");
      setSelectedClient(null);
      setClientSearch("");
    } catch (error: any) {
      // TRATAMENTO DE ERRO MELHORADO:
      // Se tiver data, formata bonito. Se não, mostra mensagem genérica.
      let msg = "Erro desconhecido";
      if (error?.data && Object.keys(error.data).length > 0) {
        // Pega a primeira chave de erro (ex: client_id) e a mensagem
        const field = Object.keys(error.data)[0];
        const detail = error.data[field]?.message;
        msg = `Campo '${field}': ${detail}`;
      } else if (error?.message) {
        msg = error.message;
      }

      console.error("Erro completo:", error);
      alert(`Erro ao criar agendamento:\n${msg}`);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-slate-50">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Novo Agendamento</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* SERVIÇO E PROFISSIONAL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        <Scissors size={14} /> Serviço
                    </label>
                    <select 
                        value={selectedService} 
                        onChange={e => setSelectedService(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                        <option value="">Selecione...</option>
                        {services.map(s => (
                            <option key={s.id} value={s.id}>{s.name} ({s.duration} min) - R$ {s.price}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                         <UserIcon size={14} /> Profissional
                    </label>
                    <select 
                        value={selectedBarber} 
                        onChange={e => setSelectedBarber(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                        <option value="">Selecione...</option>
                        {barbers.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* DATA E HORÁRIO */}
            <div className="border-t border-slate-800 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="w-full sm:w-1/3">
                        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                            <Calendar size={14} /> Data
                        </label>
                        <input 
                            type="date" 
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                            <Clock size={14} /> Horários
                        </label>
                        {slotLoading ? (
                            <div className="text-slate-500 text-sm animate-pulse">Calculando...</div>
                        ) : slots.length > 0 ? (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {slots.map((slot) => (
                                    <button
                                        key={slot.time}
                                        disabled={!slot.isAvailable}
                                        onClick={() => setSelectedSlot(slot.startISO)}
                                        className={`text-xs py-2 rounded-lg border transition-all ${
                                            selectedSlot === slot.startISO
                                                ? "bg-emerald-500 border-emerald-500 text-white font-bold"
                                                : slot.isAvailable
                                                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50"
                                                : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-500 text-sm italic border border-dashed border-slate-700 rounded p-2 text-center">
                                Selecione serviço, profissional e data.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CLIENTE */}
            <div className="border-t border-slate-800 pt-6">
                 <label className="block text-sm font-medium text-slate-400 mb-4">Dados do Cliente</label>
                 
                 <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => { setClientMode("guest"); setSelectedClient(null); }}
                        className={`flex-1 py-2 text-sm rounded-lg border transition ${clientMode === "guest" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                    >
                        Cliente Avulso (Sem conta)
                    </button>
                    <button 
                         onClick={() => { setClientMode("registered"); setGuestName(""); }}
                         className={`flex-1 py-2 text-sm rounded-lg border transition ${clientMode === "registered" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                    >
                        Cliente Cadastrado
                    </button>
                 </div>

                 {clientMode === "guest" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            placeholder="Nome do Cliente *"
                            value={guestName}
                            onChange={e => setGuestName(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white w-full outline-none focus:border-emerald-500"
                        />
                         <input 
                            type="text" 
                            placeholder="Telefone (Opcional)"
                            value={guestPhone}
                            onChange={e => setGuestPhone(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white w-full outline-none focus:border-emerald-500"
                        />
                    </div>
                 ) : (
                    <div className="space-y-3">
                         {!selectedClient ? (
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-slate-500" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Buscar cliente por nome ou email..."
                                    value={clientSearch}
                                    onChange={e => setClientSearch(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 pl-10 text-white w-full outline-none focus:border-blue-500"
                                />
                                {foundClients.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-700 mt-1 rounded-lg shadow-xl z-10 max-h-40 overflow-y-auto">
                                        {foundClients.map(c => (
                                            <button 
                                                key={c.id} 
                                                onClick={() => { setSelectedClient(c); setFoundClients([]); setClientSearch(""); }}
                                                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm text-slate-200 border-b border-slate-700 last:border-0"
                                            >
                                                <div className="font-bold">{c.name || "Sem Nome"}</div>
                                                <div className="text-xs text-slate-500">{c.email}</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                         ) : (
                             <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                         {(selectedClient.name || "C").charAt(0).toUpperCase()}
                                     </div>
                                     <div>
                                         <p className="text-sm font-bold text-white">{selectedClient.name}</p>
                                         <p className="text-xs text-blue-300">{selectedClient.email}</p>
                                     </div>
                                 </div>
                                 <button onClick={() => setSelectedClient(null)} className="text-xs text-slate-400 hover:text-white underline">
                                     Trocar
                                 </button>
                             </div>
                         )}
                    </div>
                 )}
            </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition text-sm">
                Cancelar
            </button>
            <button 
                onClick={handleConfirm}
                disabled={loading || !selectedSlot || (clientMode === "guest" && !guestName)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Criando..." : "Confirmar Agendamento"}
            </button>
        </div>

      </div>
    </div>
  );
}