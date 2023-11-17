-- +migrate Up
CREATE TABLE passwords (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')) NOT NULL,
  updated_at TIMESTAMP
);

-- +migrate StatementBegin

CREATE INDEX idx_passwords_user_id ON passwords(user_id);

-- Trigger function to update updated_at
CREATE TRIGGER update_passwords_updated_at AFTER UPDATE ON passwords FOR EACH ROW
BEGIN
  UPDATE passwords SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TABLE IF EXISTS passwords;
DROP TRIGGER IF EXISTS update_passwords_updated_at;
