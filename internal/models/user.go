package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"
)

var TableUser = "users"

type User struct {
	ID               uuid.UUID  `json:"id" sql:"id"`
	Email            *string    `json:"email" sql:"email"`
	FirstName        string     `json:"first_name" sql:"first_name"`
	LastName         string     `json:"last_name" sql:"last_name"`
	PreferedUsername *string    `json:"preferred_username" sql:"preferred_username"`
	AvatarUrl        *string    `json:"avatar_url" sql:"avatar_url"`
	Metadata         *Metadata  `json:"metadata" sql:"metadata"`
	EmailConfirmedAt *time.Time `json:"email_confirmed_at" sql:"email_confirmed_at"`
	BannedUntil      *time.Time `json:"banned_until" sql:"banned_until"`
	CreatedAt        time.Time  `json:"created_at" sql:"created_at"`
	UpdatedAt        time.Time  `json:"updated_at" sql:"updated_at"`
	DeletedAt        *time.Time `json:"deleted_at,omitempty" sql:"deleted_at"`
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
	UserID       uuid.UUID `json:"id" sql:"id"`
	PasswordHash string    `json:"password_hash" sql:"password_hash"`
	CreatedAt    time.Time `json:"created_at" sql:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" sql:"updated_at"`
}
