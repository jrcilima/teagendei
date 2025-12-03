
-- Tabela de segmentos (Barbearia, Salão, Esmalteria, Estética)
CREATE TABLE segments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  theme_colors TEXT, -- JSON com cores do tema
  terminology TEXT, -- JSON com terminologias personalizadas
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_segments_slug ON segments(slug);

-- Inserir segmentos padrão
INSERT INTO segments (name, slug, theme_colors, terminology) VALUES
('Barbearia', 'barbearia', '{"primary":"#1e293b","secondary":"#94a3b8","accent":"#f59e0b"}', '{"professional":"Barbeiro","service":"Corte","client":"Cliente"}'),
('Salão de Beleza', 'salao', '{"primary":"#ec4899","secondary":"#fbbf24","accent":"#a855f7"}', '{"professional":"Cabeleireiro","service":"Serviço","client":"Cliente"}'),
('Esmalteria', 'esmalteria', '{"primary":"#db2777","secondary":"#f472b6","accent":"#e879f9"}', '{"professional":"Manicure","service":"Manicure","client":"Cliente"}'),
('Estética', 'estetica', '{"primary":"#059669","secondary":"#34d399","accent":"#10b981"}', '{"professional":"Esteticista","service":"Procedimento","client":"Cliente"}');
