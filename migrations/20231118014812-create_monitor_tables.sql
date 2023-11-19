-- +migrate Up
CREATE TABLE IF NOT EXISTS monitors (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
	job_type TEXT(3) DEFAULT 'other' NOT NULL,
	periodicity TEXT(6) DEFAULT 'other' NOT NULL,
	status TEXT(2) DEFAULT 'active' NOT NULL,
	is_active INTEGER DEFAULT false,
	url TEXT(512) NOT NULL,
	name TEXT(256) DEFAULT '' NOT NULL,
	description TEXT DEFAULT '' NOT NULL,
	workspace_id TEXT(20),
	headers TEXT DEFAULT '',
	body TEXT DEFAULT '',
	method TEXT(5) DEFAULT 'GET',
  regions TEXT DEFAULT '' NOT NULL,
	created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_monitors_updated_at AFTER UPDATE ON monitors FOR EACH ROW
BEGIN
  UPDATE monitors SET updated_at = CAST(strftime('%s', 'now', 'utc') AS INTEGER) WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_monitors_updated_at;
DROP TABLE IF EXISTS monitors;
