-- +migrate Up
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  user_id UUID NOT NULL,
  session_token TEXT NOT NULL,
  user_agent_hash TEXT,
  ip_address TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- +migrate StatementBegin

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_token ON sessions(session_token);

-- +migrate StatementEnd

-- +migrate Down
DROP TABLE IF EXISTS sessions;
