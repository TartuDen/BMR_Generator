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

app.post("/operation_table", (req, res) => {
    const { reactor1, reactor2, oven, m_pump1, m_pump2, p_pump1, p_pump2, o_pump, nutsche_filter, druck_filter, balances1, balances2 } = req.body;

    const equipmentNames = [
        { name: "reactor", condition: reactor1 !== "" || reactor2 !== "" },
        { name: "oven", condition: oven !== "" },
        { name: "membrane_pump", condition: m_pump1 !== "" || m_pump2 !== "" },
        { name: "peristaltic_pump", condition: p_pump1 !== "" || p_pump2 !== "" },
        { name: "oil_pump", condition: o_pump !== "" },
        { name: "nutsche_filter", condition: nutsche_filter !== "" },
        { name: "druck_filter", condition: druck_filter !== "" },
        { name: "balances", condition: balances1 !== "" || balances2 !== "" }
    ];

    const equipmentTypes = equipmentNames.filter(equipment => equipment.condition).map(equipment => ({ name: equipment.name }));

    res.status(200).render("index.ejs", { equipmentTypes });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
});
