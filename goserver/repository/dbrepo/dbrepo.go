package dbrepo

import (
	"database/sql"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/config"
	"github.com/TartuDen/BMR_Generator/tree/main/goserver/repository"

)

type postgresDBRepo struct {
	App *config.AppConfig
	DB  *sql.DB
}

type testDBRepo struct {
	App *config.AppConfig
	DB  *sql.DB
}

func NewPostgresRepo(conn *sql.DB, a *config.AppConfig) repository.DatabaseInterface {
	return &postgresDBRepo{
		App: a,
		DB:  conn,
	}
}

func NewTestRepo(a *config.AppConfig) repository.DatabaseInterface {
	return &testDBRepo{
		App: a,
	}
}
