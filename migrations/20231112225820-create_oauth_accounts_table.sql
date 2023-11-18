-- +migrate Up
CREATE TABLE IF NOT EXISTS oauth_accounts (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  user_id TEXT(36) NOT NULL,
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
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
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
