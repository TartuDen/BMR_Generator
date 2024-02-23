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