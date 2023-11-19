-- +migrate Up
CREATE TABLE IF NOT EXISTS monitors (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
	job_type TEXT(3) DEFAULT 'other' NOT NULL,
	periodicity TEXT(6) DEFAULT 'other' NOT NULL,
	status TEXT(2) DEFAULT 'active' NOT NULL,
	is_active INTEGER DEFAULT false,
	url TEXT(512) NOT NULL,
	name TEXT(256) DEFAULT '' NOT NULL,
	description TEXT DEFAULT '' NOT NULL,
	workspace_id TEXT(36),
	headers TEXT DEFAULT '',
	body TEXT DEFAULT '',
	method TEXT(5) DEFAULT 'GET',
  regions TEXT DEFAULT '' NOT NULL,
	created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

CREATE TABLE IF NOT EXISTS monitors_to_pages (
	monitor_id INTEGER NOT NULL,
	page_id INTEGER NOT NULL,
	PRIMARY KEY(monitor_id, page_id)
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
DROP TABLE IF EXISTS monitors_to_pages;
DROP TABLE IF EXISTS monitors;
