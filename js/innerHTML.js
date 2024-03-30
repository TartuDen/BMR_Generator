import { TypicalActivity } from "./public/operationClasses.js";

/**
 * Replace {placeHolders} in description text to option select list or input element if
 * they corresponds TypicalActivity Class
 *
 * @param {string} activityContent - The description for operation.
 * @param {[string]} parametersForOperations - The array of parameters from the Server.
 * @returns {Promise<string>} A promise that resolves with the modified text.
 */
async function GetInnerHTMLforTypicalActivity(
  activityContent,
  parametersForOperations
) {
  const operationParameters = extractTextInCurlyBraces(activityContent);

  // Check if each operation parameter corresponds to TypicalActivity class properties
  const isValid = operationParameters.every((param) =>
    TypicalActivity.prototype.hasOwnProperty(param)
  );

  // If any parameter does not correspond to class properties, throw an error
  if (!isValid) {
    return Promise.reject(
      new Error(
        "One or more operation parameters do not correspond to TypicalActivity class properties."
      )
    );
  }
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
