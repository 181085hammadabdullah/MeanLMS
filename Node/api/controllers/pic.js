// INCLUDE ALL NECESSARY PACKAGES
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var url = "mongodb://127.0.0.1:27017/fastlhr1";
var MongoClient = require('mongodb').MongoClient;
// IMAGE UPLOAD CODE IN NODE.JS
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/Images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });
// // FILE_FILTER WHICH IS PERMSSION FOR UPCOMING FILES FROM ANGULAR
// const fileFilter = (req, file, cb) => {
//     // ACCEPT OR REJECT A FILE
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
// // STORE THIS IMAGE IN A VARIABLE TO UPLOAD TO DATABASE
// const upload = multer({
//     storage: storage,
//     //DEFINE THE SIZE OF IMAGE
//     limits: {
//         fileSize: 1024 * 1024 * 1024 * 1
//     },
//     fileFilter: fileFilter
// });
// // ADD LECTURE



// const file = require("../models/pic");
// router.post("/upload", upload.single('photo'), (req, res, next) => {
//     console.log("hello");
//     const File = new file({
//         _id: new mongoose.Types.ObjectId(),
//         title: req.body.title,
//         name: req.file.filename,
//         path: req.file.path,
//         type: req.file.mimetype,
//     });
//     File.save().then(result => {
//         console.log(result);
//     })
//         .catch(err => {
//             console.log(err);
//             res.send(err);
//         });
//     res.send(req.file.filename);
// });



const files = require("../models/pic");

const Mime_Types = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = Mime_Types[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./uploads/Images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = Mime_Types[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post("/addpic", multer({storage: storage}).single("image"), (req, res, next) => {
  const URL = req.protocol + '://' + req.get("host");
    const object = new files({
    _id: new mongoose.Types.ObjectId(),
    imagePath: URL + '/Images/' + req.file.filename,
    });
         
    object.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Add file successfully",
          // postId: result._id
          posts: {
            id: result._id,
            imagePath: result.imagePath,
          }
        });

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("LMS");
            // Push New Program
            dbo.collection('users').updateOne({ "profile.Email": req.body.email },
              {
                $push:
                {
                  Pic: {
                    _id: result._id,
                    imagePath: result.imagePath,
                  }
                }
              },
            );
          });
    });


  


});

router.get("/getpic", (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection("pics").find().toArray(function (err, res1) {
        if (err) throw err;
        res.status(200).json({
          message: "Profile Pic fetched successfully!",
          posts: res1,
        });
      }); 
    });
  });



  router.get("/pic/:id", (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
      var ObjectId = require('mongodb').ObjectID;
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection("pics").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
        if (err) throw err;
        res.send(res1);
        db.close();
      }); 
    });
  });

module.exports = router;