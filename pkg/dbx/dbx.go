package dbx

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/pingplop/pingplop/migrations"
	"github.com/pingplop/pingplop/pkg/env"
	migrate "github.com/rubenv/sql-migrate"

	_ "github.com/libsql/libsql-client-go/libsql"
	_ "modernc.org/sqlite"
)

type Database struct {
	Conn *sql.DB
}

type Dialect string

const (
	DialectSQLite Dialect = "sqlite"
	DialectLibSQL Dialect = "libsql"
)

var (
	Conn *sql.DB
)

func New() (*Database, error) {

	// Get the directory of the binary file
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}

	// Data directory path
	dataDir := filepath.Join(dir, "data")

	// Check if the data directory exists, if not, create it
	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		err := os.Mkdir(dataDir, 0755) // Create the directory with read/write permissions for owner
		if err != nil {
			log.Fatal(err)
		}
		log.Println("data directory created")
	} else {
		log.Println("data directory already exists")
	}

	// Initialize database connection
	dbDialect := env.Config.Database.Driver
	log.Printf("using %s database driver", dbDialect)

	var dbUrl string
	if dbDialect == string(DialectSQLite) {
		// Database file path inside the data directory
		dbUrl = filepath.Join(dataDir, "pingplop.db")

		// Check if the database file exists, if not, create it
		if _, err := os.Stat(dbUrl); os.IsNotExist(err) {
			file, err := os.Create(dbUrl)
			if err != nil {
				log.Fatal(err)
			}
			file.Close()
			log.Println("sqlite database file created")
		} else {
			log.Println("sqlite database file already exists")
		}
		log.Printf("database path: %s", dbUrl)
	} else if dbDialect == string(DialectLibSQL) {
		dbUrl = fmt.Sprintf("%s?authToken=%s", env.Config.Database.URL, env.Config.Database.AuthToken)
	} else {
		panic(fmt.Errorf("unsupported database driver '%s'", dbDialect))
	}

	// Establish a connection to the database
	conn, err := sql.Open(dbDialect, dbUrl)
	if err != nil {
		return nil, err
	}

	// Check database connection
	if err := connectionCheck(conn); err != nil {
		return nil, err
	}
	log.Println("database connection established")

	if env.Config.Database.AutoMigrate {
		err := runMigration(conn)
		if err != nil {
			return nil, err
		}
	}

	// Initialize SQL Query builder and migrator
	Conn = conn

	return &Database{conn}, nil
}

func connectionCheck(conn *sql.DB) error {
	if err := conn.Ping(); err != nil {
		return err
	}
	return nil
}

func runMigration(conn *sql.DB) error {
	// Configure sql-migrate table name
	migrate.SetTable("_migrations")

	// Initialize the migration source from embedded SQL files
	migrationSource := migrate.HttpFileSystemMigrationSource{
		FileSystem: http.FS(migrations.MigrationDir),
	}

	// Run database migrations
	log.Println("running database migration")
	n, err := migrate.Exec(conn, "sqlite3", migrationSource, migrate.Up)
	if err != nil {
		log.Fatalf("migration error: %v", err)
	}

	log.Printf("migration applied: %d", n)

	return nil
}
