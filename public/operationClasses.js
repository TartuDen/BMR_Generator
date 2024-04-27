export class Operation {
  constructor(
    project = "",
    tp = "",
    opNumber = 0,
    mainEquipmentType = "",
    typicalActivity = null,
    materialIn = [],
    materialOut = [],
    wastes = []
  ) {
    this.project = project;
    this.tp = tp;
    this.opNumber = opNumber;
    this.mainEquipmentType = mainEquipmentType;
    this.typicalActivity = typicalActivity;
    this.materialIn = materialIn;
    this.materialOut = materialOut;
    this.wastes = wastes;
  }
}

export class TypicalActivity {
  constructor(
    activityType = "",
    content = "",
    other = "",
    durationMin = -1,
    durationMax = -1,
    targetTempMin = -1,
    targetTempMax = -1,
    initialTempSet = -1,
    finalTempSet = -1,
    processTemp = -1,
    rpmMin = -1,
    rpmMax = -1,
    flowMin = -1,
    flowMax = -1,
    ppumpSetMin = -1,
    ppumpSetMax = -1,
    vpumpTorrProcess = -1,
    vpumpTorrMin = -1,
    vpumpTorrMax = -1,
    additionalEquipment = []
  ) {
    this.activityType = activityType;
    this.content = content;
    this.other = other;
    this.durationMin = durationMin;
    this.durationMax = durationMax;
    this.targetTempMin = targetTempMin;
    this.targetTempMax = targetTempMax;
    this.initialTempSet = initialTempSet;
    this.finalTempSet = finalTempSet;
    this.processTemp = processTemp;
    this.rpmMin = rpmMin;
    this.rpmMax = rpmMax;
    this.flowMin = flowMin;
    this.flowMax = flowMax;
    this.ppumpSetMin = ppumpSetMin;
    this.ppumpSetMax = ppumpSetMax;
    this.vpumpTorrProcess = vpumpTorrProcess;
    this.vpumpTorrMin = vpumpTorrMin;
    this.vpumpTorrMax = vpumpTorrMax;
    this.additionalEquipment = additionalEquipment;
  }
}


export class Equipment {
  constructor(
    name = "",
    code = "",
    label = "",
    size = "",
    material = "",
    utensils = false
  ) {
    this.name = name;
    this.code = code;
    this.label = label;
    this.size = size;
    this.material = material;
    this.utensils = utensils;
  }
}

export class Material {
  constructor(
    name = "",
    WHcode = "",
    mass = 0,
    volume = 0,
    range = 0,
    additionalInfo = ""
  ) {
    this.name = name;
    this.WHcode = WHcode;
    this.mass = mass;
    this.volume = volume;
    this.range = range;
    this.additionalInfo = additionalInfo;
  }
}

export class Waste {
  constructor(
    type = "",
    code = "",
    mass = 0,
    volume = 0,
    additionalInfo = ""
  ) {
    this.type = type;
    this.code = code;
    this.mass = mass;
    this.volume = volume;
    this.additionalInfo = additionalInfo;
  }
}




