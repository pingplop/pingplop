package app

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"

	"github.com/pingplop/pingplop/internal/app/handler"
	"github.com/pingplop/pingplop/internal/middleware/jwtauth"
	"github.com/pingplop/pingplop/pkg/jwt"
)

// We can use subdomain mapping to split between API and web app:
// @ref: https://go-chi.io/#/pages/middleware?id=routeheaders
func httpHandler() http.Handler {
	r := chi.NewRouter()

	// Global middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.CleanPath)
	r.Use(middleware.URLFormat)
	r.Use(middleware.Logger) // <--<< Logger should come before Recoverer
	r.Use(middleware.Recoverer)

	// Serve SPA frontend app
	r.Group(func(r chi.Router) {
		// Compress is a middleware that compresses response body of a given
		// content types to a data format based on Accept-Encoding request
		// header. It uses a given compression level.
		r.Use(middleware.Compress(5, "text/html", "text/css", "text/javascript"))
		r.Get("/*", handler.SPAHandler("dist"))
	})

	// Group Routes for API
	r.Group(func(r chi.Router) {
		// Limit number of currently processed requests at a time across all users.
		r.Use(middleware.Throttle(30)) // 30 seconds

		// AllowContentType enforces a whitelist of request Content-Types
		// otherwise responds with a 415 Unsupported Media Type status.
		r.Use(middleware.AllowContentType("application/json", "text/xml"))

		// Enable httprate request limiter of 100 requests per minute.
		// Rate-limiting is bound to the request IP address via the LimitByIP
		// middleware handler.
		r.Use(httprate.LimitByIP(100, 1*time.Minute))

		r.Use(cors.Handler(cors.Options{
			AllowedOrigins: []string{"https://*", "http://*"},
			AllowedMethods: []string{"GET", "PUT", "POST", "DELETE", "HEAD", "OPTION"},
			AllowedHeaders: []string{
				"User-Agent", "Content-Type", "Accept", "Accept-Encoding", "Accept-Language", "Authorization",
				"Cache-Control", "Connection", "DNT", "Host", "Origin", "Pragma", "Referer", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: true,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		}))

		r.Route("/api", apiRoutes)
		r.NotFound(handler.NotFoundHandler)
		r.MethodNotAllowed(handler.MethodNotAllowedHandler)
	})

	return r
}

func apiRoutes(r chi.Router) {
	// Public API routes
	r.Group(func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Pingplop API v1"))
		})
		r.Get("/sysinfo", sysInfoHandler(true))
		r.Get("/health", healthCheckHandler())
		r.Route("/auth", authRoutes)
	})

	// Protected API routes
	r.Group(func(r chi.Router) {
		// Seek, verify and validate JWT tokens
		r.Use(jwtauth.Verifier(jwt.TokenAuth))

		// Handle valid / invalid tokens. In this example, we use the provided authenticator
		// middleware, but you can write your own very easily, look at the Authenticator
		// method in jwtauth.go and tweak it, its not scary.
		r.Use(jwtauth.Authenticator)

		// Register protected routes here
		// .........
	})
}

func authRoutes(r chi.Router) {
	r.Post("/token", handler.AuthTokenHandler)
	r.Post("/signup", handler.SignupHandler)
}
