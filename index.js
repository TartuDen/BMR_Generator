import { settings } from "./public/settings.js";
import express, { response } from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import { getMainTableEq } from "./apiCallFuncs.js";
import { getActivityTypeFromAPI } from "./apiCallFuncs.js";
import { getBrOperation } from "./apiCallFuncs.js";
import { convertToMemoryObj, selectOps } from "./helperFuncs.js";
import session from "express-session";
import { getContentAndOtherForEquipmentAndActivityType } from "./helperFuncs.js";
import { populateContent } from "./helperFuncs.js";
import { getUtensils } from "./apiCallFuncs.js";

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


function populateUts(content, utensils, localMemory) {
    const { project, TP } = localMemory;

    // Create a map of utensil names and their corresponding values
    const utensilMap = new Map(utensils.map(item => [item.name, { project, TP }]));

    // Regular expression to match placeholders inside curly braces {}
    const placeholderRegex = /{([^{}]*)}/g;

    // Replace placeholders in the content
    const populatedContent = content.replace(placeholderRegex, (match, p1) => {
        // Check if the placeholder matches a utensil name
        if (utensilMap.has(p1)) {
            // If there's a matching utensil name, replace the placeholder with project or TP
            const { project, TP } = utensilMap.get(p1);
            return project !== '' ? project + " "+ TP : TP;
        } else {
            // If there's no matching utensil name, keep the placeholder unchanged
            return match;
        }
    });
    return populatedContent;
}


app.post("/get_description",async (req,res)=>{
    const uts = await getUtensils();
    const {equipmentType, activityType} = req.body;
    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;
    const localMemory = req.session.localMemory;

   const {content, other} = getContentAndOtherForEquipmentAndActivityType(operationsMap,equipmentType, activityType);
   let formatedContent = populateContent(content, localMemory);
   formatedContent = populateUts(formatedContent, uts, localMemory);
   console.log("************************");
    // Output all variables to console
    console.log("operationsMap:", operationsMap);
    console.log("br_ops:", br_ops);
    console.log("equipmentType:", equipmentType);
    console.log("activityType:", activityType);
    console.log("content:", content);
    console.log("other:", other);
    console.log("localMemory:", localMemory);
    console.log("uts: ",uts);
    console.log("----------------------");
    console.log(formatedContent);
    console.log("////////////////////////////////////////")


    res.status(200).render("index.ejs",{operationsMap, br_ops, equipmentType, activityType, formatedContent, other})
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
