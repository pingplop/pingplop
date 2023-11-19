package dbx

import (
	"database/sql"
	"fmt"

	"github.com/go-gorp/gorp/v3"
	"github.com/pingplop/pingplop/internal/model"
	"github.com/pingplop/pingplop/pkg/env"
	"github.com/pingplop/pingplop/pkg/utils"
)

func DbMapper(conn *sql.DB) *gorp.DbMap {
	params, err := DatabaseParams(env.Config.Database.URL)
	utils.CheckErr(err, "cannot determine database parameter")

	var dialect gorp.Dialect
	driver := Dialect(params.Driver)

	switch driver {
	case DialectSQLite, DialectLibSQL:
		dialect = gorp.SqliteDialect{}
	default:
		utils.CheckErr(fmt.Errorf("unsupported database type: %s", driver), "")
	}

	// construct a gorp DbMap
	dbmap := &gorp.DbMap{Db: conn, Dialect: dialect}

	// register the table and pair with the structs from model
	dbmap.AddTableWithName(model.User{}, model.TableUser)
	dbmap.AddTableWithName(model.Password{}, model.TablePassword)

	return dbmap
}
