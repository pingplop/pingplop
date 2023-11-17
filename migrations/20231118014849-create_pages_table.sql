-- +migrate Up
CREATE TABLE pages (
	`id` integer PRIMARY KEY NOT NULL,
	`workspace_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text(256),
	`slug` text(256) NOT NULL,
	`custom_domain` text(256) NOT NULL,
	`published` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX pages_slug_unique ON pages (slug);

CREATE TABLE `incidents_to_pages` (
	`page_id` integer NOT NULL,
	`incident_id` integer NOT NULL,
	PRIMARY KEY(`incident_id`, `page_id`),
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE cascade
);

-- +migrate Down
DROP INDEX pages_slug_unique;
DROP TABLE pages;
