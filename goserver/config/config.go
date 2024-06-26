package config

import (
	"html/template"
	"log"

	"github.com/google/uuid"
)

// AppConfig holds the app config
type AppConfig struct {
	UseCache           bool
	TemplateCache      map[string]*template.Template
	InfoLog            *log.Logger
	InProduction       bool
	ErrorLog           *log.Logger
	SessionID          uuid.UUID // This field can hold a UUID value
	ServerEmail        string

	ModeratorPass string //added Moder pass to app config
}
