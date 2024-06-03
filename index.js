import express, { response } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from 'passport';//Authentication middleware for Node.js.
import { Strategy as LocalStrategy } from 'passport-local'; // Strategy for username and password authentication with Passport.
import env from 'dotenv';
import GoogleStrategy from 'passport-google-oauth2';
import axios from "axios";

import { getUtensils, getParams, getMainTableEq, getActivityTypeFromAPI, getProcOps, postNewOp, getAllProjects, getAllTp, getProcessInitInfo, deleteProcessInitialInfo, postProcessInitialInfo } from "./public/apiCallFuncs.js";
import { getContentAndOtherForEquipmentAndActivityType, populateContent, populateUts, populateMaterials, convertToMemoryObj, selectOps } from "./public/helperFuncs.js";
import { populateParams } from "./public/helperFuncs.js";
import { createProcessOperation } from "./public/helperFuncs.js";
import { LocalMemory } from "./public/dataClasses.js";
import dataHandlers from "./dataHandlers.js";
import { updateSelectedOptions } from "./public/helperFuncs.js";



// Constants
const port = 8080; // Port on which the server will listen
const app = express(); // Creating an instance of the Express application

let localMemory = new LocalMemory;
let br_ops = []


// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
env.config();
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace 'secret-key' with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(dataHandlers);

/**
 * Handles POST requests to create a new process operation.
 * Retrieves the new operation details from the request body.
 * Retrieves local memory from the session.
 * Posts the new operation to the server API.
 * Retrieves updated BR operations based on the project details from the session.
 * Stores the updated BR operations in the session.
 * Redirects to the corresponding GET handler.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/create_process_op", async (req, res) => {
    // console.log("req.body:.................", req.body);

    const newOp = createProcessOperation(req.body);
    // console.log("newOp:..................\n",newOp);
    // console.log("content: .......... \n", req.session.content);

    const localMemory = req.session.localMemory;
    // console.log("..................localMem:........\n",localMemory);
    let apiResp = await postNewOp(newOp);
    // console.log("POST new operation was: ", apiResp);
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version);
    br_ops = updateSelectedOptions(br_ops);

    // console.log("br_ops:...............\n", br_ops)
    req.session.br_ops = br_ops;
    res.redirect(`/create_process_op`);
});

/**
 * Handles GET requests to render the create process operation page.
 * Retrieves operations map, local memory, and BR operations from the session.
 * Renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/create_process_op", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        const operationsMap = req.session.operationsMap;
        const localMemory = req.session.localMemory;
        let br_ops = req.session.br_ops;
        res.status(200).render("index.ejs", { user, operationsMap, br_ops, localMemory });
    } else {
        res.redirect("/");
    }

});



/**
 * Handles POST requests to retrieve equipment description.
 * Retrieves utensils and parameters from the database.
 * Retrieves equipment type and activity type from the request body.
 * Retrieves operations map and local memory from the session.
 * Calculates content and other based on equipment and activity type.
 * Stores retrieved data in the session.
 * Redirects to the corresponding GET handler.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/get_description", async (req, res) => {
    const uts = await getUtensils();
    const params = await getParams();
    const { equipmentType, activityType } = req.body;
    const operationsMap = req.session.operationsMap;
    const localMemory = req.session.localMemory;

    const { content, other } = getContentAndOtherForEquipmentAndActivityType(operationsMap, equipmentType, activityType);

    let contentEq = populateContent(content, localMemory);
    let contentEqUts = populateUts(contentEq, uts, localMemory);
    let contentEqUtsMat = populateMaterials(contentEqUts, localMemory);
    let contentEqUtsMatParams = populateParams(contentEqUtsMat, params);
    let finalFormatContent = contentEqUtsMatParams;

    req.session.content = content;
    req.session.equipmentType = equipmentType;
    req.session.activityType = activityType;
    req.session.finalFormatContent = finalFormatContent;
    req.session.other = other;
    res.redirect(`/get_description`);
});

/**
 * Handles GET requests to render equipment description.
 * Retrieves equipment type, activity type, operations map, BR operations, 
 * final format content, other details, and local memory from the session.
 * Renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/get_description", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        const equipmentType = req.session.equipmentType;
        const activityType = req.session.activityType;
        const operationsMap = req.session.operationsMap;
        let br_ops = req.session.br_ops;
        const finalFormatContent = req.session.finalFormatContent;
        const other = req.session.other;
        const localMemory = req.session.localMemory;
        br_ops = updateSelectedOptions(br_ops);
        res.status(200).render("index.ejs", { user, equipmentType, activityType, operationsMap, br_ops, finalFormatContent, other, localMemory });
    } else {
        res.redirect("/");
    }

});

/**
 * Handles POST requests to update the operation table.
 * Retrieves data from the request body, converts it to a memory object, 
 * fetches the activity type from the API, selects operations based on the activity type,
 * and retrieves process operations. 
 * The retrieved data is stored in the session.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.post("/operation_table", async (req, res) => {
    localMemory = req.body;

    localMemory = convertToMemoryObj(localMemory);
    console.log(".............newLocalMem...........\n", localMemory);
    let apiResp1 = await deleteProcessInitialInfo(localMemory.projectName, localMemory.tp, localMemory.version);
    let apiResp2 = await postProcessInitialInfo(localMemory);
    let apiResp3 = await getProcessInitInfo(localMemory.projectName, localMemory.tp, localMemory.version);
    let operationsMap = await getActivityTypeFromAPI();
    operationsMap = selectOps(operationsMap, localMemory);
    br_ops = await getProcOps(localMemory.projectName, localMemory.tp, localMemory.version);
    req.session.operationsMap = operationsMap;

    req.session.localMemory = localMemory;
    req.session.br_ops = br_ops;
    res.redirect(`/operation_table`);
});

/**
 * Handles GET requests to render the operation table.
 * Retrieves the operations map, BR operations, and local memory from the session
 * and renders the index.ejs template with the retrieved data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/operation_table", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        // Parse the query parameters back into their original data structures
        const operationsMap = req.session.operationsMap;
        let br_ops = req.session.br_ops;
        const localMemory = req.session.localMemory;
        br_ops = updateSelectedOptions(br_ops);
        res.status(200).render("index.ejs", { user, operationsMap, br_ops, localMemory });
    } else {
        res.redirect("/");
    }

});


/**
 * Handle POST requests to the root route.
 * Retrieves data based on the provided project name, TP, and version,
 * then stores the data in the session as a LocalMemory object.
 * If project name, TP, or version is missing, initializes an empty LocalMemory object.
 * Redirects the user back to the root route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.post("/main_table", async (req, res) => {
    const { projectName, tp, version } = req.body;
    if (projectName && tp && version) {
        let apiRespData = await getProcessInitInfo(projectName, tp, version);
        req.session.projectName = projectName;

        localMemory = new LocalMemory(apiRespData);
    } else {
        localMemory = new LocalMemory();

    }
    req.session.localMemory = localMemory;
    res.redirect("/main_table");
})

/**
 * Route handler for the home page.
 * Renders the main table view with equipment map and project data.
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
app.get("/main_table", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        // console.log(".........user............\n", user);
        let  projectName = req.session.projectName;
        let equipmentMap = await getMainTableEq();
        let localMemory;
        if (req.session.localMemory) {
            localMemory = req.session.localMemory
        } else {
            localMemory = new LocalMemory;
        }
        res.status(200).render("main_table.ejs", { user, equipmentMap, localMemory});
    } else {
        res.redirect("/");
    }

});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid'); // 'connect.sid' is the default cookie name used by express-session
            res.redirect('/');
        });
    });
});


app.get("/", async (req, res) => {
    res.status(200).render("login.ejs");
})

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    // prompt: "select_account" // This forces Google to always show the account selection prompt
}))

app.get("/auth/google/main_table", passport.authenticate("google", {
    successRedirect: "/main_table",
    failureRedirect: "/",
}))


// _______________ GOOGLE STRATEGY _________________
passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/main_table",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        let apiResp = await axios.post("http://localhost:8081/get_user_auth", { email: profile.email });
        if (!apiResp.data.email) {
            const newUser = await axios.post("http://localhost:8081/reg_user", { user_name: profile.given_name, email: profile.email, ava: profile.photos[0].value });
            cb(null, newUser.data);
        } else {
            //IF user already exist
            cb(null, apiResp.data);
        }
    } catch (err) {
        console.error("Error during fetching user: ", err.message);
        cb(err);
    }
}))

// passport.serializeUser: is a function provided by Passport that determines which data of the user object should be stored in the session.
// Once you've determined what data to store, you call the callback cb with null (to indicate that there's no error) and the data you want to store.
passport.serializeUser((user, cb) => {
    cb(null, user);
});

// passport.deserializeUser: is a function provided by Passport that retrieves the data stored in the session and converts it into a user object.
// Once you've retrieved the user object, you call the callback cb with null (to indicate that there's no error) and the user object.
passport.deserializeUser((user, cb) => {
    cb(null, user);
});


/**
 * Starts the server and listens on the specified port.
 * 
 * @param {number} port - The port on which the server will listen
 */
app.listen(port, (err) => {
    // Error handling
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("Proxy server is running on port: " + port)
    }
});
