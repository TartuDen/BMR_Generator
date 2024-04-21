import { settings } from "./public/settings.js";
import express from "express"; // Importing Express framework for building the server
import bodyParser from "body-parser"; // Importing body-parser middleware for parsing request bodies
import { getMainTableEq } from "./apiCallFuncs.js";
import { getActivityTypeFromAPI } from "./apiCallFuncs.js";
import { getBrOperation } from "./apiCallFuncs.js";
import { convertToMemoryObj, selectOps } from "./helperFuncs.js";
import session from "express-session";

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


app.post("/get_description",(req,res)=>{
    const {equipmentType, activityType} = req.body

    console.log("body");
    console.log(req.body);

    const operationsMap = req.session.operationsMap;
    const br_ops = req.session.br_ops;

    console.log(operationsMap);
    console.log(br_ops);

    res.status(200).render("index.ejs",{operationsMap, br_ops})
})

app.post("/operation_table", async (req, res) => {
    localMemory = req.body;
    localMemory = convertToMemoryObj(localMemory);
    let operationsMap = await getActivityTypeFromAPI();
    operationsMap = selectOps(operationsMap, localMemory);
    let br_ops = await getBrOperation();

    // Storing operationsMap in session
    req.session.operationsMap = operationsMap;

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
