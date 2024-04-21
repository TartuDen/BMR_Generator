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
}
