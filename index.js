import express, { response } from "express"; 
import bodyParser from "body-parser"; 
import session from "express-session";
import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI, getProcOps, postNewOp, getAllProjects, getAllTp, getProcessInitInfo, deleteProcessInitialInfo, postProcessInitialInfo } from "./public/apiCallFuncs.js";
import { getContentAndOtherForEquipmentAndActivityType, populateContent, populateUts, populateMaterials, convertToMemoryObj, selectOps } from "./public/helperFuncs.js";
import { populateParams } from "./public/helperFuncs.js";
import { createProcessOperation } from "./public/helperFuncs.js";
import { LocalMemory } from "./public/dataClasses.js";
import dataHandlers from "./dataHandlers.js";



// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application

let localMemory =  new LocalMemory;
let br_ops = []


// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key', // Replace 'secret-key' with a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

app.use(dataHandlers);


/**
 * Handles POST requests to create a new process operation.
 * Retrieves the new operation details from the request body.
 * Retrieves local memory from the session.
 * Posts the new operation to the server API.
 * Retrieves updated BR operations based on the project details from the session.
 * Stores the updated BR operations in the session.
 * Redirects to the corresponding GET handler.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/create_process_op", async (req, res) => {
    console.log("req.body:.................", req.body);
    let unchangedContent = req.session.content;
    const newOp = createProcessOperation(req.body, unchangedContent);
    console.log("newOp:..................\n",newOp);
    console.log("content: .......... \n", req.session.content);

    const localMemory = req.session.localMemory;
    let apiResp = await postNewOp(newOp);
    console.log("POST new operation was: ", apiResp);
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version);
    console.log("br_ops:...............\n", br_ops)
    req.session.br_ops = br_ops;
    res.redirect(`/create_process_op`);
});

/**
 * Handles GET requests to render the create process operation page.
 * Retrieves operations map, local memory, and BR operations from the session.
 * Renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/create_process_op", async (req, res) => {
    const operationsMap = req.session.operationsMap;
    const localMemory = req.session.localMemory;
    const br_ops = req.session.br_ops;
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});



/**
 * Handles POST requests to retrieve equipment description.
 * Retrieves utensils and parameters from the database.
 * Retrieves equipment type and activity type from the request body.
 * Retrieves operations map and local memory from the session.
 * Calculates content and other based on equipment and activity type.
 * Stores retrieved data in the session.
 * Redirects to the corresponding GET handler.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/get_description", async (req, res) => {
    const uts = await getUtensils();
    const params = await getParams();
    const { equipmentType, activityType } = req.body;
    const operationsMap = req.session.operationsMap;
    const localMemory = req.session.localMemory;

    const { content, other } = getContentAndOtherForEquipmentAndActivityType(operationsMap, equipmentType, activityType);

    let contentEq = populateContent(content, localMemory);
    let contentEqUts = populateUts(contentEq, uts, localMemory);
    let contentEqUtsMat = populateMaterials(contentEqUts, localMemory);
    let contentEqUtsMatParams =  populateParams(contentEqUtsMat, params);
    let finalFormatContent = contentEqUtsMatParams;

    req.session.content = content;
    req.session.equipmentType = equipmentType;
    req.session.activityType = activityType;
    req.session.finalFormatContent = finalFormatContent;
    req.session.other = other;
    res.redirect(`/get_description`);
});

/**
 * Handles GET requests to render equipment description.
 * Retrieves equipment type, activity type, operations map, BR operations, 
 * final format content, other details, and local memory from the session.
 * Renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/get_description", async (req, res) => {

    const equipmentType = req.session.equipmentType;
    const activityType = req.session.activityType ;
    const operationsMap = req.session.operationsMap ;
    const br_ops= req.session.br_ops  ;
    const finalFormatContent =req.session.finalFormatContent  ;
    const other= req.session.other  ;
    const localMemory= req.session.localMemory ;

    res.status(200).render("index.ejs", { equipmentType, activityType, operationsMap, br_ops, finalFormatContent, other, localMemory });
});

/**
 * Handles POST requests to update the operation table.
 * Retrieves data from the request body, converts it to a memory object, 
 * fetches the activity type from the API, selects operations based on the activity type,
 * and retrieves process operations. 
 * The retrieved data is stored in the session.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/operation_table", async (req, res) => {
    localMemory = req.body;
    localMemory = convertToMemoryObj(localMemory);
    let apiResp1 = await deleteProcessInitialInfo(localMemory.projectName, localMemory.tp, localMemory.version);
    let apiResp2 = await postProcessInitialInfo(localMemory);
    let apiResp3 = await getProcessInitInfo(localMemory.projectName, localMemory.tp, localMemory.version);
    let operationsMap = await getActivityTypeFromAPI();
    operationsMap = selectOps(operationsMap, localMemory);
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version);
    req.session.operationsMap = operationsMap;

    req.session.localMemory = localMemory;
    req.session.br_ops = br_ops;
    res.redirect(`/operation_table`);
});

/**
 * Handles GET requests to render the operation table.
 * Retrieves the operations map, BR operations, and local memory from the session
 * and renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/operation_table", async (req, res) => {
    // Parse the query parameters back into their original data structures
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});


/**
 * Handle POST requests to the root route.
 * Retrieves data based on the provided project name, TP, and version,
 * then stores the data in the session as a LocalMemory object.
 * If project name, TP, or version is missing, initializes an empty LocalMemory object.
 * Redirects the user back to the root route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.post("/", async (req,res)=>{
    const {projectName, tp, version} = req.body;
    if (projectName && tp && version){
        let apiRespData = await getProcessInitInfo(projectName, tp, version);

        localMemory = new LocalMemory(apiRespData);
    }else{
        localMemory = new LocalMemory();

    }
    req.session.localMemory = localMemory;
    res.redirect("/");
})

/**
 * Route handler for the home page.
 * Renders the main table view with equipment map and project data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/", async (req, res) => {
    let { projectName } = req.query;
    let equipmentMap = await getMainTableEq();
    let allProj = await getAllProjects();
    let localMemory;
    if (req.session.localMemory){
        localMemory = req.session.localMemory
    }else{
        localMemory = new LocalMemory;
    }
    // let localMemory = await getProcessInitInfo()
    let allTpFromProj = [];
    if (projectName) {
        allTpFromProj = await getAllTp(projectName);
    }
    res.status(200).render("main_table.ejs", { equipmentMap, localMemory, allProj, allTpFromProj });
});

/**
 * Starts the server and listens on the specified port.
 * 
 * @param {number} port - The port on which the server will listen
 */
app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("Proxy server is running on port: " + port)
    }
});
