-- +migrate Up
INSERT INTO users (email, first_name, last_name, prefered_username, metadata, created_at)
VALUES (
    'admin@example.com',
    'Admin',
    'Sistem',
    'admin',
    '{
       "role": "administrator",
       "permissions": ["guest", "admin"],
       "is_active": true,
       "billing": {
          "balance": 500.00
       }
    }',
    datetime('now', 'localtime')
) ON CONFLICT (email) DO NOTHING
RETURNING id, email, first_name, last_name, prefered_username, avatar_url, created_at;

-- +migrate StatementBegin

-- Password is: @Passw0rd$123
INSERT INTO passwords (user_id, password_hash, created_at)
SELECT u.id, '$2y$12$gdq7WmB3wUFoJHy6aRpOv.4v606g/OVeaDxU695cX4kJnBX6A6ptO', datetime('now', 'localtime')
FROM users u WHERE u.email = 'admin@example.com';
-- +migrate StatementEnd

-- +migrate Down
DELETE FROM passwords WHERE user_id = (SELECT id FROM users WHERE email = 'admin@example.com');
DELETE FROM users WHERE email = 'admin@example.com';
