import axios from "axios";
import { EquipmentNoOperation, EquipmentInfo, Operation } from "./public/dataClasses.js";

// app.post("/update_operations", async (req, res) => {
//     try {
//         const apiResp = await axios.post("http://localhost:8081/addOp", req.body);
//         console.log('Success: ', apiResp.data.message);
//         res.status(201).json(apiResp.data)
//     } catch (error) {
//         console.error("Error updating operations:", error.message);
//         if (error.response) {
//             // The request was made and the server responded with a non-2xx status code
//             res.status(error.response.status).send(error.response.data);
//         } else if (error.request) {
//             // The request was made but no response was received
//             res.status(500).send("No response received from the server.");
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             res.status(500).send("Error occurred while sending the request.");
//         }
//     }
// });
export async function getMainTableEq() {
    try {
        let apiResp = await axios.get("http://localhost:8085/main_table_equipment");
        
        if (apiResp.data && Array.isArray(apiResp.data)) {
            let newObj = apiResp.data.map(item => new EquipmentNoOperation(item.name, item.equipmentInfo));
            // console.log(newObj);
            return newObj;
        } else {
            console.error("Invalid API response format");
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getEqByName(name) {
    try {
        let apiResp = await axios.get("http://localhost:8085/equipment/"+name);

        
        if (apiResp.data ) {
            // Convert equipmentInfo array to instances of EquipmentInfo
            const equipmentInfo = apiResp.data.equipmentInfo.map(info => new EquipmentInfo(info.code, info.description));

            // Convert operations array to instances of Operation
            const operations = apiResp.data.operations.map(op => new Operation(op.operationType, op.content, op.other));

            // Create an instance of EquipmentNoOperation
            const equipment = new EquipmentNoOperation(apiResp.data.name, equipmentInfo, operations);

            // Now, you can use 'equipment' object as needed
            console.log("equipment: ", equipment);
            return equipment;
        } else {
            console.error("Invalid API response format");
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getActivityTypeFromAPI() {
    try {
        let apiResp = await axios.get("http://localhost:8081/activity_type");
        return apiResp.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}
export async function getBrOperation() {
    try {
        let apiResp = await axios.get("http://localhost:8081/br_operations");
        return apiResp.data;
    } catch (err) {
        console.error("Faild to retrieve BR operations from API server with error: " + err);
        return null;
    }
}
export async function getUtensils() {
    try {
        let apiResp = await axios.get("http://localhost:8081/utensils");
        return apiResp.data;
    } catch (err) {
        console.error("Failed to retireve data from getUtensils() with error: " + err);
    }
}

export async function getParams() {
    try {
        let apiResp = await axios.get("http://localhost:8085/parameters");
        return apiResp.data;
    } catch (err) {
        console.error("Failed to retireve data from getUtensils() with error: " + err);
    }
}
