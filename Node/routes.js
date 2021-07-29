// INCULDE ALL NECESSARY PACKAGES
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/controllers/users");
const ProgramsRoutes = require("./api/controllers/programs");
const lectureRoutes = require("./api/controllers/lecture");
const adminRoutes = require("./api/controllers/admin");
const staffroutes = require("./api/controllers/staff");
const picroutes = require("./api/controllers/pic");
const chatroutes = require("./api/controllers/chat");
const videoroutes = require("./api/controllers/video");
// const NewRroutes = require("./api/controllers/news");
const mongoDB = 'mongodb://localhost/LMS';
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
// ATTACH PACKAGES OF MONGOOSE , MONGODB , MORGAN , CORS , BODY-PARSER AND JWT WITH "EXPRESS" 
app.set('secretKey', 'nodeRestApi');
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
app.use(cors());
app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'));
app.use("/Images", express.static(path.join("uploads/Images")))
app.use("/videos", express.static(path.join("uploads/videos")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// HANDLE JWT AUTH TOKEN 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //   DEFINE ALL POSSIBLE METHODS FOR HANDLING 
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
// FUNCTION OR VALIDATE USER
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // ADD USER_ID TO REQUEST
            req.body.userId = decoded.id;
            next();
        };
    });
};
// ROUTES USE TO HANDLE REQUESTS FROM ANGULAR APP
app.use("/users", userRoutes);
app.use("/program", ProgramsRoutes);
app.use("/lecture", lectureRoutes);
app.use("/admin", adminRoutes);
app.use("/staff", staffroutes);
app.use("/pic", picroutes);
app.use("/chat", chatroutes);
app.use("/video", videoroutes);
// app.use("/new", NewRroutes);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
// ERROR HANDLING FOR MESSANGER
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// NOW EXPORT THE EXPRESS OBJECT
module.exports = app;
