package utils

import (
	"crypto/rand"

	"golang.org/x/crypto/bcrypt"
)

const saltSize = 16 // Adjust the size of the salt as needed

// HashPassword generates a bcrypt hash for the given password with a random salt.
func HashPassword(password string) (string, error) {
	// Generate a random salt
	salt := make([]byte, saltSize)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}

	// Hash the password with the combined salt
	hashedPassword, err := bcrypt.GenerateFromPassword(append([]byte(password), salt...), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

// VerifyPassword checks if the provided password matches the hashed password.
func VerifyPassword(hashedPassword, password string) (bool, error) {
	// Extract the salt from the hashed password
	salt := []byte(hashedPassword)[:saltSize]

	// Hash the provided password with the extracted salt
	newHashedPassword, err := bcrypt.GenerateFromPassword(append([]byte(password), salt...), bcrypt.DefaultCost)
	if err != nil {
		return false, err
	}

	// Compare the newly generated hash with the stored hash
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), newHashedPassword) == nil, nil
}
