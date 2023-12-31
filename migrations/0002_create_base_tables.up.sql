--------------------------------------------------------------------------------
-- Create workspaces table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspaces (
	id INTEGER PRIMARY KEY NOT NULL,
	slug TEXT NOT NULL,
	name TEXT NOT NULL,
	lms_customer_id TEXT(256), -- LemonSqueezy
	lms_subscription_id TEXT(256), -- LemonSqueezy
    lms_billing_renew_at INTEGER, -- LemonSqueezy
    billing_plan TEXT DEFAULT 'hobby' NOT NULL,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER
);

-- Create indexes for workspaces table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_workspaces_slug ON workspaces (slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_workspaces_lms_customer_id ON workspaces (lms_customer_id);

--------------------------------------------------------------------------------
-- Create users_to_workspaces table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users_to_workspaces (
	user_id TEXT(20) NOT NULL,
	workspace_id INTEGER NOT NULL,
    role TEXT DEFAULT 'owner' NOT NULL,
	PRIMARY KEY(user_id, workspace_id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

--------------------------------------------------------------------------------
-- Create invitations table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invitations (
	id INTEGER PRIMARY KEY NOT NULL,
	workspace_id INTEGER NOT NULL,
	email TEXT NOT NULL,
	role TEXT DEFAULT 'member' NOT NULL,
	token TEXT NOT NULL,
	expires_at INTEGER NOT NULL,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
	accepted_at integer,
    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

--------------------------------------------------------------------------------
-- Create pages table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pages (
	id INTEGER PRIMARY KEY NOT NULL,
	workspace_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	slug TEXT(256) NOT NULL,
	description TEXT NOT NULL,
	logo_url TEXT,
	favicon TEXT,
	custom_domain TEXT(256) NOT NULL,
	published INTEGER DEFAULT false,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE cascade
);

-- Create indexes for pages table
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_pages_slug ON pages (slug);

--------------------------------------------------------------------------------
-- Create status_reports table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS status_reports (
  id INTEGER PRIMARY KEY NOT NULL,
  workspace_id INTEGER NOT NULL,
  status TEXT(4) NOT NULL,
  title TEXT(256) NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS status_report_updates (
  id INTEGER PRIMARY KEY NOT NULL,
  status_report_id INTEGER NOT NULL,
  status TEXT(4) NOT NULL,
  date INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER,
  FOREIGN KEY (status_report_id) REFERENCES status_reports(id) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS status_reports_to_pages (
	page_id INTEGER NOT NULL,
	status_report_id INTEGER NOT NULL,
	PRIMARY KEY(status_report_id, page_id),
	FOREIGN KEY (page_id) REFERENCES pages(id) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (status_report_id) REFERENCES status_reports(id) ON UPDATE no action ON DELETE cascade
);

--------------------------------------------------------------------------------
-- Create monitors table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS monitors (
	id INTEGER PRIMARY KEY NOT NULL,
	workspace_id INTEGER,
	job_type TEXT(3) DEFAULT 'other' NOT NULL,
	periodicity TEXT(6) DEFAULT 'other' NOT NULL,
    status TEXT(20) DEFAULT 'active' NOT NULL,
	active INTEGER DEFAULT false,
	url TEXT(512) NOT NULL,
	name TEXT(256) DEFAULT '' NOT NULL,
	description TEXT DEFAULT '' NOT NULL,
	headers TEXT DEFAULT '',
	body TEXT DEFAULT '',
	method TEXT(5) DEFAULT 'GET',
    regions TEXT DEFAULT '' NOT NULL,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

CREATE TABLE IF NOT EXISTS monitors_to_pages (
	monitor_id INTEGER NOT NULL,
	page_id INTEGER NOT NULL,
	PRIMARY KEY(monitor_id, page_id),
	FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON UPDATE no action ON DELETE cascade
);

--------------------------------------------------------------------------------
-- Create status_report_to_monitors table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS status_report_to_monitors (
	monitor_id INTEGER NOT NULL,
	status_report_id INTEGER NOT NULL,
	PRIMARY KEY(status_report_id, monitor_id),
    FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (status_report_id) REFERENCES status_reports(id) ON UPDATE no action ON DELETE cascade
);

--------------------------------------------------------------------------------
-- Create integrations table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS integrations (
	id INTEGER PRIMARY KEY NOT NULL,
	workspace_id INTEGER,
	name TEXT(256) NOT NULL,
	credential TEXT,
	external_id TEXT NOT NULL,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
	updated_at INTEGER,
	data TEXT NOT NULL,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

--------------------------------------------------------------------------------
-- Create notifications table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
	id INTEGER PRIMARY KEY NOT NULL,
	workspace_id INTEGER,
	name TEXT NOT NULL,
	provider TEXT NOT NULL,
	data TEXT DEFAULT '{}',
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
	updated_at INTEGER,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE no action ON DELETE no action
);

CREATE TABLE IF NOT EXISTS notifications_to_monitors (
	monitor_id INTEGER NOT NULL,
	notification_id INTEGER NOT NULL,
	PRIMARY KEY(monitor_id, notification_id),
	FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (notification_id) REFERENCES notifications(id) ON UPDATE no action ON DELETE cascade
);

--------------------------------------------------------------------------------
-- Create monitor_status table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS monitor_status (
	monitor_id INTEGER NOT NULL,
	region TEXT DEFAULT '' NOT NULL,
	status TEXT DEFAULT 'active' NOT NULL,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
	updated_at INTEGER,
	PRIMARY KEY(monitor_id, region),
	FOREIGN KEY (monitor_id) REFERENCES monitors (id) ON UPDATE no action ON DELETE cascade
);

-- Create indexes for monitor_status table
CREATE INDEX IF NOT EXISTS idx_monitor_status ON monitor_status (monitor_id,region);

--------------------------------------------------------------------------------
-- Create page_subscribers table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_subscribers (
	id INTEGER PRIMARY KEY NOT NULL,
	page_id INTEGER NOT NULL,
	email TEXT NOT NULL,
	token TEXT,
	accepted_at INTEGER,
	expires_at INTEGER,
	created_at INTEGER DEFAULT (strftime('%s', 'now')),
	updated_at INTEGER,
	FOREIGN KEY (page_id) REFERENCES pages(id) ON UPDATE no action ON DELETE no action
);
