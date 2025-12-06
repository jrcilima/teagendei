import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTenant } from "../contexts/TenantContext";

import ApiClient from "../lib/apiClient";
import { servicesApi } from "../lib/api/servicesApi";
import { appointmentsApi } from "../lib/api/appointmentsApi";
import { usersApi } from "../lib/api/usersApi";

// Tipos dos schemas
import type { Service } from "../../shared/schemas/service";
import type { Appointment } from "../../shared/schemas/appointment";
import type { User } from "../../shared/schemas/user";

const api = new ApiClient();
const serviceService = servicesApi(api);
const appointmentService = appointmentsApi(api);
const userService = usersApi(api);

export default function Dashboard() {
  const { user, loading: loadingUser } = useAuth();
  const { shop, loading: loadingShop } = useTenant();

  // ESTADOS TIPADOS (evita o erro de never[])
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [staff, setStaff] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);

    try {
      // Dono visualiza tudo do shop
      if (user.role === "dono") {
        if (shop?.id) {
          const servicesList = await serviceService.list({
            filter: `shop_id = "${shop.id}"`,
          });

          const appointmentsList = await appointmentService.list({
            filter: `shop_id = "${shop.id}"`,
          });

          const staffList = await userService.list({
            filter: `role = "staff" && shop_id = "${shop.id}"`,
          });

          setServices(servicesList.items);
          setAppointments(appointmentsList.items);
          setStaff(staffList.items);
        }
      }

      // Staff → somente seus atendimentos
      if (user.role === "staff") {
        const appointmentsList = await appointmentService.list({
          filter: `staff_id = "${user.id}"`,
        });

        setAppointments(appointmentsList.items);
      }

      // Cliente → somente seus agendamentos
      if (user.role === "cliente") {
        const appointmentsList = await appointmentService.list({
          filter: `client_id = "${user.id}"`,
        });

        setAppointments(appointmentsList.items);
      }
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user, shop?.id]);

  if (loadingUser || loadingShop || loading) {
    return <div className="p-4 text-center">Carregando Dashboard...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">Usuário não autenticado.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      {user.role === "dono" && (
        <>
          <h2 className="font-semibold text-lg mb-2">Serviços</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(services, null, 2)}</pre>

          <h2 className="font-semibold text-lg mt-6 mb-2">Agendamentos</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(appointments, null, 2)}
          </pre>

          <h2 className="font-semibold text-lg mt-6 mb-2">Equipe</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(staff, null, 2)}</pre>
        </>
      )}

      {user.role === "staff" && (
        <>
          <h2 className="font-semibold text-lg mb-2">Seus Atendimentos</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(appointments, null, 2)}
          </pre>
        </>
      )}

      {user.role === "cliente" && (
        <>
          <h2 className="font-semibold text-lg mb-2">Seus Agendamentos</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(appointments, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
