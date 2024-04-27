export class Operation {
  constructor(
      project,
      tp,
      opNumber,
      mainEquipmentType,
      typicalActivity,
      materialIn,
      materialOut,
      wastes
  ) {
      this.project = project !== undefined ? project : "";
      this.tp = tp !== undefined ? tp : "";
      this.opNumber = opNumber !== undefined ? opNumber : 0;
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
  constructor(activityType, content, other, durationMin, durationMax, targetTempMin, targetTempMax,
      initialTempSet, finalTempSet, processTemp, rpmMin, rpmMax, flowMin, flowMax, ppumpSetMin, ppumpSetMax,
      vpumpTorrProcess, vpumpTorrMin, vpumpTorrMax, additionalEquipment) {
      this.activityType = activityType !== undefined ? activityType : "";
      this.content = content !== undefined ? content : "";
      this.other = other !== undefined ? other : "";
      this.durationMin = durationMin !== undefined ? durationMin : -1;
      this.durationMax = durationMax !== undefined ? durationMax : -1;
      this.targetTempMin = targetTempMin !== undefined ? targetTempMin : -1;
      this.targetTempMax = targetTempMax !== undefined ? targetTempMax : -1;
      this.initialTempSet = initialTempSet !== undefined ? initialTempSet : -1;
      this.finalTempSet = finalTempSet !== undefined ? finalTempSet : -1;
      this.processTemp = processTemp !== undefined ? processTemp : -1;
      this.rpmMin = rpmMin !== undefined ? rpmMin : -1;
      this.rpmMax = rpmMax !== undefined ? rpmMax : -1;
      this.flowMin = flowMin !== undefined ? flowMin : -1;
      this.flowMax = flowMax !== undefined ? flowMax : -1;
      this.ppumpSetMin = ppumpSetMin !== undefined ? ppumpSetMin : -1;
      this.ppumpSetMax = ppumpSetMax !== undefined ? ppumpSetMax : -1;
      this.vpumpTorrProcess = vpumpTorrProcess !== undefined ? vpumpTorrProcess : -1;
      this.vpumpTorrMin = vpumpTorrMin !== undefined ? vpumpTorrMin : -1;
      this.vpumpTorrMax = vpumpTorrMax !== undefined ? vpumpTorrMax : -1;
      this.additionalEquipment = additionalEquipment !== undefined ? additionalEquipment : [];
  }
}



export class Equipment {
  constructor(name, code, label, size, material, utensils) {
    this.name = name !== undefined ? name : "";
    this.code = code !== undefined ? code : "";
    this.label = label !== undefined ? label : "";
    this.size = size !== undefined ? size : "";
    this.material = material !== undefined ? material : "";
    this.utensils = utensils !== undefined ? utensils : false;
  }
}

export class Material {
  constructor(name, WHcode, mass, volume, range, additionalInfo) {
    this.name = name !== undefined ? name : "";
    this.WHcode = WHcode !== undefined ? WHcode : "";
    this.mass = mass !== undefined ? mass : 0;
    this.volume = volume !== undefined ? volume : 0;
    this.range = range !== undefined ? range : 0;
    this.additionalInfo = additionalInfo !== undefined ? additionalInfo : "";
  }
}

export class Waste {
  constructor(type, code, mass, volume, additionalInfo) {
    this.type = type !== undefined ? type : "";
    this.code = code !== undefined ? code : "";
    this.mass = mass !== undefined ? mass : 0;
    this.volume = volume !== undefined ? volume : 0;
    this.additionalInfo = additionalInfo !== undefined ? additionalInfo : "";
  }
}



