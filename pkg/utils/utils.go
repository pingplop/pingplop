package utils

import (
	"errors"
	"regexp"
	"strconv"
	"strings"
)

// GenerateUsername generates a username from an email address.
// It sanitizes characters, uses an underscore as a separator, and checks for duplicates if existingUsernames is provided.
func GenerateUsername(email string, existingUsernames map[string]bool) (string, error) {
	// Convert email to lowercase
	email = strings.ToLower(email)

	// Extract the email prefix before the @ symbol
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return "", errors.New("invalid email format")
	}

	username := parts[0]

	// Sanitize the username by replacing invalid characters with underscores
	username = sanitizeUsername(username)

	// Make the username lowercase
	username = strings.ToLower(username)

	// Check for duplicate usernames if existingUsernames is provided
	if existingUsernames != nil {
		newUsername := username
		i := 1
		for existingUsernames[newUsername] {
			newUsername = username + "_" + strconv.Itoa(i)
			i++
		}
		return newUsername, nil
	}

	return username, nil
}

// sanitizeUsername replaces invalid characters in a username with underscores.
func sanitizeUsername(username string) string {
	// Replace invalid characters with underscores
	username = regexp.MustCompile(`[^a-zA-Z0-9_]`).ReplaceAllString(username, "_")

	// Remove consecutive underscores
	username = regexp.MustCompile(`_+`).ReplaceAllString(username, "_")

	// Trim underscores from the beginning and end
	username = strings.Trim(username, "_")

	return username
}
