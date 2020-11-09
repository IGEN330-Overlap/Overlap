const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const router = require("./router.js");

//Use port stored in .env file if it exists which it doesn't haha gottem
//If we are too stupid to have a .env file atm then just use port 4000
const PORT = process.env.PORT || 4000;

//Express middleware
app.use(cors());
app.use(express.json()); //Allow passing of json files

//use routes in router at home url
app.use("/", router);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})
