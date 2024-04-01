package models

import "time"

type User struct {
	ID           int
	UserName     string
	Password     string
	FirstName    string
	LastName     string
	Email        string
	Created      time.Time
	Picture      string
	LastActivity time.Time
	Type         string
}
