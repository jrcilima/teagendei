import { useEffect, useState } from "react";
import { useTenant } from "../contexts/TenantContext";

import ApiClient from "../lib/apiClient";
import { appointmentsApi } from "../lib/api/appointmentsApi";

import type { Appointment } from "../../shared/schemas/appointment";

const api = new ApiClient();
const appointmentService = appointmentsApi(api);

export default function Appointments() {
  const { shop } = useTenant();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!shop?.id) return;

    try {
      setLoading(true);

      const result = await appointmentService.list({
        filter: `shop_id = "${shop.id}"`,
        perPage: 200,
        sort: "-created"
      });

      setAppointments(result.items);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [shop?.id]);

  if (loading) {
    return <p className="p-4 text-center">Carregando agendamentos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Agendamentos</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((a) => (
            <div key={a.id} className="border p-3 rounded">

              <div className="font-semibold">
                {a.client_id || "Cliente"}
              </div>

              <div className="text-sm opacity-80">
                Serviço ID: {a.service_id}
              </div>

              <div className="text-sm opacity-80">
                Profissional ID: {a.staff_id}
              </div>

              <div className="text-sm opacity-80">
                {a.date ? new Date(String(a.date)).toLocaleString() : "Sem data"}
              </div>

              <div className="text-sm opacity-70">
                Status: {a.status}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
