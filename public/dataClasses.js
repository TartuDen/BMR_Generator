
export class LocalMemory {
    constructor(project, TP, equipment, reagents) {
        this.project = project;
        this.TP = TP;
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
