--------------------------------------------------------------------------------
-- Create users table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id TEXT(20) PRIMARY KEY NOT NULL,
  tenant_id TEXT(256),
  email TEXT(256) NOT NULL,
  username TEXT(256) NOT NULL,
  first_name TEXT(200),
  last_name TEXT(200),
  avatar_url TEXT(256),
  email_confirmed_at INTEGER,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER,
  banned_until INTEGER
);

-- Create indexes for users table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_users_tenant_id ON users (tenant_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_users_id ON users (id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_users_email ON users (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_users_username ON users (username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);

--------------------------------------------------------------------------------
-- Create passwords table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS passwords (
    user_id TEXT(20) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER,
    PRIMARY KEY(user_id),
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE no action
        ON DELETE no action
);

-- Create indexes for passwords table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_passwords_user_id ON passwords (user_id);
CREATE INDEX IF NOT EXISTS idx_passwords_user_id ON passwords (user_id);

--------------------------------------------------------------------------------
-- Create user sessions table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT(20) PRIMARY KEY NOT NULL,
    user_id TEXT(20) NOT NULL,
    user_agent_hash TEXT(40),
    ip_address TEXT(40),
    expires_at INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE no action ON DELETE cascade
);

-- Create indexes for sessions table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_sessions_id ON sessions (id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

--------------------------------------------------------------------------------
-- Create auth tokens table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tokens (
    id TEXT(20) PRIMARY KEY NOT NULL,
    user_id TEXT(20) NOT NULL,
    kind TEXT(50) NOT NULL, -- verification or recovery
    token TEXT(100) NOT NULL UNIQUE,
    expires_at INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    CONSTRAINT tokens_kind_token_unique UNIQUE (token, kind),
    CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE
);

-- Create index for tokens table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_tokens_id ON tokens(id);
CREATE INDEX IF NOT EXISTS idx_tokens_user_id ON tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_tokens_token ON tokens(token);

--------------------------------------------------------------------------------
-- Create oauth tables
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS oauth_states (
    id INTEGER PRIMARY KEY NOT NULL,
    csrf_state TEXT NOT NULL,
    pkce_code_verifier TEXT NOT NULL,
    return_url TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Create index for oauth_states table
CREATE INDEX IF NOT EXISTS idx_oauth_states_csrf_state ON oauth_states(csrf_state);

CREATE TABLE IF NOT EXISTS oauth_accounts (
    id INTEGER PRIMARY KEY NOT NULL,
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
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE no action ON DELETE cascade
);

-- Create index for oauth_accounts table
CREATE INDEX IF NOT EXISTS idx_oauth_accounts_user_id ON oauth_accounts(user_id);
