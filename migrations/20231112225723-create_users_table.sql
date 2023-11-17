-- +migrate Up
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  tenant_id TEXT(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
  email TEXT NOT NULL UNIQUE,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  preferred_username TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  metadata TEXT default '{}',
  email_confirmed_at TEXT,
  banned_until TEXT,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
  updated_at TEXT,
  deleted_at TEXT
);

-- +migrate StatementBegin

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_preferred_username ON users(preferred_username);
CREATE UNIQUE INDEX users_tenant_id_unique ON users (tenant_id);

-- Trigger function to update updated_at
CREATE TRIGGER update_users_updated_at AFTER UPDATE ON users FOR EACH ROW
BEGIN
  UPDATE users SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TABLE IF EXISTS users;
DROP TRIGGER IF EXISTS update_users_updated_at;
