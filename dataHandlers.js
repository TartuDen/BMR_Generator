import express from "express";
import bodyParser from "body-parser";
import { getEqByName, getMainTableEq, postEq, deleteEq, deleteBr, deleteBRfromLocalMemory, deleteOpFromBR, updateOpFromBR } from "./public/apiCallFuncs.js";
import { EquipmentNoOperation, EquipmentInfo, Operation } from './public/dataClasses.js';
import session from "express-session";


const router = express.Router();

// Middleware setup
router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(bodyParser.json());
router.use(session({
    secret: 'secret-key', // Replace 'secret-key' with a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));


/**
 * Handles POST requests to delete equipment.
 * Retrieves the equipment name from the request body.
 * Deletes the equipment using the provided name from the server API.
 * Redirects to the GET handler for retrieving equipment.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.post("/delete_eq", async (req,res)=>{
    const {name} = req.body;
    const apiResp = await deleteEq(name);
    res.status(200).redirect("/get_eq");

})


/**
 * Handles GET requests to render the post_eq_page.ejs template.
 * Retrieves the message query parameter from the request URL.
 * Logs the message to the console.
 * Renders the post_eq_page.ejs template.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.get("/post_eq", async (req,res)=>{
    const message = req.query.message;
    console.log(message);
    res.status(200).render("post_eq_page.ejs");
})

/**
 * Handles POST requests to submit equipment data.
 * Extracts data from req.body including name, code, description, operationType, content, and other.
 * Converts single string variables to arrays if needed.
 * Creates an array of EquipmentInfo objects and an array of Operation objects.
 * Creates an EquipmentNoOperation object.
 * Logs the equipment to the console.
 * Posts the equipment data to the server and redirects to the post_eq page with a message query parameter.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.post("/post_eq", async (req,res)=>{
    // Extract data from req.body
    let { name, code, description, operationType, content, other } = req.body;
    // Convert single string variables to arrays if needed
    code = Array.isArray(code) ? code : [code];
    description = Array.isArray(description) ? description : [description];
    operationType = Array.isArray(operationType) ? operationType : [operationType];
    content = Array.isArray(content) ? content : [content];
    other = Array.isArray(other) ? other : [other];

    // Create an array of EquipmentInfo objects
    const equipmentInfoArray = [];
    for (let i = 0; i < code.length; i++) {
        if (code[i] !== "") {
            const equipmentInfo = new EquipmentInfo(code[i], description[i]);
            equipmentInfoArray.push(equipmentInfo);
        }
    }

    // Create an array of Operation objects
    const operationsArray = [];
    for (let i = 0; i < operationType.length; i++) {
        if (operationType[i] !== "" && content[i] !== "") {
            const operation = new Operation(operationType[i], content[i], other[i]);
            operationsArray.push(operation);
        }
    }

    // Create an EquipmentNoOperation object
    const equipment = new EquipmentNoOperation(name, equipmentInfoArray, operationsArray);
    console.log("equipment.............:  ",equipment);

    let apiResp = await postEq(equipment);
    res.redirect(`post_eq?message=${apiResp.data}`)
})

/**
 * Handles POST requests to retrieve equipment information.
 * Extracts data from the request body including equipment, equipmentInfo, and operations.
 * Retrieves equipment information based on the provided equipment name.
 * Retrieves the full equipment map from the server.
 * Determines which equipment information to include based on the provided parameters.
 * Stores the retrieved data in the session for later use.
 * Redirects to the GET handler for displaying equipment information.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.post("/get_eq", async (req,res)=>{
    const {equipment, equipmentInfo, operations} = req.body;
    let equipmentMap = await getEqByName(equipment);

    let equipmentMapFull = await getMainTableEq();
    const names = equipmentMapFull.map(item => item.name);
    let selected = {};
    if (equipmentInfo){
        selected.equipmentInfo = equipmentMap.equipmentInfo;
    };
    if (operations){
        selected.operations = equipmentMap.operations;
    };
    if (!equipmentInfo && !operations){
        selected.equipmentInfo = equipmentMap.equipmentInfo;
        selected.operations = equipmentMap.operations;
    }
    let selectedName = equipmentMap.name
    req.session.names = names;
    req.session.selectedName = selectedName;
    req.session.selected = selected;

    res.redirect("get_eq");
})

/**
 * Handles GET requests to display equipment information.
 * Retrieves the selected name and selected data from the session.
 * Retrieves the full equipment map from the server.
 * Renders the get_eq_page.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.get("/get_eq", async (req,res)=>{
    const selectedName = req.session.selectedName;
    const selected = req.session.selected;

    let equipmentMapFull = await getMainTableEq();
    const names = equipmentMapFull.map(item => item.name);
    res.status(200).render("get_eq_page.ejs",{names, selectedName, selected});
})



router.get("/get_del_params", async(req,res)=>{
    let apiResp = await getParams();
})

/**
 * Handle POST request to delete a specific branch.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
router.post("/delete_br",async(req,res)=>{
    const {projectName, tp, version} = req.body;
    let apiResp = await deleteBr(projectName,tp,version);
    let apiRespLocalMem = await deleteBRfromLocalMemory(projectName, tp, version);
    res.redirect("/");
})

router.post("/delete_op", async(req,res)=>{
    const {projectName, tp, version, opNumber} = req.body;
    let apiRespDelOp = await deleteOpFromBR (projectName, tp, version, opNumber);
    let apiRespUpdOp = await updateOpFromBR(projectName, tp, version);
    console.log("apiRespUpdOP:\n",apiRespUpdOp);
    res.redirect("/operation_table");
})

// Export the router
export default router;