package main

import (
	"net/http"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/config"
	"github.com/go-chi/chi"
)

func routes(app *config.AppConfig) http.Handler {

	mux := chi.NewRouter()

	return mux
}
