package main

import (
	"encoding/gob"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/models"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/config"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/driver"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/repository"

	"github.com/TartuDen/BMR_Generator/tree/main/goserver/handlers"
)

const Port = ":8081"

var app config.AppConfig
var infolog *log.Logger
var errorlog *log.Logger

func main() {
	db, err := run()
	if err != nil {
		app.ErrorLog.Fatal(err)
	}

	defer db.SQL.Close()

	srv := &http.Server{
		Addr:    Port,
		Handler: routes(&app),
	}

	// helper.SendEmail(app.ServerEmail, "The FFForum Server started at")
	err = srv.ListenAndServe()
	log.Fatal(err)
}

func run() (*driver.DB, error) {
	fmt.Println("Starting application")

	dbHost := flag.String("dbhost", "localhost", "Database HOST")
	dbName := flag.String("dbname", "postgres", "Database Name")
	dbUser := flag.String("dbuser", "thoryur", "Database user name")
	dbPass := flag.String("dbpassword", "plot123123", "Database password")
	dbPort := flag.String("dbport", "5432", "Database PORT")
	dbSSL := flag.String("dbssl", "disable", "Database SSL (disable, prefer, require)")

	// gob.Register() function is used to inform the encoding/gob package about custom types that may be encoded or decoded using the gob encoding format.
	gob.Register(models.User{})

	// change this to true when in production
	app.InProduction = false

	// set email adress for loggin
	app.ServerEmail = "NO@gmail.com"

	// info log
	infolog = log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	app.InfoLog = infolog

	// error log
	errorlog = log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	app.ErrorLog = errorlog

	// connect to database
	log.Println("Connecting to database...")
	connectionString := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s", *dbHost, *dbPort, *dbName, *dbUser, *dbPass, *dbSSL)
	db, err := driver.ConnectSQL(connectionString)
	if err != nil {
		log.Fatal("cannot connect to database! Dying...")
	}

	err = repository.MakeDBTables(db.SQL)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	repo := handlers.NewRepo(&app, db)
	handlers.NewHandlers(repo)

	return db, nil
}
