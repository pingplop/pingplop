package repository

import (
	"context"

	sq "github.com/Masterminds/squirrel"
)

type Repository struct {
	Db  sq.StatementBuilderType
	Ctx context.Context
}
