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
    static Equipment = {
        "reactor":["002-12","002-13","002-14","002-17"],
        // "oven": ["012-10","012-13"],
        // "pump Membrane": ["001-22","001-24"],
        // "pump Peristaltic": ["001-13","001-29"],
        // "pump Oil": ["001-14","001-28"],
        // "balance": ["007-20","007-24"],
        // "filter Nutsch": ["046-5"],
        // "filter Druck": ["046-6"],
    }
}

export default MyFunctions;
