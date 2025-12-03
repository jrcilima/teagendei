
-- Tabela de notificações
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK(type IN ('whatsapp', 'email', 'sms', 'push')),
  recipient TEXT NOT NULL,
  subject TEXT,
  content TEXT, -- JSON com conteúdo
  status TEXT NOT NULL CHECK(status IN ('enviado', 'falhou', 'pendente')),
  sent_at DATETIME,
  related_id TEXT,
  channel TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_recipient ON notifications(recipient);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);
