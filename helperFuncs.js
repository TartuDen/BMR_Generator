import { LocalMemory } from "./public/dataClasses.js";


export function selectOps(operationsMap, localMemory) {
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

    for (let key in inputObject) {
        if (inputObject.hasOwnProperty(key) && inputObject[key] !== '') {
            if (key.startsWith('balances') || key.startsWith('reactor') || key.startsWith('d_filter') || key.startsWith('n_filter') || key.startsWith('m_pump') || key.startsWith('p_pump') || key.startsWith('o_pump') || key.startsWith('vac_oven') || key.startsWith('conv_oven')) {
                equipment.push({
                    eq_name: key,
                    eq_code: inputObject[key]
                });
            } else if (key.startsWith('reagent')) {
                reagents.push({
                    reag_name: key,
                    reag_amount: inputObject[key]
                });
            }
        }
    }

    return new LocalMemory(inputObject.project, inputObject.TP, equipment, reagents);
}// Function to get content and other for equipment type and activity type
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

