
const path = require('path');
const fs = require('fs');


const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var url = "mongodb://127.0.0.1:27017/LMS";
var MongoClient = require('mongodb').MongoClient;



const videos = require("../models/video");

const Mime_Types = {
  'video/mp4': 'mp4',
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = Mime_Types[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./uploads/videos");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = Mime_Types[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post("/addvideo", multer({storage: storage}).single("video"), (req, res, next) => {
  const URL = req.protocol + '://' + req.get("host");
    const object = new videos({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    Introduction:req.body.Introduction,
    imagePath: URL + '/videos/' + req.file.filename,
    });
         
    object.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Add video successfully",
          // postId: result._id
          video: {
            id: result._id,
            name: result.name,
            Introduction: result.Introduction,
            imagePath: result.imagePath,
          }
        });
    });
});

router.get("/getvideos", (req, res, next) => {
    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LMS");
        dbo.collection("videos").find().toArray(function (err, res1) {
        if (err) throw err;
        res.status(200).json({
          message: "Videos fetched successfully!",
          posts: res1,
        });
      }); 
    });
  });


// router.get("/getvideos", (req, res, next) => {
//     videos.find(function (request, response) {
//       res.status(200).json({
//         message: "Videos fetched successfully!",
//         video: response
//       });
//     });
//   }); 

  router.delete("/deletevideo/:id", (req, res, next) => {
    videos.deleteOne({ "_id": (req.params.id) }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post has been deleted!" });
    });
});
  
router.get("/videoone/:id", (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
      var ObjectId = require('mongodb').ObjectID;
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection("news").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
        if (err) throw err;
        res.send(res1);
        db.close();
      }); 
    });
  });


  module.exports = router;