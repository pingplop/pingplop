package dbx

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/pingplop/pingplop/migrations"
	"github.com/pingplop/pingplop/pkg/env"
	migrate "github.com/rubenv/sql-migrate"
)

func runMigration(conn *sql.DB) error {
	// Configure sql-migrate table name
	migrate.SetDisableCreateTable(false)
	migrate.SetTable("_migrations")

	// Initialize the migration source from embedded SQL files
	migrationSource := migrate.HttpFileSystemMigrationSource{
		FileSystem: http.FS(migrations.MigrationDir),
	}

	params, err := DatabaseParams(env.Config.Database.URL)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	// Database Dialect type
	driver := Dialect(params.Driver)
	var dialect string

	if driver == DialectSQLite || driver == DialectLibSQL {
		dialect = "sqlite3"
	} else {
		panic(fmt.Errorf("unsupported database dialect '%s'", driver))
	}

	// Run database migrations
	log.Printf("running database migration using %s driver", driver)
	n, err := migrate.Exec(conn, dialect, migrationSource, migrate.Up)
	if err != nil {
		log.Fatalf("migration error: %v", err)
	}

	log.Printf("migration applied: %d", n)

	return nil
}
