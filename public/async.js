const axios = require("axios");
const {
  databaseServerUrl,
  equipmentApiEndpoint,
  equipmentTypesApiEndpoint,
  activityApiEndpoint,
  parametersApiEndpoint,
} = require("./settings");

/**
 * Retrieves a list of parameters for operations from the server.
 *
 * @returns {Promise<Array>} A promise that resolves with the list of parameters for operations.
 * @throws {Error} If an error occurs during the retrieval process.
 */
async function GetParametersForOperations() {
  try {
    // Assuming `parametersApiEndpoint` is defined somewhere
    const url = `${databaseServerUrl}${parametersApiEndpoint}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching parameters for operations:", error);
    throw error;
  }
}

/**
 * Simulates retrieving a list of parameters for operations with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of parameters for operations.
 */
async function GetParametersForOperationsMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of parameters for operations
  const parameters = ["time", "temp", "rpm", "flow", "ppumpSet"];

  return parameters;
}

/**
 * Retrieves a list of equipment types from the server.
 *
 * @returns {Promise<Array>} A promise that resolves with the list of equipment types.
 * @throws {Error} If an error occurs during the retrieval process.
 */
async function GetListEquipmentTypes() {
  try {
    const url = `${databaseServerUrl}${equipmentTypesApiEndpoint}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment types:", error);
    throw error;
  }
}

/**
 * Simulates retrieving a list of equipment types with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment types.
 */
async function GetListEquipmentTypesMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  const equipmentTypes = [
    { name: "reactor" },
    { name: "oven" },
    { name: "balances" },
  ];

  return equipmentTypes;
}

/**
 * Retrieves a list of activities for a specific equipment type from the server.
 *
 * @param {string} equipmentType The type of equipment for which activities are to be retrieved.
 * @returns {Promise<Array>} A promise that resolves with the list of activities.
 * @throws {Error} If an error occurs during the retrieval process.
 */
async function GetListActivity(equipmentType) {
  try {
    // Assuming `activityApiEndpoint` is defined somewhere
    const url = `${databaseServerUrl}${activityApiEndpoint}?equipmentType=${equipmentType}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}

/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListReactorActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  var activities = [
    {
      OperationType: "loading_of_solid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Material is loaded into reactor {reactor} via 60 mm flange port using funnel {funnel}. The 60 mm flange port is closed.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "loading_of_liquid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic pump} and norprene hose {norprene hose}, {material} is pumped into reactor via liquid loading valve. Peristaltic pump is set to {ppumpSet}%. After loading is done, pump is stopped, hose is removed. The 60 mm flange port is closed. Hose is cleaned.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "dosing_of_liquid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic pump} and norprene hose {norprene hose}, {material} is pumped into dosing system. Peristaltic pump is set to {ppumpSet}%. After loading is done, pump is stopped, hose is removed. Dosing system is closed. Hose is cleaned.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "creating_argon_flow",
      Content:
        "Argon line is connected to the argon port of reactor. The flow is set to {flow}l/min. The valve is opened. After required time is passed, the argon flow is closed.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "stirring_on",
      Content: "Stirring in reactor is turned ON. Set to {rpm}rpm.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "stirring_off",
      Content: "Stirring in reactor is turned OFF.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
    {
      OperationType: "heating_on",
      Content: "Heating is turned ON. Temperature is set to {temp}°C.",
      DurationMIN: "",
      DurationMAX: "",
      TemperatureMIN: "",
      TemperatureMAX: "",
    },
  ];

  return activities;
}

/**
 * Retrieves a list of equipment of a specific type from the database server.
 * @param {string} equipmentType - The type of equipment to retrieve.
 * @returns {Promise<Array>} A promise that resolves with the list of equipment.
 * @throws {Error} If an error occurs during the retrieval process.
 */
async function GetEquipmentListByType(equipmentType) {
  try {
    const url = `${databaseServerUrl}${equipmentApiEndpoint}?type=${equipmentType}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment list:", error);
    throw error;
  }
}

/**
 * Simulates retrieving a list of equipment for a special equipment type with a delay.
 *
 * @param {string} equipmentType - The type of equipment to retrieve from the DataBase
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment for the specified type.
 */
async function GetEquipmentListByTypeMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment for different types
  const equipmentMap = {
    balances: [
      { name: "balances", code: "007-10" },
      { name: "balances", code: "007-11" },
      { name: "balances", code: "007-12" },
    ],
    pump: [
      { name: "pump", code: "001-10" },
      { name: "pump", code: "001-11" },
      { name: "pump", code: "001-12" },
    ],
    reactor: [
      { name: "reactor", code: "002-10" },
      { name: "reactor", code: "002-11" },
      { name: "reactor", code: "002-12" },
      { name: "reactor", code: "002-13" },
    ],
    jug: [
      { name: "jug", code: "tile" },
      { name: "jug", code: "waste" },
    ],
    funnel: [
      { name: "funnel", code: "funnel-1" },
      { name: "funnel", code: "funnel-2" },
      { name: "funnel", code: "funnel-3" },
    ],
    // Add more equipment types as needed
  };

  // Return the simulated equipment list for the specified type
  return equipmentMap[equipmentType] || [];
}

/**
 * Retrieves a list of all equipment from the database server.
 * @returns {Promise<Array>} A promise that resolves with the list of all equipment.
 * @throws {Error} If an error occurs during the retrieval process.
 */
async function GetEquipmentList() {
  try {
    const url = `${databaseServerUrl}${equipmentApiEndpoint}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment list:", error);
    throw error;
  }
}

/**
 * Simulates retrieving a list of all equipment with a delay.
 * @returns {Promise<Array>} A promise that resolves with the simulated list of all equipment.
 */
async function GetEquipmentListMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of all equipment
  const equipmentList = [
    { name: "balances", code: "007-10" },
    { name: "balances", code: "007-11" },
    { name: "balances", code: "007-12" },
    { name: "pump", code: "001-10" },
    { name: "pump", code: "001-11" },
    { name: "pump", code: "001-12" },
    { name: "reactor", code: "002-10" },
    { name: "reactor", code: "002-11" },
    { name: "reactor", code: "002-12" },
    { name: "reactor", code: "002-13" },
    { name: "jug", code: "tile" },
    { name: "jug", code: "waste" },
    { name: "funnel", code: "funnel-1" },
    { name: "funnel", code: "funnel-2" },
    { name: "funnel", code: "funnel-3" },
    // Add more equipment as needed
  ];

  return equipmentList;
}

/**
 * Replace {placeHolders} in description text to option select list or input element.
 *
 * @param {string} text - The description for operation.
 * @returns {Promise<string>} A promise that resolves with the modified text.
 */
async function replaceTextWithSelect(text) {
  const regex = /\{([^}]+)\}/g;
  let output = text;

  // Extract equipment types from text
  const equipmentTypes = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    equipmentTypes.push(match[1]);
  }

  try {
    // Fetch parameters for operations
    const parametersForOperations = await GetParametersForOperationsMOCK();

    // Fetch equipment list
    const equipmentList = await GetEquipmentListMOCK();

    // Replace {placeHolders} with select lists or input elements
    equipmentTypes.forEach((equipmentType) => {
      if (equipmentList.some((equipment) => equipment.name === equipmentType)) {
        // Equipment type found in the equipment list, replace with select list
        const defaultOption = `<option value="">-${equipmentType}-</option>`;
        const selectOptions = equipmentList
          .filter((equipment) => equipment.name === equipmentType)
          .map(
            (equipment) =>
              `<option value="${equipment.code}">${equipment.code}</option>`
          )
          .join("");
        const selectList = `<select id="equipment_${equipmentType}" onchange="saveSelectedItem(this)" name="${equipmentType}">${defaultOption}${selectOptions}</select>`;
        output = output.replace(`{${equipmentType}}`, selectList);
      } else if (parametersForOperations.includes(equipmentType)) {
        // Equipment type not found, check if it's a parameter, replace with input element
        const inputElement = `<input type="text" oninput="saveSelectedItem(this)" id="parameter_${equipmentType}" name="${equipmentType}" placeholder="${equipmentType}">`;
        output = output.replace(`{${equipmentType}}`, inputElement);
      } else {
        // Unknown equipment type or parameter, do nothing
      }
    });

    // Return the modified text
    return output;
  } catch (error) {
    console.error("Error replacing text with select:", error);
    throw error;
  }
}

/**
 * Delays execution by a specified duration.
 * @param {number} ms - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { GetEquipmentListByType, GetEquipmentListByTypeMOCK };
