import { settings } from "./public/settings.js";
import express, { response } from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import session from "express-session";
import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI, getEqByName, postEq, getProcOps, postNewOp, getAllBRs } from "./public/apiCallFuncs.js";
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
app.post("/create_process_op", async (req, res) => {
    // console.log("***************req.body********************");
    // console.log(req.body);
    // console.log("-------------------------------");

    const newOp = createProcessOperation(req.body);
    console.log("newOp:", newOp);

    const operationsMap = req.session.operationsMap;
    // console.log("operationsMap:", operationsMap);

    // const br_ops = req.session.br_ops;
    // console.log("br_ops:", br_ops);

    const localMemory = req.session.localMemory;
    // console.log("localMemory:", localMemory);

    let apiResp = await postNewOp(newOp);
    console.log("POST new operation was: ", apiResp);

    // br_ops.push(newOp);
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version); //BR OPs are here!
    req.session.br_ops = br_ops;
    console.log("*****************br_ops*******************");
    console.log(br_ops);
    console.log("-------------------------------");

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
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version); //BR OPs are here!
    

    // Storing operationsMap in session
    req.session.operationsMap = operationsMap;
    req.session.localMemory = localMemory;
    req.session.br_ops = br_ops;
    // console.log("localMemory: .......... ",localMemory);
    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs", { operationsMap, br_ops, localMemory });
});

function parseOperationsData(operations) {
    const uniqueCombinations = {}; // Object to store unique combinations and their counts
    
    // Iterate over each object in the operations array
    operations.forEach(operation => {
        // Create a key for the unique combination of projectName, tp, and version
        const key = `${operation.projectName}-${operation.tp}-${operation.version}`;
        
        // If the key doesn't exist in the uniqueCombinations object, initialize its count to 0
        if (!uniqueCombinations[key]) {
            uniqueCombinations[key] = 0;
        }
        
        // Increment the count for the current combination
        uniqueCombinations[key]++;
    });
    
    // Convert the uniqueCombinations object into the desired format
    const result = Object.entries(uniqueCombinations).map(([key, count]) => {
        const [projectName, tp, version] = key.split('-'); // Split the key back into projectName, tp, and version
        return [projectName, tp, version, count];
    });
    
    return result;
}

app.get("/", async (req, res) => {
    let equipmentMap = await getMainTableEq();
    let allBRs = await getAllBRs();
    // console.log("**************allBRs****************");
    let dataBRs = parseOperationsData(allBRs);

    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs", { equipmentMap, localMemory, dataBRs });

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
