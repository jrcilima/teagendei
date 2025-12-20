import { useState, useEffect } from "react";
import { X, User as UserIcon, Calendar, Clock, Scissors, Search, Ban, CheckCircle } from "lucide-react";
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
  
  // TIPO DE AÇÃO: AGENDAR ou BLOQUEAR
  const [modalType, setModalType] = useState<"appointment" | "block">("appointment");

  // Estados Comuns
  const [selectedBarber, setSelectedBarber] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Estados para Agendamento
  const [selectedService, setSelectedService] = useState<string>("");
  const [clientMode, setClientMode] = useState<"registered" | "guest">("guest");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [foundClients, setFoundClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  // Estados para Bloqueio
  const [blockReason, setBlockReason] = useState("");
  const [blockDuration, setBlockDuration] = useState(60); // Padrão 1 hora

  // Dados Carregados
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<User[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  
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
    if (!selectedBarber || !date || !user?.shop_id) {
        setSlots([]);
        return;
    }

    // Se for bloqueio, não precisamos de serviço para calcular slots livres, 
    // mas precisamos de uma "duração base" para desenhar a grade. Usaremos 30min ou a duração do bloqueio.
    const durationForGrid = modalType === "appointment" 
        ? services.find(s => s.id === selectedService)?.duration || 30 
        : blockDuration;

    // Se for agendamento e não tiver serviço selecionado, não busca
    if (modalType === "appointment" && !selectedService) {
        setSlots([]);
        return;
    }

    async function fetchSlots() {
      setSlotLoading(true);
      try {
        const [hours, appointments] = await Promise.all([
          getShopHours(user!.shop_id!),
          getProfessionalAppointments(selectedBarber, date)
        ]);

        const generated = generateSlots(date, durationForGrid, hours, appointments);
        setSlots(generated);
      } catch (err) {
        console.error(err);
      } finally {
        setSlotLoading(false);
      }
    }

    fetchSlots();
  }, [selectedService, selectedBarber, date, user?.shop_id, services, modalType, blockDuration]);

  // Busca Clientes (apenas se for agendamento)
  useEffect(() => {
    if (modalType === "appointment" && clientMode === "registered" && clientSearch.length > 2) {
      const timer = setTimeout(() => {
        searchClients(clientSearch).then(res => setFoundClients(res.items as unknown as User[]));
      }, 500);
      return () => clearTimeout(timer);
    } else {
        setFoundClients([]);
    }
  }, [clientSearch, clientMode, modalType]);

  async function handleConfirm() {
    if (!user?.shop_id || !selectedSlot || !selectedBarber) return;
    
    // Payload Base
    const payload: any = {
        shop_id: user.shop_id,
        barber_id: selectedBarber,
        start_time: selectedSlot,
    };

    if (modalType === "appointment") {
        const serviceObj = services.find(s => s.id === selectedService);
        if (!serviceObj) return;

        if (clientMode === "guest" && !guestName.trim()) return alert("Digite o nome do cliente.");
        if (clientMode === "registered" && !selectedClient) return alert("Selecione um cliente.");

        payload.status = AppointmentStatus.Confirmed;
        payload.service_id = selectedService;
        payload.duration_minutes = serviceObj.duration;
        payload.total_amount = serviceObj.price;
        payload.client_id = clientMode === "registered" ? selectedClient?.id : undefined;
        payload.customer_name = clientMode === "guest" ? guestName : undefined;
        payload.customer_phone = clientMode === "guest" ? guestPhone : undefined;
    } else {
        // BLOQUEIO
        if (!blockReason.trim()) return alert("Digite o motivo do bloqueio (ex: Almoço).");
        
        payload.status = AppointmentStatus.Blocked; // Código 6
        payload.notes = blockReason;
        payload.duration_minutes = blockDuration;
        // Sem serviço, sem cliente
    }

    setLoading(true);
    try {
      await createStaffAppointment(payload);
      alert(modalType === "appointment" ? "Agendado com sucesso!" : "Horário bloqueado!");
      onSuccess();
      onClose();
      
      // Reset
      setSelectedSlot(null);
      setGuestName("");
      setBlockReason("");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao salvar.");
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
          <div className="flex gap-4">
              <button 
                onClick={() => setModalType("appointment")}
                className={`text-lg font-bold pb-1 border-b-2 transition ${modalType === "appointment" ? "text-emerald-400 border-emerald-400" : "text-slate-500 border-transparent"}`}
              >
                  Novo Agendamento
              </button>
              <button 
                onClick={() => setModalType("block")}
                className={`text-lg font-bold pb-1 border-b-2 transition ${modalType === "block" ? "text-red-400 border-red-400" : "text-slate-500 border-transparent"}`}
              >
                  Bloquear Horário
              </button>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* 1. CONFIGURAÇÃO (VARIA POR TIPO) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modalType === "appointment" ? (
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
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                            <Ban size={14} /> Motivo do Bloqueio
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ex: Almoço, Médico..."
                            value={blockReason} 
                            onChange={e => setBlockReason(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                )}

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

             {/* DURAÇÃO MANUAL PARA BLOQUEIO */}
             {modalType === "block" && (
                <div>
                     <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        <Clock size={14} /> Duração do Bloqueio (minutos)
                    </label>
                    <div className="flex gap-2">
                        {[30, 60, 90, 120].map(m => (
                            <button 
                                key={m} 
                                onClick={() => setBlockDuration(m)}
                                className={`px-4 py-2 rounded-lg text-sm border ${blockDuration === m ? "bg-red-500/20 border-red-500 text-red-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                            >
                                {m} min
                            </button>
                        ))}
                        <input 
                            type="number" 
                            value={blockDuration}
                            onChange={e => setBlockDuration(Number(e.target.value))}
                            className="w-20 bg-slate-800 border border-slate-700 rounded-lg p-2 text-center text-white focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>
             )}

            {/* 2. DATA E HORÁRIO */}
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
                            <Clock size={14} /> Horários Disponíveis
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
                                                ? (modalType === "appointment" ? "bg-emerald-500 border-emerald-500" : "bg-red-500 border-red-500") + " text-white font-bold"
                                                : slot.isAvailable
                                                ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                                                : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-500 text-sm italic border border-dashed border-slate-700 rounded p-2 text-center">
                                {modalType === "appointment" && !selectedService ? "Selecione um serviço primeiro." : "Nenhum horário disponível."}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. CLIENTE (Apenas para Agendamento) */}
            {modalType === "appointment" && (
                <div className="border-t border-slate-800 pt-6">
                    <label className="block text-sm font-medium text-slate-400 mb-4">Dados do Cliente</label>
                    <div className="flex gap-4 mb-4">
                        <button onClick={() => { setClientMode("guest"); setSelectedClient(null); }} className={`flex-1 py-2 text-sm rounded-lg border transition ${clientMode === "guest" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}>Cliente Avulso</button>
                        <button onClick={() => { setClientMode("registered"); setGuestName(""); }} className={`flex-1 py-2 text-sm rounded-lg border transition ${clientMode === "registered" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}>Cliente Cadastrado</button>
                    </div>

                    {clientMode === "guest" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Nome *" value={guestName} onChange={e => setGuestName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white w-full outline-none focus:border-emerald-500" />
                            <input type="text" placeholder="Telefone" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white w-full outline-none focus:border-emerald-500" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {!selectedClient ? (
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input type="text" placeholder="Buscar cliente..." value={clientSearch} onChange={e => setClientSearch(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 pl-10 text-white w-full outline-none focus:border-blue-500" />
                                    {foundClients.length > 0 && (
                                        <div className="absolute top-full bg-slate-800 border border-slate-700 mt-1 rounded-lg shadow-xl z-10 w-full max-h-40 overflow-y-auto">
                                            {foundClients.map(c => (
                                                <button key={c.id} onClick={() => { setSelectedClient(c); setFoundClients([]); setClientSearch(""); }} className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm text-slate-200 border-b border-slate-700 last:border-0">{c.name || "Sem Nome"}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-between bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg text-white text-sm">
                                    <span>{selectedClient.name}</span>
                                    <button onClick={() => setSelectedClient(null)} className="underline text-slate-400">Trocar</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition text-sm">Cancelar</button>
            <button 
                onClick={handleConfirm}
                disabled={loading || !selectedSlot}
                className={`px-6 py-2 rounded-lg font-medium text-white transition disabled:opacity-50 ${modalType === "appointment" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
            >
                {loading ? "Salvando..." : modalType === "appointment" ? "Confirmar Agendamento" : "Confirmar Bloqueio"}
            </button>
        </div>

      </div>
    </div>
  );
}