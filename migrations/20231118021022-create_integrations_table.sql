-- +migrate Up
CREATE TABLE IF NOT EXISTS integrations (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
	name text(256) NOT NULL,
	workspace_id TEXT(20),
	credential TEXT,
	external_id TEXT NOT NULL,
	data TEXT NOT NULL,
	created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

-- +migrate Down
DROP TABLE IF EXISTS integrations;
