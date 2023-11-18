-- +migrate Up
CREATE TABLE users (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  -- tenant_id TEXT(36) NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  preferred_username TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  metadata TEXT DEFAULT (json_object()),
  email_confirmed_at TEXT,
  banned_until TEXT,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
  deleted_at TEXT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_preferred_username ON users(preferred_username);
CREATE INDEX idx_users_name ON users (first_name, last_name);

-- CREATE UNIQUE INDEX idx_unique_users_tenant_id ON users(tenant_id);
CREATE UNIQUE INDEX idx_unique_users_email ON users(email);

-- +migrate StatementBegin

-- Trigger for validate email address
CREATE TRIGGER validate_email_before_insert_users BEFORE INSERT ON users
BEGIN
  SELECT
    CASE WHEN NEW.email NOT LIKE '%_@__%.__%' THEN RAISE (ABORT,'Invalid email address')
  END;
END;

-- Trigger function to update updated_at
CREATE TRIGGER update_users_updated_at AFTER UPDATE ON users FOR EACH ROW
BEGIN
  UPDATE users SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc') WHERE id = NEW.id;
END;

-- Trigger for audit logs
CREATE TRIGGER log_users_table_after_update AFTER UPDATE ON users
   WHEN old.email <> new.email
   OR old.first_name <> new.first_name
   OR old.last_name <> new.last_name
BEGIN
	INSERT INTO audit_logs (payload, user_action, created_at)
    VALUES (
      json_object(
        'log_type', 'user',
        'action', 'user_data_updated',
        'actor_id', NEW.id,
        'timestamp', strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc'),
        'old_data', json_object('email', old.email, 'first_name', old.first_name, 'last_name', old.last_name),
        'new_data', json_object('email', new.email, 'first_name', new.first_name, 'last_name', new.last_name)
      ),
      'UPDATE', strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')
  );
END;

-- +migrate StatementEnd

-- +migrate Down
DROP INDEX idx_users_email;
DROP INDEX idx_users_preferred_username;
DROP INDEX idx_users_name;
-- DROP INDEX idx_unique_users_tenant_id;
DROP INDEX idx_unique_users_email;
DROP TRIGGER validate_email_before_insert_users;
DROP TRIGGER update_users_updated_at;
DROP TABLE users;
