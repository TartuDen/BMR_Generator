/**
 * Replace {placeHolders} in description text to option select list or input element if
 * they correspond to TypicalActivity class properties.
 *
 * @param {[string]} activityContent - The description for operation.
 * @param {[string]} parametersForOperations - The array of parameters from the Server.
 * @returns {Promise<string>} A promise that resolves with the modified text.
 */
async function getInnerHTMLForTypicalActivity(
  activityContent,
  parametersForOperations
) {
  const operationParameters = extractTextInCurlyBraces(activityContent);
  let output = activityContent; // Initialize output with original activity content

  // Check if each operation parameter corresponds to TypicalActivity class properties
  const isValid = operationParameters.every((param) =>
    parametersForOperations.includes(param)
  );

  // If any parameter does not correspond to class properties, throw an error
  if (!isValid) {
    return Promise.reject(
      new Error(
        "One or more operation parameters do not correspond to TypicalActivity class properties."
      )
    );
  }

  // Replace parameters with input elements
  parametersForOperations.forEach((param) => {
    if (output.includes(`{${param}}`)) {
      let inputField;
      if (param.includes("Range")) {
        // For parameters containing "Range", replace with two input fields for min and max
        const paramName = param.replace("Range", ""); // Remove "Range" from parameter name
        inputField = `
          <input type="number" id="params_${paramName}_min" name="params_${paramName}_min" placeholder="Min ${paramName}" oninput="saveSelectedItem(this)">
          <input type="number" id="params_${paramName}_max" name="params_${paramName}_max" placeholder="Max ${paramName}" oninput="saveSelectedItem(this)">
        `;
      } else {
        // For other parameters, replace with a single input field
        inputField = `<input type="number" id="params_${param}" name="params_${param}" placeholder="${param}" oninput="saveSelectedItem(this)">`;
      }
      output = output.replace(`{${param}}`, inputField);
    }
  });

  return output; // Return the modified text
}

function extractTextInCurlyBraces(text) {
  const regex = /\{([^}]+)\}/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

/**
 * Function to save selected item from a select element into dataFromOperation object.
 * @param {HTMLElement} selectElement - The select element from which the value is selected.
 */
function saveSelectedItem(selectElement) {
  // Retrieve the selected value from the select element
  const id = selectElement.id;
  const value = selectElement.value;
  // Add new elements into dataFromOperation
  dataFromOperation[id] = value;
}

module.exports = { getInnerHTMLForTypicalActivity };