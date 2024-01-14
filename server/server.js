require("dotenv").config(); // this file is require for env library use in project for db connection
const express = require("express");
const PORT = 5000;
const cors = require('cors');
const app = express();
const serviceRoute = require("./router/service-router")
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

/*** cors is use for connection of different ports of frontend and backend on one port */
const corsOptions = {
    origin: " http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    // origin: "*", // Allow all origins for testing
    // methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    // credentials: true,
};

app.use(cors(corsOptions));
/****MiddleWare for transfer json file post get and 
use for parsing incoming request bodies with json payload ***/
app.use(express.json());

//Mount the Router
app.use("/form", contactRoute);
app.use("/", authRoute);
app.use("/",serviceRoute);

app.use(errorMiddleware);

// app.get("/",(req,res)=>{
//     res.status(200).send("Hello this the home page");
// });
// app.get("/login",(req,res)=>{
//     res.status(200).send("This is the login Page");
// });




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
});