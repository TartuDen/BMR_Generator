function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function GetEquipmentListByType(equipmentType) {
    await delay(500); // Simulating a delay of 500ms

    let equipmentList = [];

    // Simulating interaction with a database server based on the equipmentType
    switch (equipmentType) {
        case "balances":
            equipmentList = [
                { name: "balances", code: "007-10" },
                { name: "balances", code: "007-11" },
                { name: "balances", code: "007-12" },
            ];
            break;
        case "pump":
            equipmentList = [
                { name: "pump", code: "001-10" },
                { name: "pump", code: "001-11" },
                { name: "pump", code: "001-12" },
            ];
            break;
        case "reactor":
            equipmentList = [
                { name: "reactor", code: "002-10" },
                { name: "reactor", code: "002-11" },
                { name: "reactor", code: "002-12" },
                { name: "reactor", code: "002-13" },
            ];
            break;
        case "jug":
            equipmentList = [
                { name: "jug", code: "tile" },
                { name: "jug", code: "waste" },
            ];
            break;
        case "funnel": // Adding support for "funnel"
            equipmentList = [
                { name: "funnel", code: "funnel-1" },
                { name: "funnel", code: "funnel-2" },
                { name: "funnel", code: "funnel-3" },
            ];
            break;
        default:
            // Handle unknown equipmentType or other cases
            break;
    }

    return equipmentList;
}
