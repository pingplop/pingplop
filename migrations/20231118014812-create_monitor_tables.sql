-- +migrate Up
CREATE TABLE monitors (
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
	created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

CREATE TABLE monitors_to_pages (
	monitor_id INTEGER NOT NULL,
	page_id INTEGER NOT NULL,
	PRIMARY KEY(monitor_id, page_id)
);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_monitors_updated_at AFTER UPDATE ON monitors FOR EACH ROW
BEGIN
  UPDATE monitors SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER update_monitors_updated_at;
DROP TABLE monitors_to_pages;
DROP TABLE monitors;
