// index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GetListEquipmentTypesMOCK, GetListActivityMOCK, GetEquipmentListByTypeMOCK, GetParametersForOperationsMOCK } from './apiMocks.js';

const port = 8081;
const app = express();
let operations = [];

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


// Endpoint to handle authentication and return token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Call the GetAuthToken function to fetch the authorization token
        const token = await GetAuthToken(username, password);
        console.log("token:");
        console.log(token);
        // Return the token as JSON
        res.json({ token });
    } catch (error) {
        // Handle any errors that occur during token retrieval
        res.status(500).json({ error: 'Failed to fetch authorization token' });
    }
});


app.post("/addOp",async (req,res)=>{
  operations.push(req.body);

  res.status(201).json({message: "post is successful"})
})

app.get("/operations",async(req,res)=>{
  res.status(200).json(operations);
})

app.get("/equipment_list", async (req,res)=>{
  // let equipmentType = req.body
    let equipmentTypes = await GetListEquipmentTypesMOCK();
    equipmentTypes = JSON.stringify(equipmentTypes);
    res.status(200).json(equipmentTypes);
})

app.get("/main_table/:eq", async (req,res)=>{
  let eq = req.params.eq;
  let eqCodes = await GetEquipmentListByTypeMOCK(eq);
  eqCodes = JSON.stringify(eqCodes);
  res.status(200).json(eqCodes);
})

app.get("/eq_params",async (req,res)=>{
  let eq_parm_list = await GetParametersForOperationsMOCK();
  eq_parm_list = JSON.stringify(eq_parm_list);
  res.status(200).json(eq_parm_list);
})

app.post("/filter", async (req,res)=>{
  let eqType = req.query.equipmentType
  let equipmentTypes = await GetListActivityMOCK(eqType);
  equipmentTypes = JSON.stringify(equipmentTypes);
  res.status(200).json(equipmentTypes);
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("server is running on port: "+port)
})