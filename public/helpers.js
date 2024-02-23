/**
 * Delays execution by a specified duration.
 * @param {number} ms - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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