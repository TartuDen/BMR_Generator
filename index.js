import express from "express";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// import morgan from "morgan";
// import MyFunctions from "./funcs.js"
// import { Equipment, Description, TypicalActivity, Material, Waste, Operation } from "./funcs.js";


const port = 8080;
const app = express();
const mockUser = {// Mock user details
    id: 1,
    username: 'pomog',
    email: 'pomog@dryg.com'
}
const secretKey = crypto.randomBytes(32).toString('hex');

// Middleware to generate JWT token
function mockAuthentication(req, res, next) {
    //Generate JWT token for the mock user
    const token = jwt.sign({ user: mockUser }, secretKey, { expiresIn: '1H' });
    // Attach the token to the request object
    req.token = token;
    // Call the next middleware
    next();
}
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mockAuthentication);





app.get("/", (req, res) => {
    console.log("1token:");
    console.log(req.token);

    res.status(200).render("index.ejs", {token: req.token});
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
})