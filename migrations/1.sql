
-- Tabela de empresas (tenants)
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  legal_name TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  plan_status TEXT NOT NULL CHECK(plan_status IN ('trial', 'active', 'suspended', 'canceled')),
  plan_type TEXT NOT NULL CHECK(plan_type IN ('empresarial')),
  trial_ends DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_cnpj ON companies(cnpj);
CREATE INDEX idx_companies_plan_status ON companies(plan_status);
