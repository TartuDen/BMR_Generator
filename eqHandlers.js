// Import necessary dependencies
import express from "express";
import bodyParser from "body-parser";
import { getEqByName, getMainTableEq, postEq, deleteEq } from "./public/apiCallFuncs.js";
import { EquipmentNoOperation, EquipmentInfo, Operation } from './public/dataClasses.js';

// Create an Express router instance
const router = express.Router();

// Middleware setup
router.use(express.static("public")); // Serving static files from the "public" directory
router.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
router.use(bodyParser.json());




// **************GET / POST / DELETE handlers for Equipment/Operations*****************

router.post("/delete_eq", async (req,res)=>{
    const {name} = req.body;
    const apiResp = await deleteEq(name);
    res.status(200).redirect("/get_eq");

})

router.get("/post_eq", async (req,res)=>{
    res.status(200).render("post_eq_page.ejs");
})

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
    console.log("equipment:  ",equipment);

    let apiResp = await postEq(equipment);
    console.log("apiResp: ",apiResp);

    res.status(200).render("post_eq_page.ejs",{message: apiResp});
})

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

    res.status(200).render("get_eq_page.ejs",{names, selectedName, selected});
})

router.get("/get_eq", async (req,res)=>{

    let equipmentMapFull = await getMainTableEq();
    const names = equipmentMapFull.map(item => item.name);
    res.status(200).render("get_eq_page.ejs",{names});
})

// Export the router
export default router;