-- +migrate Up
CREATE TABLE pages (
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
	created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX pages_slug_unique ON pages (slug);

CREATE TABLE incidents_to_pages (
	page_id integer NOT NULL,
	incident_id integer NOT NULL,
	PRIMARY KEY(incident_id, page_id),
	FOREIGN KEY (page_id) REFERENCES pages(id) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (incident_id) REFERENCES incidents(id) ON UPDATE no action ON DELETE cascade
);

-- +migrate Down
DROP TABLE incidents_to_pages;
DROP INDEX pages_slug_unique;
DROP TABLE pages;
