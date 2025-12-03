
-- Adicionar owner_id à tabela companies
ALTER TABLE companies ADD COLUMN owner_id INTEGER REFERENCES users(id);
CREATE INDEX idx_companies_owner_id ON companies(owner_id);

-- Adicionar manager_id à tabela shops
ALTER TABLE shops ADD COLUMN manager_id INTEGER REFERENCES users(id);
CREATE INDEX idx_shops_manager_id ON shops(manager_id);
