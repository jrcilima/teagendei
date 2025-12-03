
DROP INDEX idx_shops_manager_id;
DROP INDEX idx_companies_owner_id;
ALTER TABLE shops DROP COLUMN manager_id;
ALTER TABLE companies DROP COLUMN owner_id;
