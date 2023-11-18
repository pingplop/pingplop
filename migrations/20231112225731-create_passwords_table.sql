-- +migrate Up
CREATE TABLE IF NOT EXISTS passwords (
  user_id TEXT(36) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT
);

CREATE INDEX idx_passwords_user_id ON passwords(user_id);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_passwords_updated_at AFTER UPDATE ON passwords FOR EACH ROW
BEGIN
  UPDATE passwords SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_passwords_updated_at;
DROP INDEX IF EXISTS idx_passwords_user_id;
DROP TABLE IF EXISTS passwords;
