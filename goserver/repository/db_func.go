package repository

import (
	"database/sql"
	"fmt"
)

// MakeDBTables creates necessary database tables using the provided *sql.DB instance.
// This function helps initialize database tables, and it's intended to be called with a fresh
// database connection to ensure proper handling for multiple users.
func MakeDBTables(db *sql.DB) error {

	fmt.Println("Tables Creation")

	sqlQuerys := getQuerys()

	for _, sqlQuery := range sqlQuerys {
		statement, errPrepare := db.Prepare(sqlQuery)
		if errPrepare != nil {
			fmt.Println("errPrepare:", errPrepare)
			continue
		}

		_, err := statement.Exec()
		statement.Close()

		if err != nil {
			return fmt.Errorf("error executing query %s: %v", sqlQuery, err)
		}
	}

	return nil
}
