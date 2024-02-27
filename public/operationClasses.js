class Operation {
  constructor(
    number,
    mainEquipmentType,
    typicalActivity,
    parameters,
    materialIn,
    materialOut,
    wastes
  ) {
    this.number = number !== undefined ? number : 0;
    this.mainEquipmentType =
      mainEquipmentType !== undefined ? mainEquipmentType : "";
    this.typicalActivity =
      typicalActivity !== undefined ? typicalActivity : null;
    this.parameters = parameters !== undefined ? parameters : [];
    this.materialIn = materialIn !== undefined ? materialIn : [];
    this.materialOut = materialOut !== undefined ? materialOut : [];
    this.wastes = wastes !== undefined ? wastes : [];
  }
}

class TypicalActivity {
  constructor(
    operationType,
    content,
    durationMIN,
    durationMAX,
    temperatureMIN,
    temperatureMAX,
    additionalEquipment
  ) {
    this.operationType = operationType !== undefined ? operationType : "";
    this.content = content !== undefined ? content : "";
    this.durationMIN = durationMIN !== undefined ? durationMIN : null; // or -1
    this.durationMAX = durationMAX !== undefined ? durationMAX : null; // or -1
    this.temperatureMIN = temperatureMIN !== undefined ? temperatureMIN : null;
    this.temperatureMAX = temperatureMAX !== undefined ? temperatureMAX : null;
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

class Parameter {
  constructor(name, value) {
    this.name = name;
    this.value = value;
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