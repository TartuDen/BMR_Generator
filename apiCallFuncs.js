import axios from "axios";


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
        let apiResp = await axios.get("http://localhost:8081/main_table_equipment");
        return apiResp.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}export async function getActivityTypeFromAPI() {
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

