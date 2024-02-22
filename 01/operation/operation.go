package operation

import "time"

type Operation struct {
	Number          int
	Equipment       Equipment
	TypicalActivity TypicalActivity
	MaterialIn      []Material
	MaterialOut     []Material
	Wastes          []Waste
}

type Description struct {
	Content             string
	DurationMIN         time.Duration
	DurationMAX         time.Duration
	TemperatureMIN      float64
	TemperatureMAX      float64
	AdditionalEquipment []Equipment
}

type Equipment struct {
	Name     string
	Code     string
	Label    string
	Size     string
	Material string
	Utensils bool
}

type TypicalActivity struct {
	OperationType string
	Description   Description
}

type Material struct {
	Name           string
	WHcode         string
	Mass           float64
	Volume         float64
	Range          int
	AdditionalInfo string
}

type Waste struct {
	Type           string
	Code           string
	Mass           int
	Volume         int
	AdditionalInfo string
}
