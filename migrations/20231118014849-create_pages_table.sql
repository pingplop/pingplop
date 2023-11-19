-- +migrate Up
CREATE TABLE IF NOT EXISTS pages (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
	workspace_id integer NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	icon text(256),
	slug text(256) NOT NULL,
	custom_domain text(256) NOT NULL,
	published integer DEFAULT false,
	created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX pages_slug_unique ON pages (slug);

CREATE TABLE IF NOT EXISTS incidents_to_pages (
	page_id integer NOT NULL,
	incident_id integer NOT NULL,
	PRIMARY KEY(incident_id, page_id),
	FOREIGN KEY (page_id) REFERENCES pages(id) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (incident_id) REFERENCES incidents(id) ON UPDATE no action ON DELETE cascade
);

-- +migrate Down
DROP TABLE IF EXISTS incidents_to_pages;
DROP INDEX IF EXISTS pages_slug_unique;
DROP TABLE IF EXISTS pages;
