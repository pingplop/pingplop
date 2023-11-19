package handler

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/render"

	"github.com/pingplop/pingplop/internal/model"
	"github.com/pingplop/pingplop/pkg/dbx"
	"github.com/pingplop/pingplop/pkg/utils"
)

func newUser(email, firstName, lastName, preferredUsername string) model.User {
	return model.User{
		Email:             email,
		FirstName:         firstName,
		LastName:          lastName,
		PreferredUsername: preferredUsername,
	}
}

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	// set response as application/json
	w.Header().Set("Content-type", "application/json")

	// initialize the DbMap
	dbmap := dbx.DbMapper(dbx.Conn)

	// delete any existing rows
	err := dbmap.TruncateTables()
	utils.CheckErr(err, "truncate tables failed")

	// create two posts
	p1 := newUser("johndoe@example.com", "John", "Doe", "johndoe")

	// insert rows - auto increment PKs will be set properly after the insert
	err = dbmap.Insert(&p1)
	if err != nil {
		errMsg := "insert query failed"
		log.Println(errMsg, err)

		// Render the data as JSON and write it to the response
		w.WriteHeader(http.StatusBadRequest)
		render.JSON(w, r, map[string]interface{}{
			"code":    http.StatusBadRequest,
			"message": errMsg,
			"reasons": err.Error(),
		})

		return
	}

	// Create a map representing the data
	w.WriteHeader(http.StatusOK)
	result := map[string]interface{}{
		"code":    http.StatusOK,
		"message": "All is well",
	}

	// Render the data as JSON and write it to the response
	render.JSON(w, r, result)
}

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	// initialize the DbMap
	dbmap := dbx.DbMapper(dbx.Conn)

	// fetch all rows
	var users []model.User
	_, err := dbmap.Select(&users, "select * from users order by created_at")
	utils.CheckErr(err, "sql select error")

	// experimental: convert unixtime into date string in UTC
	createdAtTime := time.Unix(1700355978, 0).UTC()
	log.Printf("Parsed time: %s", createdAtTime)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Create a map representing the data
	result := map[string]interface{}{
		"data": users,
	}

	// Render the data as JSON and write it to the response
	render.JSON(w, r, result)
}
