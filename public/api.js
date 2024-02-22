// api.js

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