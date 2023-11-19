package dbx

import (
	"database/sql"
	"fmt"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"github.com/pingplop/pingplop/pkg/env"
	"github.com/pingplop/pingplop/pkg/utils"

	_ "github.com/libsql/libsql-client-go/libsql"
	_ "modernc.org/sqlite"
)

type Database struct {
	Conn *sql.DB
  Params *DBParams
}

type DBParams struct {
	Driver    string
	FilePath  string
	AuthToken string
}

type Dialect string

const (
	DialectSQLite Dialect = "sqlite"
	DialectLibSQL Dialect = "libsql"
)

var Conn *sql.DB

var allowedSchemes = []string{"file", "libsql", "sqlite"}

// Initialize database connection
func New() (*Database, error) {
	params, err := DatabaseParams(env.Config.Database.URL)
	if err != nil {
		return nil, err
	}

	driver := Dialect(params.Driver)
	log.Printf("using %s database driver", driver)

	var ds, dialect string

	if driver == DialectSQLite {
		dataDir, err := prepareDataDirectory("data")
		if err != nil {
			return nil, err
		}

		dbPath := filepath.Join(dataDir, params.FilePath)
		dialect = string(DialectSQLite)

		if err := ensureDatabaseFileExists(dbPath); err != nil {
			return nil, err
		}

		ds = dbPath
	} else if driver == DialectLibSQL {
		ds = env.Config.Database.URL
		dialect = string(DialectLibSQL)
	} else {
		return nil, fmt.Errorf("unsupported database driver '%s'", params.Driver)
	}

	// Establish a connection to the database
	log.Printf("connecting to: %s", params.FilePath)
	conn, err := sql.Open(dialect, ds)
  utils.CheckErr(err, "sql.Open failed")

	if err := connectionCheck(conn); err != nil {
		return nil, err
	}

	log.Println("database connection established")

	if env.Config.Database.AutoMigrate {
		if err := runMigration(conn); err != nil {
			return nil, err
		}
	}

	Conn = conn

	return &Database{
		Conn:   Conn,
		Params: params,
	}, nil
}

func connectionCheck(conn *sql.DB) error {
	return conn.Ping()
}

func DatabaseParams(urlString string) (*DBParams, error) {
	if urlString == "" {
		urlString = env.DefaultDatabaseUrl
	}

	if !isValidScheme(urlString) {
		return nil, fmt.Errorf("unsupported or invalid database scheme: %s", urlString)
	}

	parsedURL, err := url.Parse(urlString)
	if err != nil {
		return nil, fmt.Errorf("cannot parse DATABASE_URL: %w", err)
	}

	var driver, filePath, token string

	// Check if the scheme is one of the allowed values
	if parsedURL.Scheme == string(DialectSQLite) || parsedURL.Scheme == "file" {
		driver = string(DialectSQLite)
		filePath = parsedURL.Host + parsedURL.Path
	} else if isAllowedScheme(parsedURL.Scheme) {
		driver = parsedURL.Scheme
		filePath = parsedURL.Host + parsedURL.Path
	} else {
		return nil, fmt.Errorf("unsupported database driver: %s", parsedURL.Scheme)
	}

	parameters, err := url.ParseQuery(parsedURL.RawQuery)
	if err != nil {
		return nil, fmt.Errorf("cannot parse query parameters: %w", err)
	}

	if t := parameters.Get("authToken"); t != "" {
		token = t
	}

	dbParams := &DBParams{
		Driver:    driver,
		FilePath:  filePath,
		AuthToken: token,
	}

	return dbParams, nil
}

func ensureDatabaseFileExists(filePath string) error {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		file, err := os.Create(filePath)
		if err != nil {
			return err
		}
		file.Close()
	}
	return nil
}

func prepareDataDirectory(dirName string) (string, error) {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		return "", err
	}

	dataDir := filepath.Join(dir, dirName)

	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		if err := os.Mkdir(dataDir, 0755); err != nil {
			log.Fatal(err)
		}
		log.Println("data directory created")
	} else {
		log.Println("data directory already exists")
	}

	return dataDir, nil
}

func isValidScheme(urlString string) bool {
	u, err := url.Parse(urlString)
	if err != nil {
		return false
	}
	return isAllowedScheme(u.Scheme)
}

func isAllowedScheme(scheme string) bool {
	for _, allowedScheme := range allowedSchemes {
		if strings.EqualFold(scheme, allowedScheme) {
			return true
		}
	}
	return false
}
