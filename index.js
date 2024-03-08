import express from "express";
import bodyParser from "body-parser";
// import morgan from "morgan";
// import MyFunctions from "./funcs.js"
// import { Equipment, Description, TypicalActivity, Material, Waste, Operation } from "./funcs.js";


const port = 8080;
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.status(200).render("main_table.ejs",{});
});

app.post("/operation_table",(req,res)=>{
    const {reactor1, reactor2, oven, m_pump1, 
        m_pump2, p_pump1, p_pump2, o_pump, nutsche_filter, 
        druck_filter, balances1, balances2} = req.body
        let equipmentTypes = [];
    if(reactor1!==""|| reactor2!==""){
        equipmentTypes.push({name: "reactor"});
    }
    if (oven!==""){
        equipmentTypes.push({name:"oven"});
    }
    if (m_pump1!==""|| m_pump2!==""){
        equipmentTypes.push({name:"membrane_pump"});
    }
    if (p_pump1!==""|| p_pump2!==""){
        equipmentTypes.push({name:"peristaltic_pump"});
    }
    if (o_pump!==""){
        equipmentTypes.push({name:"oil_pump"});
    }
    if (nutsche_filter!==""){
        equipmentTypes.push({name:"nutsche_filter"});
    }
    if (druck_filter!==""){
        equipmentTypes.push({name:"druck_filter"});
    }
    if (balances1!==""||balances2!==""){
        equipmentTypes.push({name:"balances"});
    }

    res.status(200).render("index.ejs",{equipmentTypes});
});

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        throw err;
    }
})