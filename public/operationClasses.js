class Operation {
  constructor(
    project, 
    TP,
    number,
    mainEquipmentType,
    typicalActivity,
    materialIn,
    materialOut,
    wastes
  ) {
    this.project = project !== undefined ? project : "";
    this.TP = TP !== undefined ? TP : "";
    this.number = number !== undefined ? number : 0;
    this.mainEquipmentType =
      mainEquipmentType !== undefined ? mainEquipmentType : "";
    this.typicalActivity =
      typicalActivity !== undefined ? typicalActivity : null;
    this.materialIn = materialIn !== undefined ? materialIn : [];
    this.materialOut = materialOut !== undefined ? materialOut : [];
    this.wastes = wastes !== undefined ? wastes : [];
  }
}

export class TypicalActivity {
  constructor(
    operationType, // type of operation related to specific equipment, e.g. equipment - reactor; operation type - "material_add_dropwise".
    content, // A String that describes opeartion, containing placeholders withing {} for inserting select elements or inputs.
    other, // A String - second field of the table, containing placeholder for operators to record acutal data, e.g. "Actual loadin: ... kg".
    durationRange, // An array representing the min and max allowed duration, e.g. [10, 20] min.
    targetTempRange, // An array representing the min and max allowed temperature, e.g. [10, 20] °C.
    initialTempSet, // The initial temperature setting of the thermostat as a single integer value in °C.
    finalTempSet, // The final temperature setting of the thermostat as a single integer value in °C.
    processTemp, // The process temperature as a single integer value in °C.
    rpmRange, // An array representing the min and max allowed stirring speed of spinnable equipment e.g. [150, 200] rpm.
    flowRange, // An array representing the min and max allowed gas flow speed, e.g. argon, e.g. [15, 20] l/min.
    ppumpSetRange, // An array representing the min and max allowed rotation speed of peristaltic pump e.g. [60, 80] %.
    vpumpTorrProcess, // The acutal vacuum in process as a single integer value in Torr.
    vpumpTorrRange, // An array representing the min and max allowed vacuum pump setting, e.g. [300, 150] Torr.
    additionalEquipment // An array of objects of Equpment Class that is mentioned in content section.
  ) {
    this.operationType = operationType !== undefined ? operationType : "";
    this.content = content !== undefined ? content : "";
    this.other = other !== undefined ? other : "";
    this.durationRange = durationRange !== undefined ? durationRange : []; // or -1
    this.targetTempRange = targetTempRange !== undefined ? targetTempRange : [];
    this.initialTempSet = initialTempSet !== undefined ? initialTempSet : null;
    this.finalTempSet = finalTempSet !== undefined ? finalTempSet : null;
    this.processTemp = processTemp !== undefined ? processTemp : null;
    this.rpmRange = rpmRange !== undefined ? rpmRange : [];
    this.flowRange = flowRange !== undefined ? flowRange : [];
    this.ppumpSetRange = ppumpSetRange !== undefined ? ppumpSetRange : [];
    this.vpumpTorrProcess = vpumpTorrProcess !== undefined ? vpumpTorrProcess : null;
    this.vpumpTorrRange = vpumpTorrRange !== undefined ? vpumpTorrRange : [];
    this.additionalEquipment =
      additionalEquipment !== undefined ? additionalEquipment : [];
  }
}

class Equipment {
  constructor(name, code, label, size, material, utensils) {
    this.name = name !== undefined ? name : "";
    this.code = code !== undefined ? code : "";
    this.label = label !== undefined ? label : "";
    this.size = size !== undefined ? size : "";
    this.material = material !== undefined ? material : "";
    this.utensils = utensils !== undefined ? utensils : false;
  }
}

class Material {
  constructor(name, WHcode, mass, volume, range, additionalInfo) {
    this.name = name !== undefined ? name : "";
    this.WHcode = WHcode !== undefined ? WHcode : "";
    this.mass = mass !== undefined ? mass : 0;
    this.volume = volume !== undefined ? volume : 0;
    this.range = range !== undefined ? range : 0;
    this.additionalInfo = additionalInfo !== undefined ? additionalInfo : "";
  }
}

class Waste {
  constructor(type, code, mass, volume, additionalInfo) {
    this.type = type !== undefined ? type : "";
    this.code = code !== undefined ? code : "";
    this.mass = mass !== undefined ? mass : 0;
    this.volume = volume !== undefined ? volume : 0;
    this.additionalInfo = additionalInfo !== undefined ? additionalInfo : "";
  }
}