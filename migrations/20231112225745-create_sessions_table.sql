-- +migrate Up
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
  user_id TEXT(20) NOT NULL,
  session_token TEXT NOT NULL,
  user_agent_hash TEXT,
  ip_address TEXT,
  expires_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc', '+6 hours') AS INTEGER)) NOT NULL,
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_token ON sessions(session_token);

-- +migrate Down
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_sessions_session_token;
DROP TABLE IF EXISTS sessions;
