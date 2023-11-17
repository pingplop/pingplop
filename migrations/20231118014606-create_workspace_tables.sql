-- +migrate Up
CREATE TABLE workspaces (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text,
	`stripe_id` text(256),
	`subscription_id` text,
	`plan` text(3),
	`ends_at` integer,
	`paid_until` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE users_to_workspaces (
	`user_id` TEXT(36) NOT NULL,
	`workspace_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `workspace_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE UNIQUE INDEX `workspaces_slug_unique` ON `workspaces` (`slug`);
CREATE UNIQUE INDEX `workspaces_stripe_id_unique` ON `workspaces` (`stripe_id`);

-- +migrate Down
DROP INDEX workspaces_slug_unique;
DROP INDEX workspaces_stripe_id_unique;
DROP TABLE users_to_workspaces;
DROP TABLE workspaces;
