package app

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/alexliesenfeld/health"
	"github.com/go-chi/render"
	"github.com/riipandi/pingplop/meta"
	// "github.com/riipandi/pingplop/pkg/db"
)

func healthCheckHandler() http.HandlerFunc {

	// Create a new Checker.
	checker := health.NewChecker(

		// Set the time-to-live for our cache to 1 second (default).
		health.WithCacheDuration(1*time.Second),

		// Configure a global timeout that will be applied to all checks.
		health.WithTimeout(10*time.Second),

		// A check configuration to see if our database connection is up.
		// The check function will be executed for each HTTP request.
		// health.WithCheck(health.Check{
		// 	Name:    "database",      // A unique check name.
		// 	Timeout: 2 * time.Second, // A check specific timeout.
		// 	Check:   db.Conn.PingContext,
		// }),

		// The following check will be executed periodically every 15 seconds
		// started with an initial delay of 3 seconds. The check function will NOT
		// be executed for each HTTP request.
		// health.WithPeriodicCheck(15*time.Second, 3*time.Second, health.Check{
		// 	Name: "search",
		// 	// The check function checks the health of a component. If an error is
		// 	// returned, the component is considered unavailable (or "down").
		// 	// The context contains a deadline according to the configured timeouts.
		// 	Check: func(ctx context.Context) error {
		// 		return fmt.Errorf("this makes the check fail")
		// 	},
		// }),

		// Set a status listener that will be invoked when the health status changes.
		// More powerful hooks are also available (see docs).
		health.WithStatusListener(func(ctx context.Context, state health.CheckerState) {
			log.Printf("health status changed to %s", state.Status)
		}),
	)

	// Create a new health check http.Handler that returns the health status
	// serialized as a JSON string. You can pass pass further configuration
	// options to NewHandler to modify default configuration.
	return health.NewHandler(checker)
}

type sysInfoResponse struct {
	Version   string `json:"version"`
	Platform  string `json:"platform"`
	BuildDate string `json:"build_date"`
}

func sysInfoHandler(enable bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !enable {
			w.Write([]byte("Nothing to see"))
			return
		}

		render.JSON(w, r, sysInfoResponse{
			Version:   meta.Version,
			Platform:  meta.Platform,
			BuildDate: meta.BuildDate,
		})
	}
}
