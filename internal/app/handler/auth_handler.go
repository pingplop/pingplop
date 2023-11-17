package handler

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/go-chi/render"
	"github.com/pingplop/pingplop/pkg/utils"

	repo "github.com/pingplop/pingplop/internal/repository"
)

func AuthTokenHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Create a map representing the data
	result := map[string]interface{}{
		"access_token":  "string",
		"refresh_token": "string",
		"token_type":    "Bearer",
		"expires_at":    0,
		"user": map[string]interface{}{
			"id":                 "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			"role":               "string",
			"email":              "string",
			"email_confirmed_at": "2023-11-12T18:24:45.401Z",
			"last_sign_in_at":    "2023-11-12T18:24:45.401Z",
			"user_metadata":      map[string]interface{}{},
			"banned_until":       "2023-11-12T18:24:45.401Z",
			"created_at":         "2023-11-12T18:24:45.401Z",
			"updated_at":         "2023-11-12T18:24:45.401Z",
		},
	}

	// Render the data as JSON and write it to the response
	render.JSON(w, r, result)
}

type SignupRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	var rb SignupRequest

	// FIXME request validation doesn't work
	err := utils.DecodeJSONBody(w, r, &rb)
	if err != nil {
		var mr *utils.MalformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.Msg, mr.Status)
		} else {
			render.Render(w, r, ServerErrorRenderer(err))
		}
		return
	}

	avatarUrl := "https://avatars.githubusercontent.com/u/921834?v=4"
	// Option 1: Without checking for duplicates
	generatedUsername, err := utils.GenerateUsername(rb.Email, nil)
	if err != nil {
		log.Fatal(err)
	}

	// // Option 2: Checking for duplicates (provide an existingUsernames map)
	// existingUsernames := map[string]bool{"existinguser": true, "john_doe": true}
	// generatedUsername, err := utils.GenerateUsername(rb.Email, existingUsernames)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	rs := repo.UserRepository(context.Background())

	user, err := rs.CreateUser(rb.Email, rb.FirstName, rb.LastName, generatedUsername, rb.Password, avatarUrl)
	if err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}

	// Hash the password before storing it
	hashedPassword, err := utils.HashPassword(rb.Password)
	if err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}

	// Set password for new user
	_, err = rs.CreatePassword(user.ID, hashedPassword)
	if err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}

	// Render the data as JSON and write it to the response
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	render.JSON(w, r, map[string]interface{}{
		"status_code": http.StatusOK,
		"message":     "User has been created",
		"user":        user,
	})
}
