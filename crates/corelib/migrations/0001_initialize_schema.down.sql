-- Drop users related schemas
DROP INDEX IF EXISTS idx_unique_users_id;
DROP INDEX IF EXISTS idx_unique_users_email;
DROP INDEX IF EXISTS idx_unique_users_username;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_username;
DROP TABLE IF EXISTS users;

-- Drop passwords related schemas
DROP INDEX IF EXISTS idx_passwords_user_id;
DROP TABLE IF EXISTS passwords;

-- Drop sessions related schemas
DROP INDEX IF EXISTS idx_unique_sessions_id;
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP TABLE IF EXISTS sessions;

-- Drop tokens related schemas
DROP INDEX IF EXISTS idx_unique_tokens_id;
DROP INDEX IF EXISTS idx_tokens_user_id;
DROP INDEX IF EXISTS idx_tokens_token;
DROP TABLE IF EXISTS tokens;
