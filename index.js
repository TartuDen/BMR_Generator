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

let localMemory = { project: '', TP: '', equipment: [], reagents: [] };


// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());



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


async function getLastOpNumber(opsFromServer){
    if (opsFromServer.length > 0){
        let lastOp = opsFromServer[opsFromServer.length-1];
        let lastNumber = lastOp.number;
        return lastNumber;
    }
    return null;
}

async function getMainTableEq(){
    try {
        let apiResp = await axios.get("http://localhost:8081/main_table_equipment");
        return apiResp.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

app.get("/", async (req, res) => {
    let equipmentMap = await getMainTableEq();
    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs",{equipmentMap, localMemory});

});

async function getOperations(){
    try {
        let apiResp = await axios.get("http://localhost:8081/operations");
        return apiResp.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function selectOps(operationsMap, localMemory) {
    let selectedOperationMap = [];

    for (let operation of operationsMap) {
        let equipmentKey = operation.Equipment;
        for (let memoryKey in localMemory){
            let code = localMemory[memoryKey]
            memoryKey = memoryKey.slice(0,-3);

            if (equipmentKey === memoryKey && code !=="" ){
                selectedOperationMap.push(operation);
                break;
            }
        }
    }

    return selectedOperationMap;
}

function convertToObject(inputObject) {
    let outputObject = {
        project: '',
        TP: '',
        equipment: [],
        reagents: []
    };

    // Iterate through inputObject keys
    for (let key in inputObject) {
        if (inputObject.hasOwnProperty(key) && inputObject[key] !== '') {
            // Check if the key represents equipment or reagent
            if (key.startsWith('balances') || key.startsWith('reactor') || key.startsWith('d_filter') || key.startsWith('n_filter') || key.startsWith('m_pump') || key.startsWith('p_pump') || key.startsWith('o_pump') || key.startsWith('vac_oven') || key.startsWith('conv_oven')) {
                // Add to equipment array
                outputObject.equipment.push({
                    eq_name: key,
                    eq_code: inputObject[key]
                });
            } else if (key.startsWith('reagent')) {
                // Add to reagents array
                outputObject.reagents.push({
                    reag_name: key,
                    reag_amount: inputObject[key]
                });
            } else {
                // Add other properties directly to outputObject
                outputObject[key] = inputObject[key];
            }
        }
    }

    return outputObject;
}


app.post("/operation_table", async (req, res) => {
    // console.log(req.body);
    localMemory = req.body;

    localMemory = convertToObject(localMemory);

    let operationsMap = await getOperations();
    // operationsMap = selectOps(operationsMap, localMemory);
    // console.log(operationsMap);
    console.log(localMemory);


    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs",{operationsMap});
});



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


app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    }else{
        console.log("Local server is running on port: "+port)
    }
});
