-- +migrate Up
INSERT INTO users (id, email, first_name, last_name, preferred_username, metadata)
VALUES (
  'clctni7a2ua5epijcg10',
  'admin@xmail.com',
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
  }'
)
ON CONFLICT (email) DO NOTHING
RETURNING id, email, first_name, last_name, preferred_username, avatar_url, created_at;

UPDATE users SET email = 'admin@example.com' where email = 'admin@xmail.com';

-- Password is: @Passw0rd$123
INSERT INTO passwords (user_id, password_hash)
SELECT u.id, '$2y$12$gdq7WmB3wUFoJHy6aRpOv.4v606g/OVeaDxU695cX4kJnBX6A6ptO'
FROM users u WHERE u.email = 'admin@example.com';

-- +migrate Down
DELETE FROM passwords WHERE user_id = (SELECT id FROM users WHERE email = 'admin@example.com');
DELETE FROM users WHERE email = 'admin@example.com';
