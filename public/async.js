const axios = require('axios');
const { databaseServerUrl, equipmentApiEndpoint } = require('./settings');

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
        { name: "balances" }
    ];

    return equipmentTypes;
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
 * Simulates retrieving a list of equipment of a specific type with a delay.
 * @param {string} equipmentType - The type of equipment to simulate retrieving.
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment.
 */
function GetEquipmentListByTypeMOCK(equipmentType) {
    return new Promise(async (resolve) => {
        await delay(500); // Simulating a delay of 500ms

        let equipmentList = [];

        // Simulating interaction with a database server based on the equipmentType
        switch (equipmentType) {
            case "balances":
                equipmentList = [
                    { name: "balances", code: "007-10" },
                    { name: "balances", code: "007-11" },
                    { name: "balances", code: "007-12" },
                ];
                break;
            case "pump":
                equipmentList = [
                    { name: "pump", code: "001-10" },
                    { name: "pump", code: "001-11" },
                    { name: "pump", code: "001-12" },
                ];
                break;
            case "reactor":
                equipmentList = [
                    { name: "reactor", code: "002-10" },
                    { name: "reactor", code: "002-11" },
                    { name: "reactor", code: "002-12" },
                    { name: "reactor", code: "002-13" },
                ];
                break;
            case "jug":
                equipmentList = [
                    { name: "jug", code: "tile" },
                    { name: "jug", code: "waste" },
                ];
                break;
            case "funnel": // Adding support for "funnel"
                equipmentList = [
                    { name: "funnel", code: "funnel-1" },
                    { name: "funnel", code: "funnel-2" },
                    { name: "funnel", code: "funnel-3" },
                ];
                break;
            default:
                // Handle unknown equipmentType or other cases
                break;
        }

        resolve(equipmentList);
    });
}

/**
 * Delays execution by a specified duration.
 * @param {number} ms - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { GetEquipmentListByType, GetEquipmentListByTypeMOCK };
