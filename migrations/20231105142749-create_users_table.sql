-- +migrate Up
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- +migrate Down
DROP TABLE IF EXISTS users;
