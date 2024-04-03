package repository

var equipmentTable = `
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    label VARCHAR(255),
    size VARCHAR(255),
    material VARCHAR(255),
    utensils BOOLEAN NOT NULL
);`

var typicalActivityTable = `
CREATE TABLE typicalActivity (
    id SERIAL PRIMARY KEY,
    operationType VARCHAR(255),
    content TEXT,
    other TEXT,
    durationRange INT[],
    targetTempRange INT[],
    initialTempSet INT,
    finalTempSet INT,
    processTemp INT,
    rpmRange INT[],
    flowRange INT[],
    ppumpSetRange INT[],
    vpumpTorrProcess INT,
    vpumpTorrRange INT[]
);
`
var typicalActivityEquipmentTable = `
CREATE TABLE IF NOT EXISTS typicalActivity_equipment (
    id SERIAL PRIMARY KEY,
    activity_id INT REFERENCES typicalActivity(id) ON DELETE CASCADE,
    equipment_id INT REFERENCES equipment(id) ON DELETE CASCADE
);
`

func getQuerys() []string {
	var sqlQuerys []string
	sqlQuerys = append(sqlQuerys, equipmentTable)
    sqlQuerys = append(sqlQuerys, typicalActivityTable)
    sqlQuerys = append(sqlQuerys, typicalActivityEquipmentTable)


	return sqlQuerys
}