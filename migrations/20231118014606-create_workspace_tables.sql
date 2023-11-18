-- +migrate Up
CREATE TABLE workspaces (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
	slug TEXT NOT NULL,
	name TEXT,
	stripe_id TEXT(256),
	subscription_id TEXT,
	plan TEXT(3),
	ends_at INTEGER,
	paid_until INTEGER,
	created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL
);

CREATE UNIQUE INDEX workspaces_slug_unique ON workspaces (slug);
CREATE UNIQUE INDEX workspaces_stripe_id_unique ON workspaces (stripe_id);

CREATE TABLE users_to_workspaces (
	user_id TEXT(36) NOT NULL,
	workspace_id INTEGER NOT NULL,
	PRIMARY KEY(user_id, workspace_id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

-- +migrate Down
DROP TABLE users_to_workspaces;
DROP INDEX workspaces_slug_unique;
DROP INDEX workspaces_stripe_id_unique;
DROP TABLE workspaces;
