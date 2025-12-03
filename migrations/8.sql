
-- Tabela de agendamentos
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('agendado', 'confirmado', 'em_andamento', 'concluido', 'cancelado', 'faltou')),
  payment_status TEXT NOT NULL CHECK(payment_status IN ('nao_pago', 'pago', 'reembolsado', 'pendente')),
  payment_method TEXT CHECK(payment_method IN ('pix', 'dinheiro', 'cartao')),
  total_amount REAL NOT NULL,
  notes TEXT,
  client_id INTEGER NOT NULL,
  staff_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  shop_id INTEGER NOT NULL,
  company_id INTEGER NOT NULL,
  reminder_sent BOOLEAN DEFAULT FALSE,
  confirmation_sent BOOLEAN DEFAULT FALSE,
  cancellation_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (staff_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (shop_id) REFERENCES shops(id),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_staff_id ON appointments(staff_id);
CREATE INDEX idx_appointments_shop_id ON appointments(shop_id);
CREATE INDEX idx_appointments_company_id ON appointments(company_id);
