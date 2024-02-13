import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import MyFunctions from "./funcs.js"
// import { Equipment, Description, TypicalActivity, Material, Waste, Operation } from "./funcs.js";


const port = 8080;
const app = express();
const equipment = {
    "reactor":["002-12","002-13","002-14","002-17"],
    "oven": ["012-10","012-13"],
    "pump Membrane": ["001-22","001-24"],
    "pump Peristaltic": ["001-13","001-29"],
    "pump Oil": ["001-14","001-28"],
    "balance": ["007-20","007-24"],
    "filter Nutsch": ["046-5"],
    "filter Druck": ["046-6"],
}


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",(req,res)=>{
    
    res.status(200).render("index.ejs",{equipment});
});

app.listen(port,(err)=>{
    if(err) throw err;
    // console.log(err);
})