import { settings } from "./public/settings.js";
import express, { response } from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import session from "express-session";
import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI,getBrOperation, getEqByName } from "./apiCallFuncs.js";
import { getContentAndOtherForEquipmentAndActivityType, populateContent, populateUts, populateMaterials, convertToMemoryObj, selectOps } from "./helperFuncs.js";
import { populateParams } from "./helperFuncs.js";
import { createProcessOperation } from "./helperFuncs.js";
import { LocalMemory } from "./public/dataClasses.js";
import { Equipment } from "./public/operationClasses.js";

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

app.post("/manage_eq", async (req,res)=>{
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
    }
    let selectedName = equipmentMap.name

    res.status(200).render("manage_eq_page.ejs",{names, selectedName, selected});
})

app.get("/manage_eq", async (req,res)=>{

    let equipmentMapFull = await getMainTableEq();
    const names = equipmentMapFull.map(item => item.name);
    res.status(200).render("manage_eq_page.ejs",{names});
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
