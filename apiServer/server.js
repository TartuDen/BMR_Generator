// index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from "pg";
import { GetListEquipmentTypesMOCK, GetUtensilsForOperationsMOCK, GetBrOperationMOCK, GetListActivityMOCK, GetEquipmentListByTypeMOCK, GetParametersForOperationsMOCK, GetListNonGMPActivityMOCK,GetAllBRsMOCK } from './apiMocks copy.js';
import { cache } from 'ejs';

const port = 8081;
const app = express();
let operations = [];

const client = new pg.Client({
  user: "dverves",
  host: "localhost",
  database: "br_generator",
  password: "123",
  port: 5432
});

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to br_generator db.");
  } catch (error) {
    console.error("Error connecting to br_generator db: ", error);
  }
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

app.get("/processoperation", async (req,res)=>{
  let allBRs = await GetAllBRsMOCK();
  res.status(201).json(allBRs)

})


app.post("/addOp", async (req, res) => {
  operations.push(req.body);

  res.status(201).json({ message: "post is successful" })
})

app.get("/equipment_list", async (req, res) => {
  // let equipmentType = req.body
  let equipmentTypes = await GetListEquipmentTypesMOCK();
  equipmentTypes = JSON.stringify(equipmentTypes);
  res.status(200).json(equipmentTypes);
})

app.get("/main_table/:eq", async (req, res) => {
  let eq = req.params.eq;
  let eqCodes = await GetEquipmentListByTypeMOCK(eq);
  eqCodes = JSON.stringify(eqCodes);
  res.status(200).json(eqCodes);
})

app.get("/eq_params", async (req, res) => {
  let eq_parm_list = await GetParametersForOperationsMOCK();
  eq_parm_list = JSON.stringify(eq_parm_list);
  res.status(200).json(eq_parm_list);
})

app.post("/filter", async (req, res) => {
  let eqType = req.query.equipmentType
  let equipmentTypes = await GetListNonGMPActivityMOCK(eqType); // here by changing GetListNonGMPActivityMOCK for GetListActivityMOCK we can work with nonGmp instructions.
  equipmentTypes = JSON.stringify(equipmentTypes);
  res.status(200).json(equipmentTypes);
})

app.get("/utensils", async (req,res)=>{
  let apiResp = await GetUtensilsForOperationsMOCK();
  res.status(200).json(apiResp);
})

app.get("/br_operations", async (req,res)=>{
  let apiResp = await GetBrOperationMOCK();
  res.status(200).json(apiResp);
})


app.get("/activity_type", async (req, res) => {
  let apiResp = await GetListActivityMOCK();
  res.status(200).json(apiResp);
})

app.get("/main_table_equipment", async (req, res) => {
  
  let apiResp = await GetEquipmentListByTypeMOCK();
  res.status(200).json(apiResp);
})

app.post("/get_user_auth", async(req,res)=>{
  const user =  {
    user_name: 'Den',
    email: 'denver1033@gmail.com',
    ava: 'https://lh3.googleusercontent.com/a/ACg8ocK2bz82lqcsA1oTBIsOb59Y3pVGeZWI76tPwJegyrrad6Nu5g=s96-c',
    role: "admin"
  }
  res.json(user);
})

app.post("/reg_user", async(req,res)=>{
  const {user_name, email, ava} = req.body;
  res.json({user_name, email, ava})
})

app.listen(port, async (err) => {
  if (err) throw err;
  await connectToDB();
  console.log("server is running on port: " + port)
})