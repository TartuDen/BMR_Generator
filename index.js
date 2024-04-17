//old build 1.0
import { settings } from "./public/settings.js";
/**
 * Entry point for the server application.
 * This file sets up an Express server to handle HTTP requests.
 * 
 * @module index.js
 * @requires express
 * @requires body-parser
 */

// Importing necessary modules
import express from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import axios from 'axios';

// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application
let equipmentListMemory = [];
const eqList = ["reactor", "oven", "m_pump", "p_pump", "o_pump", "n_filter", "d_filter", "balances"];
let projectListMemory = [];
let materialsMemory = [];
let dataFromOperationServer = {};

// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
// Route definitions

/**
 * Asynchronous function to fetch operations data from the operation server.
 * @returns {Promise} A promise that resolves with the operations data fetched from the server, or null if an error occurs.
 */
async function getOpFromServer() {
    try {
        let opFromServer = await axios.get("http://localhost:8081/operations");
        console.log(settings.databaseServerUrl);
        return opFromServer.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}



/**
 * Asynchronous function to fetch parameters for operations from the operation server.
 * @returns {Promise} A promise that resolves with the parameters data fetched from the server, or null if an error occurs.
 */
async function getParamsForOps() {
    try {
        let parametersForOperations = await axios.get("http://localhost:8081/eq_params");
        parametersForOperations = JSON.stringify(parametersForOperations.data);
        return parametersForOperations;
    } catch (error) {
        console.error(error);
        return null;
    }
}



/**
 * Retrieves the number of the last operation from the given list of operations.
 * @param {Array} opsFromServer - List of operations fetched from the server.
 * @returns {Number|null} The number of the last operation, or null if the list is empty.
 */
async function getLastOpNumber(opsFromServer){
    if (opsFromServer.length > 0){
        let lastOp = opsFromServer[opsFromServer.length-1];
        let lastNumber = lastOp.number;
        return lastNumber;
    }
    return null;
}


/**
 * Populates placeholders in the operation content with actual values.
 * @param {Object} data - Data object containing typical activity information.
 * @returns {String} The content with placeholders replaced by actual values.
 */
function populatePrevOps(data) {
    // Define equipment and placeholders
    const reactorEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "reactor");
    const balancesEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "balances");
    const ovenEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "oven");
    const m_pumpEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "m_pump");
    const p_pumpEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "p_pump");
    const o_pumpEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "o_pump");
    const n_filterEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "n_filter");
    const d_filterEquipment = data.typicalActivity.additionalEquipment.find(eq => eq.name === "d_filter");

    // Define placeholders
    const placeholders = {
        material: data.materialIn || null,
        reactor: reactorEquipment ? reactorEquipment.code : null,
        balances: balancesEquipment ? balancesEquipment.code : null,
        oven: ovenEquipment ? ovenEquipment.code : null,
        m_pump: m_pumpEquipment ? m_pumpEquipment.code : null,
        p_pump: p_pumpEquipment ? p_pumpEquipment.code : null,
        o_pump: o_pumpEquipment ? o_pumpEquipment.code : null,
        n_filter: n_filterEquipment ? n_filterEquipment.code : null,
        d_filter: d_filterEquipment ? d_filterEquipment.code : null,
        durationRange: data.typicalActivity.durationRange,
        targetTempRange: data.typicalActivity.targetTempRange,
        initialTempSet: data.typicalActivity.initialTempSet,
        finalTempSet: data.typicalActivity.finalTempSet,
        processTemp: data.typicalActivity.processTemp,
        rpmRange: data.typicalActivity.rpmRange,
        flowRange: data.typicalActivity.flowRange,
        ppumpSetRange: data.typicalActivity.ppumpSetRange,
        vpumpTorrProcess: data.typicalActivity.vpumpTorrProcess,
        vpumpTorrRange: data.typicalActivity.vpumpTorrRange,
        
        jug: `${data.project} ${data.TP}`,
        funnel: `${data.project} ${data.TP}`,
        hose: `${data.project} ${data.TP}`
    };

    // Replace placeholders with actual values
    let content = data.typicalActivity.content;
    Object.entries(placeholders).forEach(([placeholder, value]) => {
        content = content.replace(new RegExp(`{${placeholder}}`, 'g'), value);
    });

    return content;
}


/**
 * Route handler for the root path ("/").
 * Renders the "main_table.ejs" template with necessary data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", async (req, res) => {
    let eqNameCodeFromServer = {};
    let apiResp;
    for (let equipment of eqList) {
        try {
            apiResp = await axios.get("http://localhost:8081/main_table/" + equipment);
            apiResp = JSON.parse(apiResp.data);
            eqNameCodeFromServer[equipment] = apiResp;

        } catch (error) {
            console.error(error);
        }

    }
    
    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs", { equipmentListMemory, eqNameCodeFromServer, materialsMemory, projectListMemory });

});


/**
 * Route handler for the "/operation_table" path.
 * Handles POST requests to create operation tables.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/operation_table", async (req, res) => {
    let parametersForOperations = await getParamsForOps();
    let operationsFromServer = await getOpFromServer();
    let lastOpNum = await getLastOpNumber(operationsFromServer);
    if (lastOpNum===null){
        lastOpNum = 1;
    }else{
        lastOpNum = parseInt(lastOpNum)+1;
    }

     // Extracting data from the request body
    const { project, TP } = req.body
    projectListMemory = [];
    projectListMemory.push(project);
    projectListMemory.push(TP);

    const { reactor1, reactor2, oven1, m_pump1, m_pump2, p_pump1, p_pump2, o_pump1, n_filter1, d_filter1, balances1, balances2 } = req.body;

    materialsMemory = [];
    // Iterating through up to 10 possible material inputs
    for (let i = 0; i < 10; i++) {
        // If both reagent and amount are provided, create an object and push it to the materials array
        if (req.body["reagent" + i] !== "" && req.body["amount" + i]) {
            const material = {};
            material[req.body["reagent" + i]] = req.body["amount" + i];
            materialsMemory.push(material);
        }
    }

    // Definitions for equipment names and their conditions
    const equipmentNames = [
        { name: "reactor", condition: reactor1 !== "" || reactor2 !== "" },
        { name: "oven", condition: oven1 !== "" },
        { name: "m_pump", condition: m_pump1 !== "" || m_pump2 !== "" },
        { name: "p_pump", condition: p_pump1 !== "" || p_pump2 !== "" },
        { name: "o_pump", condition: o_pump1 !== "" },
        { name: "n_filter", condition: n_filter1 !== "" },
        { name: "d_filter", condition: d_filter1 !== "" },
        { name: "balances", condition: balances1 !== "" || balances2 !== "" }
    ];
    // Extracting equipment types from the equipmentNames array based on condition
    const equipmentTypes = equipmentNames.filter(equipment => equipment.condition).map(equipment => ({ name: equipment.name }));

    // Definitions for equipment list with their codes and conditions
    equipmentListMemory = [
        { name: "reactor", code: reactor1, condition: reactor1 !== "" },
        { name: "reactor", code: reactor2, condition: reactor2 !== "" },
        { name: "oven", code: oven1, condition: oven1 !== "" },
        { name: "m_pump", code: m_pump1, condition: m_pump1 !== "" },
        { name: "m_pump", code: m_pump2, condition: m_pump2 !== "" },
        { name: "p_pump", code: p_pump1, condition: p_pump1 !== "" },
        { name: "p_pump", code: p_pump2, condition: p_pump2 !== "" },
        { name: "o_pump", code: o_pump1, condition: o_pump1 !== "" },
        { name: "n_filter", code: n_filter1, condition: n_filter1 !== "" },
        { name: "d_filter", code: d_filter1, condition: d_filter1 !== "" },
        { name: "balances", code: balances1, condition: balances1 !== "" },
        { name: "balances", code: balances2, condition: balances2 !== "" },
    ];

    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs", { equipmentTypes, equipmentListMemory, materialsMemory, parametersForOperations, projectListMemory, dataFromOperationServer, operationsFromServer, lastOpNum, populatePrevOps: populatePrevOps });
});


/**
 * Route handler for updating operations.
 * Receives new operation data from the client and posts it to the API server.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/update_operations", async (req, res) => {
    try {
        const apiResp = await axios.post("http://localhost:8081/addOp", req.body);
        console.log('Success: ', apiResp.data.message);
        res.status(201).json(apiResp.data)
    } catch (error) {
        console.error("Error updating operations:", error.message);
        if (error.response) {
            // The request was made and the server responded with a non-2xx status code
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).send("No response received from the server.");
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send("Error occurred while sending the request.");
        }
    }
});



/**
 * Starts the server listening on the specified port.
 * @param {number} port - The port on which the server will listen.
 * @param {Function} err - The callback function to handle errors.
 */
app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    }else{
        console.log("Local server is running on port: "+port)
    }
});
