import { createContext, useContext, useState, ReactNode } from "react";
import type { Shop, Service, User, TimeSlot } from "@/shared/types";

type BookingContextType = {
  shop: Shop | null;
  service: Service | null;
  professional: User | null;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:MM
  
  setShop: (shop: Shop) => void;
  setService: (service: Service | null) => void;
  setProfessional: (professional: User | null) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [shop, setShop] = useState<Shop | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [professional, setProfessional] = useState<User | null>(null);
  const [selectedDate, setDate] = useState("");
  const [selectedTime, setTime] = useState("");

  const resetBooking = () => {
    setService(null);
    setProfessional(null);
    setDate("");
    setTime("");
  };

  return (
    <BookingContext.Provider
      value={{
        shop,
        service,
        professional,
        selectedDate,
        selectedTime,
        setShop,
        setService,
        setProfessional,
        setDate,
        setTime,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking deve ser usado dentro de BookingProvider");
  }
  return context;
}