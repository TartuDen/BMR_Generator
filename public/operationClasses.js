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

class TypicalActivity {
  constructor(
    operationType,
    content,
    other,
    time,
    temp,
    rpm,
    flow,
    ppumpSet,
    torr,
    additionalEquipment
  ) {
    this.operationType = operationType !== undefined ? operationType : "";
    this.content = content !== undefined ? content : "";
    this.other = other !== undefined ? other: "";
    this.time = time !== undefined ? time : null; // or -1
    this.temp = temp !== undefined ? temp : null;
    this.rpm = rpm !== undefined ? rpm : null;
    this.flow = flow !== undefined ? flow : null;
    this.ppumpSet = ppumpSet !== undefined ? ppumpSet : null;
    this.torr = torr !== undefined ? torr : null;
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