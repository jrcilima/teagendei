
-- Tabela de vínculo profissional-serviço
CREATE TABLE staff_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  special_price REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  UNIQUE(staff_id, service_id)
);

CREATE INDEX idx_staff_services_staff_id ON staff_services(staff_id);
CREATE INDEX idx_staff_services_service_id ON staff_services(service_id);
CREATE INDEX idx_staff_services_is_active ON staff_services(is_active);
