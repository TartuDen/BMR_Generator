package repository

var equipmentTable = `CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    label VARCHAR(255),
    size VARCHAR(255),
    material VARCHAR(255),
    utensils BOOLEAN NOT NULL
);`

func getQuerys() []string {
	var sqlQuerys []string
	sqlQuerys = append(sqlQuerys, equipmentTable)


	return sqlQuerys
}