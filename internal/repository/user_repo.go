package repository

import (
	"context"
	"log"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/pingplop/pingplop/internal/models"
	"github.com/pingplop/pingplop/pkg/dbx"
	"github.com/pingplop/pingplop/third_party/sqlstruct"
)

// findUser := "select * from users where id = $1"
// findUserByEmail := "select * from users where email = $1"
// findUserByAccount := "select u.* from users u join accounts a on u.id = a."userId" where  a.provider = $1  and  a."providerAccountId" = $2"
// updateUser := "UPDATE users set name = $2, email = $3, "emailVerified" = $4, image = $5 where id = $1 RETURNING name, id, email, "emailVerified", image"

func UserRepository(ctx context.Context) *Repository {
	dbCache := sq.NewStmtCache(dbx.Conn)
	return &Repository{
		Db: sq.StatementBuilder.
			PlaceholderFormat(sq.Dollar).
			RunWith(dbCache),
		Ctx: ctx,
	}
}

func (r Repository) CreateUser(email, firstName, lastName, preferredUsername, password, avatarUrl string) (*models.User, error) {
	var m models.User

	query := r.Db.Insert(models.TableUser).
		Columns("email", "first_name", "last_name", "preferred_username", "avatar_url").
		Values(strings.ToLower(email), firstName, lastName, preferredUsername, avatarUrl).
		Suffix(`ON CONFLICT (email) DO NOTHING`).
		Suffix("RETURNING id, email, first_name, last_name, preferred_username, avatar_url, created_at")

	err := query.QueryRowContext(r.Ctx).Scan(&m.ID, &m.Email, &m.FirstName, &m.LastName, &m.PreferredUsername, &m.AvatarUrl, &m.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &m, nil
}

func (r Repository) CreatePassword(userId uuid.UUID, passwordHash string) (*models.Password, error) {
	var m models.Password

	query := r.Db.Insert(models.TablePassword).
		Columns("user_id", "password_hash").
		Values(userId, passwordHash).
		Suffix(`ON CONFLICT (user_id) DO NOTHING`).
		Suffix("RETURNING user_id, password_hash, created_at")

	err := query.QueryRowContext(r.Ctx).Scan(&m.UserID, &m.PasswordHash, &m.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &m, nil
}

func (r Repository) FindAllUsers() ([]models.User, error) {
	var users []models.User

	// Generate SQL query then execute the query and bind the result to the User struct
	columns := sqlstruct.Columns(models.User{})
	query := r.Db.Select(columns).From("users").Where(sq.Eq{"deleted_at": nil})

	rows, err := query.Query()
	if err != nil {
		// var pgErr *pgconn.PgError
		// if errors.As(err, &pgErr) {
		// 	log.Println(pgErr.Message) // => syntax error at end of input
		// 	log.Println(pgErr.Code)    // => 42601
		// }
		log.Print(err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and scan data into models.User instances
	for rows.Next() {
		var user models.User
		err := sqlstruct.Scan(&user, rows)
		if err != nil {
			log.Print(err)
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func (r Repository) FindUserById(userId string) (models.User, error) {
	var user models.User

	// Generate SQL query then execute the query and bind the result to the User struct
	// columns := []string{"id", "email", "updated_at"} // -> columns...
	columns := sqlstruct.Columns(models.User{})
	rows, err := r.Db.Select(columns).From("users").Where(sq.Eq{"deleted_at": nil}).Where(sq.Eq{"id": userId}).Query()

	if err != nil {
		// var pgErr *pgconn.PgError
		// if errors.As(err, &pgErr) {
		// 	log.Println(pgErr.Message) // => syntax error at end of input
		// 	log.Println(pgErr.Code)    // => 42601
		// }
		log.Print(err)
		return user, err
	}
	defer rows.Close()

	if rows.Next() {
		err = sqlstruct.Scan(&user, rows)
		if err != nil {
			log.Fatal(err)
		}
		return user, err
	}

	return user, nil
}
