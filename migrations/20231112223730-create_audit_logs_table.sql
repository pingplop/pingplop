-- +migrate Up
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  payload TEXT DEFAULT (json_object()),
  user_action TEXT(6) DEFAULT '' NOT NULL,
  ip_address TEXT(64) DEFAULT '' NOT NULL,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL
);

-- +migrate Down
DROP TABLE IF EXISTS audit_logs;
