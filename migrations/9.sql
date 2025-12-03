
-- Tabela de bloqueios de agenda
CREATE TABLE blocked_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  reason TEXT NOT NULL CHECK(reason IN ('folga', 'feriado', 'manutencao', 'evento')),
  staff_id INTEGER,
  shop_id INTEGER NOT NULL,
  recurring TEXT, -- JSON com configuração de recorrência
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES users(id),
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE INDEX idx_blocked_slots_start_time ON blocked_slots(start_time);
CREATE INDEX idx_blocked_slots_staff_id ON blocked_slots(staff_id);
CREATE INDEX idx_blocked_slots_shop_id ON blocked_slots(shop_id);
