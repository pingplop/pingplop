-- +migrate Up
CREATE TABLE IF NOT EXISTS passwords (
  user_id TEXT(20) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER
);

CREATE INDEX idx_passwords_user_id ON passwords(user_id);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_passwords_updated_at AFTER UPDATE ON passwords FOR EACH ROW
BEGIN
  UPDATE passwords SET updated_at = CAST(strftime('%s', 'now', 'utc') AS INTEGER) WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_passwords_updated_at;
DROP INDEX IF EXISTS idx_passwords_user_id;
DROP TABLE IF EXISTS passwords;
