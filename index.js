import { settings } from "./public/settings.js";
import express, { response } from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import session from "express-session";
import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI, getEqByName, postEq, getProcOps } from "./public/apiCallFuncs.js";
import { getContentAndOtherForEquipmentAndActivityType, populateContent, populateUts, populateMaterials, convertToMemoryObj, selectOps } from "./public/helperFuncs.js";
import { populateParams } from "./public/helperFuncs.js";
import { createProcessOperation } from "./public/helperFuncs.js";
import { LocalMemory } from "./public/dataClasses.js";
import eqHandlers from "./eqHandlers.js";



// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application

let localMemory =  new LocalMemory;
let br_ops = []

async function getAllOps(){
    
    for (let i = 0; i<10;i++){
        let apiResp = await getProcOps("tile",i);
        if (!apiResp){
            break
        }else{
            br_ops.push(apiResp);
        }
    }
}

// await getAllOps();

// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key', // Replace 'secret-key' with a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

app.use(eqHandlers);


// Route handler
app.post("/create_process_op", (req, res) => {
    // console.log("***************req.body********************");
    // console.log(req.body);
    // console.log("-------------------------------")
    const newOp = createProcessOperation(req.body);
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;
    // console.log("localMemory: ....... ",localMemory);

    br_ops.push(newOp);
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
    console.log("localMemory: .......... ",localMemory);


    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});
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
