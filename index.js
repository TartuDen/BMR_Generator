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

app.post("/",(req,res)=>{
    res.status(200).render("main_table.ejs",{});
});

app.get("/operation_table",(req,res)=>{
    res.status(200).render("index.ejs",{});
});

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        throw err;
    }
})