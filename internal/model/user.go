package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

	"github.com/rs/xid"
)

var TableUser = "users"

type User struct {
	// db tag is used by Gorp, it's lets you specify the column name if it differs from the struct field
	ID                xid.ID  `json:"id" sql:"id" db:"id"`
	Email             string  `json:"email" sql:"email" db:"email"`
	FirstName         string  `json:"first_name" sql:"first_name" db:"first_name"`
	LastName          string  `json:"last_name" sql:"last_name" db:"last_name"`
	PreferredUsername string  `json:"preferred_username" sql:"preferred_username" db:"preferred_username"`
	AvatarUrl         string  `json:"avatar_url" sql:"avatar_url" db:"avatar_url"`
	Metadata          *string `json:"metadata" sql:"metadata" db:"metadata"`
	// Metadata          *Metadata  `json:"metadata" sql:"metadata" db:"metadata"`
	EmailConfirmedAt *int64 `json:"email_confirmed_at" sql:"email_confirmed_at" db:"email_confirmed_at"`
	BannedUntil      *int64 `json:"banned_until" sql:"banned_until" db:"banned_until"`
	CreatedAt        int64  `json:"created_at" sql:"created_at" db:"created_at"`
	UpdatedAt        int64  `json:"updated_at" sql:"updated_at" db:"updated_at"`
	DeletedAt        *int64 `json:"deleted_at,omitempty" sql:"deleted_at" db:"deleted_at"`
}

// ParseTime parses the Unix timestamp in the User struct and returns a time.Time value
func (u *User) ParseTime(field string) (time.Time, error) {
	return time.Unix(u.CreatedAt, 0).UTC(), nil
}

// The Metadata struct represents the data in the JSON/JSONB column.
// We can use struct tags to control how each field is encoded.
type Metadata struct {
	Role        string   `json:"role,omitempty"`
	Permissions []string `json:"permissions,omitempty"`
	IsActive    bool     `json:"is_active,omitempty"`
	Billing     struct {
		Balance float64 `json:"balance,omitempty"`
	} `json:"billing,omitempty"`
}

// Make the Metadata struct implement the driver.Valuer interface. This method
// simply returns the JSON-encoded representation of the struct.
func (a Metadata) Value() (driver.Value, error) {
	return json.Marshal(a)
}

// Make the Metadata struct implement the sql.Scanner interface. This method
// simply decodes a JSON-encoded value into the struct fields.
func (a *Metadata) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(b, &a)
}

var TablePassword = "passwords"

type Password struct {
	UserID       xid.ID    `json:"user_id" sql:"user_id" db:"user_id"`
	PasswordHash string    `json:"password_hash" sql:"password_hash" db:"password_hash"`
	CreatedAt    time.Time `json:"created_at" sql:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" sql:"updated_at" db:"updated_at"`
}
