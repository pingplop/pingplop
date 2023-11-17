-- +migrate Up
CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  user_id TEXT NOT NULL,
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
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  updated_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- +migrate StatementBegin

CREATE INDEX idx_accounts_user_id ON oauth_accounts(user_id);

-- Add a trigger function
CREATE TRIGGER update_oauth_accounts_updated_at
AFTER UPDATE ON oauth_accounts
FOR EACH ROW
BEGIN
    UPDATE oauth_accounts SET updated_at = strftime('%Y-%m-%d %H:%M:%S', 'now')
    WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TABLE IF EXISTS oauth_accounts;
