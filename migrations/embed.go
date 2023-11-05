package migrations

import (
	"embed"
)

//go:embed all:*.sql
var MigrationDir embed.FS
