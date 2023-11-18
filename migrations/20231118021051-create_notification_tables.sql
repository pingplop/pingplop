-- +migrate Up
CREATE TABLE notifications (
  id TEXT(36) PRIMARY KEY DEFAULT (lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
    substr(hex( randomblob(2)), 2) || '-' ||
    substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )) NOT NULL,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  data TEXT DEFAULT (json_object()),
  workspace_id TEXT(36),
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc')) NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE notifications_to_monitors (
  monitor_id TEXT(36) NOT NULL,
  notification_id TEXT(36) NOT NULL,
  PRIMARY KEY (monitor_id, notification_id),
  FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (notification_id) REFERENCES notifications(id) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- +migrate StatementBegin

-- Trigger function to update updated_at
CREATE TRIGGER update_notifications_updated_at AFTER UPDATE ON notifications FOR EACH ROW
BEGIN
  UPDATE notifications SET updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now', 'utc') WHERE id = NEW.id;
END;

-- +migrate StatementEnd

-- +migrate Down
DROP TRIGGER update_notifications_updated_at;
DROP TABLE notifications_to_monitors;
DROP TABLE notifications;
