import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import MyFunctions from "./funcs.js"
// import { Equipment, Description, TypicalActivity, Material, Waste, Operation } from "./funcs.js";


const port = 8080;
const app = express();

const reactor = {
    "name": "reactor",
    "code":"002-17"
}

const balances = {
    "name": "balances",
    "code":"007-42"
}

const jug = {
    "name": "jug",
    "label":"tile",
    "size": "5L",
    "material": "plastic"
}

const funnel = {
    "name": "jug",
    "label":"tile",
    "size": "5L",
    "material": "plastic"
}


const loading_of_solid={
    "content": "Required amount of {material} is weighed on the {equipment: balances} using {utensils: jug}.\nMaterial is loaded into reactor via 60 mm flange port using {utensils: funnel}\nThe 60 mm flange port is closed.",
    "duration min":"0.5h",
    "duration max": "1.0h",
    "temperature min": "10°C",
    "temperature max": "20°C",
    "additional equipment":[balances],
    "utensils":[jug]

}

const typicalActivity = {
    "operation type": "loading of solid",
    "description" : loading_of_solid
}

const material = {
    "name": "EtOH",
    "WHcode": "ETOH042",
    "mass": "3.2kg",
    "volume": "",
    "range": 0.05,
    "additional info": "Very tasty, Do not drink at work, flamable"
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",(req,res)=>{

    let data = {
        reactor,
        typicalActivity,
        material
    }

    
    res.status(200).render("index.ejs",{data});
});

app.listen(port,(err)=>{
    if(err) throw err;
    // console.log(err);
})