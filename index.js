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

// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application
var equipmentList = [];

// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies

// Route definitions

/**
 * Handles GET requests to the root URL ("/").
 * Renders the main_table.ejs template.
 * 
 * @name GET /
 * @function
 * @memberof module:index.js
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get("/", (req, res) => {
    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs", {equipmentList});
});

/**
 * Handles POST requests to the "/operation_table" endpoint.
 * Processes request data and renders the index.ejs template with equipment information.
 * 
 * @name POST /operation_table
 * @function
 * @memberof module:index.js
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.post("/operation_table", (req, res) => {
    const {project, TP} = req.body
    // Extracting data from the request body
    const { reactor1, reactor2, oven, m_pump1, m_pump2, p_pump1, p_pump2, o_pump, nutsche_filter, druck_filter, balances1, balances2 } = req.body;
    const materials = []; // Array to store materials data

    // Iterating through up to 10 possible material inputs
    for (let i = 0; i < 10; i++) {
        // If both reagent and amount are provided, create an object and push it to the materials array
        if (req.body["reagent" + i] !== "" && req.body["amount" + i]) {
            const material = {};
            material[req.body["reagent" + i]] = req.body["amount" + i];
            materials.push(material);
        }
    }

    // Definitions for equipment names and their conditions
    const equipmentNames = [
        { name: "reactor", condition: reactor1 !== "" || reactor2 !== "" },
        { name: "oven", condition: oven !== "" },
        { name: "membrane_pump", condition: m_pump1 !== "" || m_pump2 !== "" },
        { name: "peristaltic_pump", condition: p_pump1 !== "" || p_pump2 !== "" },
        { name: "oil_pump", condition: o_pump !== "" },
        { name: "nutsche_filter", condition: nutsche_filter !== "" },
        { name: "druck_filter", condition: druck_filter !== "" },
        { name: "balances", condition: balances1 !== "" || balances2 !== "" }
    ];
    // Extracting equipment types from the equipmentNames array based on condition
    const equipmentTypes = equipmentNames.filter(equipment => equipment.condition).map(equipment => ({ name: equipment.name }));

    // Definitions for equipment list with their codes and conditions
    equipmentList = [
        {name: "reactor", code: reactor1, condition: reactor1!==""},
        {name: "reactor", code: reactor2, condition: reactor2!==""},
        {name: "oven", code: oven, condition: oven!==""},
        {name: "membrane_pump", code: m_pump1, condition: m_pump1!==""},
        {name: "membrane_pump", code: m_pump2, condition: m_pump2!==""},
        {name: "peristaltic_pump", code: p_pump1, condition: p_pump1!==""},
        {name: "peristaltic_pump", code: p_pump2, condition: p_pump2!==""},
        {name: "oil_pump", code: o_pump, condition: o_pump!==""},
        {name: "nutsche_filter", code: nutsche_filter, condition: nutsche_filter!==""},
        {name: "druck_filter", code: druck_filter, condition: druck_filter!==""},
        {name: "balances", code: balances1, condition: balances1!==""},
        {name: "balances", code: balances2, condition: balances2!==""},
    ];



    // Rendering the "index.ejs" template with equipmentTypes and equipmentList data
    res.status(200).render("index.ejs", {project, TP, equipmentTypes, equipmentList, materials });
});

// Server listening on specified port
app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    }
});
