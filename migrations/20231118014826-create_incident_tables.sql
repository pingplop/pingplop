-- +migrate Up
CREATE TABLE IF NOT EXISTS incidents (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  status text(4) NOT NULL,
  title text(256) NOT NULL,
  workspace_id integer NOT NULL,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS incident_updates (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  status text(4) NOT NULL,
  date integer NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
  incident_id integer NOT NULL,
  FOREIGN KEY (incident_id) REFERENCES incidents(id) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS incidents_to_monitors (
	monitor_id integer NOT NULL,
	incident_id integer NOT NULL,
	PRIMARY KEY(incident_id, monitor_id)
);

-- +migrate StatementBegin

-- Add a trigger function
CREATE TRIGGER update_incidents_updated_at
AFTER UPDATE ON incidents
FOR EACH ROW
BEGIN
    UPDATE incidents SET updated_at = strftime('%Y-%m-%d %H:%M:%S', 'now') WHERE id = NEW.id;
END;

-- Add a trigger function
CREATE TRIGGER update_incident_updates_updated_at
AFTER UPDATE ON incident_updates
FOR EACH ROW
BEGIN
    UPDATE incident_updates SET updated_at = strftime('%Y-%m-%d %H:%M:%S', 'now') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_incident_updates_updated_at;
DROP TRIGGER IF EXISTS update_incidents_updated_at;
DROP TABLE IF EXISTS incidents_to_monitors;
DROP TABLE IF EXISTS incident_updates;
DROP TABLE IF EXISTS incidents;
