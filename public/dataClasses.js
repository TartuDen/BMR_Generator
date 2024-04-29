
export class LocalMemory {
    constructor(projectName="", tp="", equipment=[], reagents=[]) {
        this.projectName = projectName;
        this.tp = tp;
        this.equipment = equipment;
        this.reagents = reagents;
    }
}

// Define a Reagent class to represent each reagent
export class Reagent {
    constructor(reag_id, reag_name, reag_amount) {
        this.reag_id = reag_id;
        this.reag_name = reag_name;
        this.reag_amount = reag_amount;
    }
}



export class EquipmentNoOperation {
    constructor(name = "", equipmentInfo = [{}], operations = []) {
        this.name = name;
        this.equipmentInfo = equipmentInfo.map(info => new EquipmentInfo(info.code, info.description));
        this.operations = operations.map(op => new Operation(op.operationType, op.content, op.other));
    }
}

export class EquipmentInfo {
    constructor(code = "", description = "") {
        this.code = code;
        this.description = description;
    }
}

export class Operation {
    constructor(operationType = "", content = "", other = "") {
        this.operationType = operationType;
        this.content = content;
        this.other = other;
    }
}