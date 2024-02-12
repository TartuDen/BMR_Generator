package operation

import "time"

type Operation struct {
	Number int
	Equipment Equipment
	TypicalActivity TypicalActivity
	MaterialIN []Material
	MaterialOUT []Material
	Wastes []Waste
}

type Description struct{
	Content string
	DurationMIN time.Duration
	DurationMAX time.Duration
	TemperatureMIN int
	TemperatureMAX int
	AdditionalEquipment []Equipment
}

type Equipment struct{
	Name string
	Type int
	Code int
}

type TypicalActivity struct {
	OperationType string
	Description Description
}

type Material struct{
	Name string
	WHcode string
	Mass int
	Volume int
	Range int
	AdditionalInfo string
}

type Waste struct{
	Type string
	Mass int
	Volume int
	AdditionalInfo string
}
