import { settings } from "./public/settings.js";
import express from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import { getMainTableEq } from "./apiCallFuncs.js";
import { getActivityTypeFromAPI } from "./apiCallFuncs.js";
import { getBrOperation } from "./apiCallFuncs.js";
import { convertToMemoryObj, selectOps } from "./helperFuncs.js";
import session from "express-session";
import { getContentAndOtherForEquipmentAndActivityType } from "./helperFuncs.js";

// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application

let localMemory = { project: '', TP: '', equipment: [], reagents: [] };


// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key', // Replace 'secret-key' with a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

function populateContent(content, localMemory) {
    const { equipment } = localMemory;
    const equipmentMap = new Map();
    
    // Populate equipmentMap with equipment names as keys and array of codes as values
    equipment.forEach(item => {
        const { eq_name, eq_code } = item;
        const nameWithoutIndex = eq_name.slice(0, -3); // Remove last 3 characters
        if (!equipmentMap.has(nameWithoutIndex)) {
            equipmentMap.set(nameWithoutIndex, []);
        }
        equipmentMap.get(nameWithoutIndex).push(eq_code);
    });
    
    // console.log("eqMap:", equipmentMap);
    
    // Regular expression to match placeholders inside curly braces {}
    const placeholderRegex = /{([^{}]*)}/g;
    
    // Replace placeholders in the content
    const populatedContent = content.replace(placeholderRegex, (match, p1) => {
        // Check if the placeholder matches an equipment name in localMemory
        if (equipmentMap.has(p1)) {
            // If there's a matching equipment name, create a select element with options
            const options = equipmentMap.get(p1).map(code => `<option value="${code}">${code}</option>`).join('');
            return `<select name="${p1}">${options}</select>`;
        } else {
            // If there's no matching equipment name, keep the placeholder unchanged
            return match;
        }
    });

    return populatedContent;
}



app.post("/get_description",(req,res)=>{
    const {equipmentType, activityType} = req.body
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;

   const {content, other} = getContentAndOtherForEquipmentAndActivityType(operationsMap,equipmentType, activityType);

   console.log("************************");
    // Output all variables to console
    console.log("operationsMap:", operationsMap);
    console.log("br_ops:", br_ops);
    console.log("equipmentType:", equipmentType);
    console.log("activityType:", activityType);
    console.log("content:", content);
    console.log("other:", other);
    console.log("localMemory:", localMemory);
    console.log("----------------------");
    console.log(populateContent(content, localMemory));
    console.log("////////////////////////////////////////")


    res.status(200).render("index.ejs",{operationsMap, br_ops, equipmentType, activityType, content, other})
})

app.post("/operation_table", async (req, res) => {
    localMemory = req.body;
    localMemory = convertToMemoryObj(localMemory);
    let operationsMap = await getActivityTypeFromAPI();
    operationsMap = selectOps(operationsMap, localMemory);
    let br_ops = await getBrOperation();

    // Storing operationsMap in session
    req.session.operationsMap = operationsMap;
    req.session.localMemory = localMemory;
    req.session.br_ops = br_ops;

    console.log(operationsMap);
    console.log(br_ops);
    // Rendering the "index.ejs" template with equipmentTypes and equipmentListMemory data
    res.status(200).render("index.ejs",{operationsMap, br_ops});
});



app.get("/", async (req, res) => {
    let equipmentMap = await getMainTableEq();
    // console.log(equipmentMap);
    // Rendering the "main_table.ejs" template with no data
    res.status(200).render("main_table.ejs",{equipmentMap, localMemory});

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
