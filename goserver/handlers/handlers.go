package handlers

import (
	"github.com/TartuDen/BMR_Generator/tree/main/goserver/repository/dbrepo"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/config"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/driver"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/repository"
)

// Repo is the repository used by the handlers
var Repo *Repository

// Repository is the repository type
type Repository struct {
	App *config.AppConfig
	DB  repository.DatabaseInterface
}

// NewRepo creates a new repository
func NewRepo(a *config.AppConfig, db *driver.DB) *Repository {
	return &Repository{
		App: a,
		DB:  dbrepo.NewPostgresRepo(db.SQL, a),
	}
}

// NewRepo creates a new repository
func NewTestRepo(a *config.AppConfig) *Repository {
	return &Repository{
		App: a,
		DB:  dbrepo.NewTestRepo(a),
	}
}

// NewHandlers sets the repository for the handlers
func NewHandlers(r *Repository) {
	Repo = r
}
