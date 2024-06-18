// 🔖 package imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRouter = require("./user-routes");

// 🔖 mongodb connection 
const DB_NAME = "to-do-list";   // 
const URI = "mongodb://127.0.0.1:27017/" + DB_NAME;
mongoose.connect(URI);
mongoose.connection.on("connected", () => {
    console.log(`mongodb [ DB NAME : ${DB_NAME} ] is connected successfully`);
});

// 🔖 declaration
const app = express();
// 🔖 middle ware
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
// 🔖 to store your images, video or audio files in back-end and 
//    access it on front-end side.
// NOTE: eg: http://localhost:3434/
app.use(express.static('public'));

// 🔖 routers
// TODO: add your routers below 👇

app.use('/user', userRouter);

// 🔖 exports
module.exports = app;