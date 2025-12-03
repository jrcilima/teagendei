
-- Tabela de unidades/estabelecimentos
CREATE TABLE shops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company_id INTEGER NOT NULL,
  segment_id INTEGER NOT NULL,
  logo_url TEXT,
  address TEXT,
  phone TEXT,
  description TEXT,
  business_hours TEXT, -- JSON com horários de funcionamento
  accepted_methods TEXT, -- JSON com métodos de pagamento
  pix_key TEXT,
  pix_key_type TEXT CHECK(pix_key_type IN ('cpf', 'cnpj', 'email', 'aleatoria')),
  min_advance_time INTEGER DEFAULT 2, -- horas
  max_advance_time INTEGER DEFAULT 30, -- dias
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (segment_id) REFERENCES segments(id)
);

CREATE INDEX idx_shops_slug ON shops(slug);
CREATE INDEX idx_shops_company_id ON shops(company_id);
CREATE INDEX idx_shops_segment_id ON shops(segment_id);
CREATE INDEX idx_shops_is_active ON shops(is_active);
