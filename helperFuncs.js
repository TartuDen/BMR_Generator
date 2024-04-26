import { Reagent } from "./public/dataClasses.js";
import { LocalMemory } from "./public/dataClasses.js";


export function selectOps(operationsMap, localMemory) {
    // console.log("<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>");
    // console.log(operationsMap);
    // console.log(localMemory);
    let selectedOperationMap = [];

    for (let operation of operationsMap) {

        for (let eqSet of localMemory.equipment) {
            let code = eqSet.eq_code;
            let eq = eqSet.eq_name.slice(0, -3);

            if (operation.equipment === eq && code !== "") {
                selectedOperationMap.push(operation);
                break;
            }
        }
    }
    return selectedOperationMap;
}
export function convertToMemoryObj(inputObject) {
    let equipment = [];
    let reagents = [];

    // Iterate over the inputObject properties
    for (let key in inputObject) {
        if (inputObject.hasOwnProperty(key) && inputObject[key] !== '') {
            // Check if the property represents equipment
            if (key.startsWith('balances') || key.startsWith('reactor') || key.startsWith('d_filter') || key.startsWith('n_filter') || key.startsWith('m_pump') || key.startsWith('p_pump') || key.startsWith('o_pump') || key.startsWith('vac_oven') || key.startsWith('conv_oven')) {
                equipment.push({
                    eq_name: key,
                    eq_code: inputObject[key]
                });
            } 
            // Check if the property represents a reagent
            else if (key.startsWith('reagent')) {
                // Extract the reagent index from the key
                const reagIndex = key.slice(7);
                // Construct the reagent object and push it to the reagents array
                reagents.push(new Reagent(key, inputObject[key], inputObject['amount' + reagIndex]));
            }
        }
    }

    return new LocalMemory(inputObject.project, inputObject.TP, equipment, reagents);
}

// Function to get content and other for equipment type and activity type
export function getContentAndOtherForEquipmentAndActivityType(operationsMap, equipmentType, activityType) {
    // Find the equipment object
    const equipmentObj = operationsMap.find(op => op.equipment === equipmentType);
    if (equipmentObj) {
        // Find the description object for the given activity type
        const descriptionObj = equipmentObj.description.find(desc => desc.operation_type === activityType);
        if (descriptionObj) {
            // Return an object containing both content and other properties
            return {
                content: descriptionObj.content,
                other: descriptionObj.other
            };
        } else {
            return { error: "Content not found for activity type" };
        }
    } else {
        return { error: "Equipment not found" };
    }
}
export function populateContent(content, localMemory) {
    const { equipment } = localMemory;
    const equipmentMap = new Map();

    // Populate equipmentMap with equipment names as keys and array of codes as values
    equipment.forEach(item => {
        const { eq_name, eq_code } = item;
        const nameWithoutIndex = eq_name.slice(0, -3); // Remove last 3 characters
        if (!equipmentMap.has(nameWithoutIndex)) {
            equipmentMap.set(nameWithoutIndex, []);
        }
        equipmentMap.get(nameWithoutIndex).push(eq_code);
    });

    // console.log("eqMap:", equipmentMap);
    // Regular expression to match placeholders inside curly braces {}
    const placeholderRegex = /{([^{}]*)}/g;

    // Replace placeholders in the content
    const populatedContent = content.replace(placeholderRegex, (match, p1) => {
        // Check if the placeholder matches an equipment name in localMemory
        if (equipmentMap.has(p1)) {
            // If there's a matching equipment name, create a select element with options
            const options = equipmentMap.get(p1).map(code => `<option value="${code}">${code}</option>`).join('');
            return `<select name="${p1}">${options}</select>`;
        } else {
            // If there's no matching equipment name, keep the placeholder unchanged
            return match;
        }
    });

    return populatedContent;
}
export function populateUts(content, utensils, localMemory) {
    const { project, TP } = localMemory;

    // Create a map of utensil names and their corresponding values
    const utensilMap = new Map(utensils.map(item => [item.name, { project, TP }]));

    // Regular expression to match placeholders inside curly braces {}
    const placeholderRegex = /{([^{}]*)}/g;

    // Replace placeholders in the content
    const populatedContent = content.replace(placeholderRegex, (match, p1) => {
        // Check if the placeholder matches a utensil name
        if (utensilMap.has(p1)) {
            // If there's a matching utensil name, replace the placeholder with project or TP
            const { project, TP } = utensilMap.get(p1);
            return project !== '' ? project + " " + TP : TP;
        } else {
            // If there's no matching utensil name, keep the placeholder unchanged
            return match;
        }
    });
    return populatedContent;
}

export function populateMaterials(content, localMemory) {
    const { reagents } = localMemory;
    const reagentsMap = new Map(reagents.map(reagent => [reagent.reag_id, { name: reagent.reag_name, amount: reagent.reag_amount }]));

    // Regular expression to match placeholders inside curly braces containing the word "material"
    const placeholderRegex = /{(\bmaterial\b)}/g;

    // Replace placeholders in the content
    const populatedContent = content.replace(placeholderRegex, () => {
        // Create the select element options using the reagentsMap
        const options = Array.from(reagentsMap.values()).map(reagent => `<option value="${reagent.name}">${reagent.name} - ${reagent.amount}</option>`).join('');

        // Construct the select element with the provided id and name, including a default "select" option
        return `<select name="material"><option value="">--select--</option>${options}</select>`;
    });

    return populatedContent;
}
export function populateParams(content, params) {
    // Regular expression to match placeholders inside curly braces
    const regex = /\{([^{}]+)\}/g;

    // Array to store unique parameter names found in the content
    const uniqueParams = new Set();

    // Match placeholders inside curly braces and extract parameter names
    let match;
    while ((match = regex.exec(content)) !== null) {
        const paramName = match[1];
        uniqueParams.add(paramName);
    }

    // Replace placeholders with HTML input elements
    let replacedContent = content;
    uniqueParams.forEach(paramName => {
        // Check if the parameter is present in the params array
        const paramInfo = params.find(param => param.name === paramName);
        if (paramInfo) {
            // Generate an HTML input element for the parameter
            const inputElement = `<input type="text" name="${paramName}" id="${paramName}" placeholder="${paramName}">`;
            // Replace the placeholder with the HTML input element
            replacedContent = replacedContent.replace(new RegExp(`{${paramName}}`, 'g'), inputElement);
        }
    });

    // Return the content with placeholders replaced by HTML input elements
    return replacedContent;
}



