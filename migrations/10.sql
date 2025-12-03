
-- Tabela de transações financeiras
CREATE TABLE financial_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id TEXT UNIQUE NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('pagamento', 'reembolso', 'taxa')),
  status TEXT NOT NULL CHECK(status IN ('pendente', 'concluido', 'falhou')),
  method TEXT CHECK(method IN ('pix', 'cartao', 'dinheiro')),
  pix_code TEXT,
  metadata TEXT, -- JSON com dados adicionais
  appointment_id INTEGER,
  shop_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  FOREIGN KEY (shop_id) REFERENCES shops(id),
  FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE INDEX idx_financial_transactions_transaction_id ON financial_transactions(transaction_id);
CREATE INDEX idx_financial_transactions_status ON financial_transactions(status);
CREATE INDEX idx_financial_transactions_appointment_id ON financial_transactions(appointment_id);
CREATE INDEX idx_financial_transactions_shop_id ON financial_transactions(shop_id);
CREATE INDEX idx_financial_transactions_client_id ON financial_transactions(client_id);
