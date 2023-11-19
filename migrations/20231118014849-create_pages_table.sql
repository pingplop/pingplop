-- +migrate Up
CREATE TABLE IF NOT EXISTS pages (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
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
