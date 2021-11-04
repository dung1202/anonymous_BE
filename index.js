const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middleware = require("./helper/authenMiddleware");
const UserRouter = require("./userController");
const AccRouter = require("./accController");
const User_Profile = require("./profileController");

var mongoDB_user = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD}@anonymous.wq4br.mongodb.net/Production?retryWrites=true&w=majority`;
var mongoDB_dev = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD}@anonymous.wq4br.mongodb.net/Dev?retryWrites=true&w=majority`;
var local_mongoDB = `mongodb://localhost:27017/ANONYMOUS_dev`
mongoose.connect(local_mongoDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (err) {
        if (err) throw err;
        console.log('Successfully connected');
    });

// Force mongoose to use global promise
mongoose.Promise = global.Promise;

var db = mongoose.connection;
app.use("/", AccRouter);
app.use("/user", middleware.authenticateJWT, UserRouter);
app.use("/profile", middleware.authenticateJWT, User_Profile);

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.listen(PORT, () => {
    console.log("Server started on http://localhost:" + PORT);
});
module.exports = app;
