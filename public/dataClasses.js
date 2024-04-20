
export class LocalMemory {
    constructor(project, TP, equipment, reagents) {
        this.project = project;
        this.TP = TP;
        this.equipment = equipment;
        this.reagents = reagents;
    }
}

export class ActivityObject {
    constructor(Equipment, OperationType, Content, Other){
        this.Equipment = Equipment;
        this.OperationType = OperationType;
        this.Content = Content;
        this.Other = Other;
    }
}