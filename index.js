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

async function getOpFromServer() {
    try {
        let opFromServer = await axios.get("http://localhost:8081/operations");
        return opFromServer.data
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getParamsForOps() {
    try {
        // Fetch parameters for operations
        let parametersForOperations = await axios.get("http://localhost:8081/eq_params");
        parametersForOperations = JSON.stringify(parametersForOperations.data);
        return parametersForOperations
    } catch (error) {
        console.error(error);
        return null
    }
}

function getLastOpNumber(opsFromServer){
    if (opsFromServer.length > 0){
        let lastOp = opsFromServer[opsFromServer.length-1];
        let lastNumber = lastOp.Operation;
        return lastNumber;
    }
    return null;
}

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


app.post("/operation_table", async (req, res) => {
    let parametersForOperations = await getParamsForOps();
    let operationsFromServer = await getOpFromServer();
    let lastOpNum = getLastOpNumber(operationsFromServer);
    if (lastOpNum===null){
        lastOpNum = 1
    }

    const { project, TP } = req.body
    projectListMemory = [];
    projectListMemory.push(project);
    projectListMemory.push(TP);

    // Extracting data from the request body
    const { reactor1, reactor2, oven1, m_pump1, m_pump2, p_pump1, p_pump2, o_pump1, n_filter1, d_filter1, balances1, balances2 } = req.body;

    // dataFromOperationServer = req.body.dataFromOperation;


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
    res.status(200).render("index.ejs", { equipmentTypes, equipmentListMemory, materialsMemory, parametersForOperations, projectListMemory, dataFromOperationServer, operationsFromServer, lastOpNum });
});

app.post("/update_operations",async (req,res)=>{
    const {opsFromServer}=req.body;
    try{
        await axios.post()
    }catch(error){
        console.error(error)
    }
})

// Server listening on specified port
app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    }
});
