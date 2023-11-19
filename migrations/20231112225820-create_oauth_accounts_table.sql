-- +migrate Up
CREATE TABLE IF NOT EXISTS oauth_accounts (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
  user_id TEXT(20) NOT NULL,
  account_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  expires_at INTEGER,
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_accounts_user_id ON oauth_accounts(user_id);

-- +migrate StatementBegin

-- Add a trigger function
CREATE TRIGGER update_oauth_accounts_updated_at
AFTER UPDATE ON oauth_accounts
FOR EACH ROW
BEGIN
    UPDATE oauth_accounts SET updated_at = strftime('%Y-%m-%d %H:%M:%S', 'now') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_oauth_accounts_updated_at;
DROP INDEX IF EXISTS idx_accounts_user_id;
DROP TABLE IF EXISTS oauth_accounts;
