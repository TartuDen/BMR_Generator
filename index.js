import { settings } from "./public/settings.js";
import express, { response } from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import session from "express-session";
import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI,getBrOperation, getEqByName, postEq } from "./apiCallFuncs.js";
import { getContentAndOtherForEquipmentAndActivityType, populateContent, populateUts, populateMaterials, convertToMemoryObj, selectOps } from "./helperFuncs.js";
import { populateParams } from "./helperFuncs.js";
import { createProcessOperation } from "./helperFuncs.js";
import { LocalMemory } from "./public/dataClasses.js";
import { Equipment } from "./public/operationClasses.js";
import { EquipmentNoOperation, EquipmentInfo, Operation } from './public/dataClasses.js'; // Import the class constructors


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


// Route handler
app.post("/new_operation_data", (req, res) => {
    // console.log("***************req.body********************");
    // console.log(req.body);
    // console.log("-------------------------------")
    const newOp = createProcessOperation(req.body);
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;

    br_ops.push(newOp);
    console.log(newOp);
    // console.log("*****************br_ops*******************");
    // console.log(br_ops);
    // console.log("-------------------------------")
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});


app.post("/get_description", async (req, res) => {
    const uts = await getUtensils();
    const params = await getParams();
    const { equipmentType, activityType } = req.body;
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;

    const { content, other } = getContentAndOtherForEquipmentAndActivityType(operationsMap, equipmentType, activityType);
    let contentEq = populateContent(content, localMemory);
    let contentEqUts = populateUts(contentEq, uts, localMemory);
    let contentEqUtsMat = populateMaterials(contentEqUts, localMemory);
    let contentEqUtsMatParams =  populateParams(contentEqUtsMat, params);



    let finalFormatContent = contentEqUtsMatParams;
    res.status(200).render("index.ejs", { operationsMap, br_ops, equipmentType, activityType, finalFormatContent, other, localMemory })
})

app.post("/operation_table", async (req, res) => {
    localMemory = req.body;
    localMemory = convertToMemoryObj(localMemory);
    let operationsMap = await getActivityTypeFromAPI();
    operationsMap = selectOps(operationsMap, localMemory);
    // let br_ops = await getBrOperation(); BR OPs are here!

    // Storing operationsMap in session
    req.session.operationsMap = operationsMap;
    req.session.localMemory = localMemory;
    req.session.br_ops = br_ops;
    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});

app.get("/post_eq", async (req,res)=>{
    res.status(200).render("post_eq_page.ejs");
})

app.post("/post_eq", async (req,res)=>{
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
    console.log("equipment:  ",equipment);

    let apiResp = await postEq(equipment);
    console.log("apiResp: ",apiResp);

    res.status(200).render("post_eq_page.ejs",{message: apiResp});
})

app.post("/get_eq", async (req,res)=>{
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

    res.status(200).render("get_eq_page.ejs",{names, selectedName, selected});
})

app.get("/get_eq", async (req,res)=>{

    let equipmentMapFull = await getMainTableEq();
    const names = equipmentMapFull.map(item => item.name);
    res.status(200).render("get_eq_page.ejs",{names});
})

app.get("/", async (req, res) => {
    let equipmentMap = await getMainTableEq();

    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs", { equipmentMap, localMemory });

});

app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("Local server is running on port: " + port)
    }
});
