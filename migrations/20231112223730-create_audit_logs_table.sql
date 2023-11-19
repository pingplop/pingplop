-- +migrate Up
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
  payload TEXT DEFAULT (json_object()),
  user_action TEXT(6) DEFAULT '' NOT NULL,
  ip_address TEXT(64) DEFAULT '' NOT NULL,
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL
);

-- +migrate Down
DROP TABLE IF EXISTS audit_logs;
