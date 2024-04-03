package repository

var equipmentTable = `
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    description TEXT,
    label VARCHAR(255),
    size VARCHAR(255),
    material VARCHAR(255),
    utensils BOOLEAN NOT NULL
);`

var activityTable = `
CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    operationType VARCHAR(255),
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

var operationTemplateTable = `
CREATE TABLE IF NOT EXISTS operation (
    id SERIAL PRIMARY KEY,
    content TEXT,
    other TEXT
);
`

var operationTemplatEquipmentTable  = `
CREATE TABLE IF NOT EXISTS operation_equipment (
    id SERIAL PRIMARY KEY,
    operation_id INT REFERENCES operation(id) ON DELETE CASCADE,
    equipment_id INT REFERENCES equipment(id) ON DELETE CASCADE
);
`

var activityEquipmentTable = `
CREATE TABLE IF NOT EXISTS activity_equipment (
    id SERIAL PRIMARY KEY,
    activity_id INT REFERENCES activity(id) ON DELETE CASCADE,
    equipment_id INT REFERENCES equipment(id) ON DELETE CASCADE
);
`

func getQuerys() []string {
	var sqlQuerys []string
	sqlQuerys = append(sqlQuerys, equipmentTable)
    sqlQuerys = append(sqlQuerys, activityTable)
    sqlQuerys = append(sqlQuerys, activityEquipmentTable)
    sqlQuerys = append(sqlQuerys, operationTemplateTable)
    sqlQuerys = append(sqlQuerys, operationTemplatEquipmentTable)


	return sqlQuerys
}