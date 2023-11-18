package jwt

import (
	"github.com/pingplop/pingplop/pkg/env"
	"github.com/pingplop/pingplop/pkg/middleware/jwtauth"
)

var TokenAuth *jwtauth.JWTAuth

func init() {
	jwtSecret := env.Config.JWTSecret
	TokenAuth = jwtauth.New("HS256", []byte(jwtSecret), nil)
}

// Encode generates a JWT token based on the provided payload.
func Encode(payload map[string]interface{}) (string, error) {
	_, accessToken, err := TokenAuth.Encode(payload)
	if err != nil {
		return "", err
	}
	return accessToken, nil
}
