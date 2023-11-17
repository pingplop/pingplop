-- +migrate Up
CREATE TABLE monitors (
	`id` integer PRIMARY KEY NOT NULL,
	`job_type` text(3) DEFAULT 'other' NOT NULL,
	`periodicity` text(6) DEFAULT 'other' NOT NULL,
	`status` text(2) DEFAULT 'active' NOT NULL,
	`active` integer DEFAULT false,
	`url` text(512) NOT NULL,
	`name` text(256) DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`workspace_id` integer,
	`headers` text DEFAULT '',
	`body` text DEFAULT '',
	`method` text(5) DEFAULT 'GET',
  `regions` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
  `updated_at` integer,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `monitors_to_pages` (
	`monitor_id` integer NOT NULL,
	`page_id` integer NOT NULL,
	PRIMARY KEY(`monitor_id`, `page_id`)
);

-- +migrate Down
