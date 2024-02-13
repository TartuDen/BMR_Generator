// funcs.js

class MyFunctions {
    static Equipment(name, code) {
        return {
            Name: name,
            Code: code
        };
    }

    static Description(content, durationMIN, durationMAX, temperatureMIN, temperatureMAX, additionalEquipment) {
        return {
            Content: content,
            DurationMIN: durationMIN,
            DurationMAX: durationMAX,
            TemperatureMIN: temperatureMIN,
            TemperatureMAX: temperatureMAX,
            AdditionalEquipment: additionalEquipment || []
        };
    }

    static TypicalActivity(operationType, description) {
        return {
            OperationType: operationType,
            Description: description
        };
    }

    static Material(name, WHcode, mass, volume, range, additionalInfo) {
        return {
            Name: name,
            WHcode: WHcode,
            Mass: mass,
            Volume: volume,
            Range: range,
            AdditionalInfo: additionalInfo
        };
    }

    static Waste(type, mass, volume, additionalInfo) {
        return {
            Type: type,
            Mass: mass,
            Volume: volume,
            AdditionalInfo: additionalInfo
        };
    }

    static Operation(number, equipment, typicalActivity, materialIN, materialOUT, wastes) {
        return {
            Number: number,
            Equipment: equipment,
            TypicalActivity: typicalActivity,
            MaterialIN: materialIN || [],
            MaterialOUT: materialOUT || [],
            Wastes: wastes || []
        };
    }
}

export default MyFunctions;
