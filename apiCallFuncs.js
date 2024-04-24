import axios from "axios";

class EquipmentNoOperation {
    constructor(id, name, equipmentInfo) {
        this.id = id !== undefined ? id : -1;
        this.name = name !== undefined ? name : "";
        this.equipmentInfo = equipmentInfo !== undefined && equipmentInfo.length > 0 ?
            equipmentInfo.map(info => new EquipmentInfo(info.id, info.code, info.description)) :
            [new EquipmentInfo()];
    }
}

class EquipmentInfo {
    constructor(id, code, description) {
        this.id = id !== undefined ? id : -1;
        this.code = code !== undefined ? code : "";
        this.description = description !== undefined ? description : "";
    }
}

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
            let newObj = apiResp.data.map(item => new EquipmentNoOperation(item.id, item.name, item.equipmentInfo));
            console.log(newObj);
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

