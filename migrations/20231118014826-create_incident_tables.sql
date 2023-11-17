-- +migrate Up
CREATE TABLE `incidents` (
  `id` integer PRIMARY KEY NOT NULL,
  `status` text(4) NOT NULL,
  `title` text(256) NOT NULL,
  `workspace_id` integer NOT NULL,
  `created_at` integer DEFAULT (strftime('%s', 'now')),
  `updated_at` integer DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE incident_updates (
  `id` integer PRIMARY KEY NOT NULL,
  `status` text(4) NOT NULL,
  `date` integer NOT NULL,
  `message` text NOT NULL,
  `created_at` integer DEFAULT (strftime('%s', 'now')),
  `updated_at` integer DEFAULT (strftime('%s', 'now')),
  `incident_id` integer NOT NULL,
  FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE incidents_to_monitors (
	`monitor_id` integer NOT NULL,
	`incident_id` integer NOT NULL,
	PRIMARY KEY(`incident_id`, `monitor_id`)
);

-- +migrate Down
DROP TABLE incident_updates;
DROP TABLE incidents;
