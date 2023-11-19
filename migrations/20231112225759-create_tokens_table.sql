-- +migrate Up
CREATE TABLE IF NOT EXISTS tokens (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
  user_id TEXT(20) NOT NULL,
  kind TEXT NOT NULL, -- verification or recovery
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
  CONSTRAINT tokens_kind_token_unique UNIQUE (token, kind),
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE INDEX idx_tokens_user_id ON tokens(user_id);

-- +migrate StatementBegin

CREATE TRIGGER update_tokens_updated_at AFTER UPDATE ON tokens FOR EACH ROW
BEGIN
  UPDATE tokens SET updated_at = CAST(strftime('%s', 'now', 'utc') AS INTEGER) WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_tokens_updated_at;
DROP INDEX IF EXISTS idx_tokens_user_id;
DROP TABLE IF EXISTS tokens;
