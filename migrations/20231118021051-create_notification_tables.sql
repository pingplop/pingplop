-- +migrate Up
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`provider` text NOT NULL,
	`data` text DEFAULT '{}',
	`workspace_id` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `notifications_to_monitors` (
	`monitor_id` integer NOT NULL,
	`notification_id` integer NOT NULL,
	PRIMARY KEY(`monitor_id`, `notification_id`),
	FOREIGN KEY (`monitor_id`) REFERENCES `monitors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON UPDATE no action ON DELETE cascade
);

-- +migrate Down
DROP TABLE notifications_to_monitors;
DROP TABLE notifications;
