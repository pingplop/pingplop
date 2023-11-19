-- +migrate Up
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT(20) PRIMARY KEY DEFAULT '' NOT NULL,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  data TEXT DEFAULT (json_object()),
  workspace_id TEXT(20),
  created_at INTEGER DEFAULT (CAST(strftime('%s', 'now', 'utc') AS INTEGER)) NOT NULL,
  updated_at INTEGER,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS notifications_to_monitors (
  monitor_id TEXT(20) NOT NULL,
  notification_id TEXT(20) NOT NULL,
  PRIMARY KEY (monitor_id, notification_id),
  FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (notification_id) REFERENCES notifications(id) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_notifications_updated_at AFTER UPDATE ON notifications FOR EACH ROW
BEGIN
  UPDATE notifications SET updated_at = CAST(strftime('%s', 'now', 'utc') AS INTEGER) WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER IF EXISTS update_notifications_updated_at;
DROP TABLE IF EXISTS notifications_to_monitors;
DROP TABLE IF EXISTS notifications;
