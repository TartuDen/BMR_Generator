
export class LocalMemory {
    constructor(project="", tp="", equipment=[], reagents=[]) {
        this.project = project;
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

