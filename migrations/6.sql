
-- Tabela de serviços
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  duration INTEGER NOT NULL, -- minutos
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  shop_id INTEGER NOT NULL,
  required_staff INTEGER DEFAULT 1,
  buffer_time INTEGER DEFAULT 0, -- minutos entre agendamentos
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE INDEX idx_services_shop_id ON services(shop_id);
CREATE INDEX idx_services_is_active ON services(is_active);
