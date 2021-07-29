// INCLUDE ALL NECESSARY PACKAGES
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var url = "mongodb://127.0.0.1:27017/LMS";
var url_pro = "mongodb://127.0.0.1:27017/LMS";
var MongoClient = require('mongodb').MongoClient;
const program = require("../models/programs");


// ORIGINAL CODE
// 
router.post("/addprogram22", (req, res, next) => {
  const Program= new program({
  _id: new mongoose.Types.ObjectId(),
  name:req.body.name ,
  Duration:req.body.Duration,
  Fees:req.body.Fees,
  Description:req.body.Description,
  // Pic:req.body.Pic,
  });
  MongoClient.connect(url_pro, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.createCollection(req.body.name, function (err, res) {
      if (err) throw err;
      console.log("Program Database created!");
      db.close();
    });
  });
  Program.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Add Program successfully",
      });
  });
});

router.post("/addprogram876", (req, res, next) => {
  const Program= new program({
  _id: new mongoose.Types.ObjectId(),
  name:req.body.name ,
  Duration:req.body.Duration,
  Fees:req.body.Fees,
  Introduction: req.body.Introduction,
  learn1: req.body.learn1,
  learn2: req.body.learn2,
  learn3: req.body.learn3,
  learn4: req.body.learn4,
  learn5: req.body.learn5,
  learn6: req.body.learn6,
  Requirement1: req.body.Requirement1,
  Requirement2: req.body.Requirement2,
  Requirement3: req.body.Requirement3,
  Description:req.body.Description,
  // Pic:req.body.Pic,
  });
    
  Program.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Add Program successfully",
        courses: result
      });
  });
});



const files = require("../models/programs");

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

router.post("/addprogram", multer({storage: storage}).single("image"), (req, res, next) => {
  const URL = req.protocol + '://' + req.get("host");
    const object = new files({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    Duration: req.body.Duration,
    Fees: req.body.Fees,
    Introduction: req.body.Introduction,
    learn1: req.body.learn1,
    learn2: req.body.learn2,
    learn3: req.body.learn3,
    learn4: req.body.learn4,
    learn5: req.body.learn5,
    learn6: req.body.learn6,
    Requirement1: req.body.Requirement1,
    Requirement2: req.body.Requirement2,
    Requirement3: req.body.Requirement3,
    Description: req.body.Description,
    imagePath: URL + '/Images/' + req.file.filename,
    });
         
    object.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Program Added successfully",
          // postId: result._id
          program: {
            id: result._id,
            name: result.name,
            Duration: result.Duration,
            Fees: result.Fees,
            Introduction: result.Introduction,
            learn1: result.learn1,
            learn2: result.learn2,
            learn3: result.learn3,
            learn4: result.learn4,
            learn5: result.learn5,
            learn6: result.learn6,
            Requirement1: result.Requirement1,
            Requirement2: result.Requirement2,
            Requirement3: result.Requirement3,
            Description: result.Description,
            imagePath: result.imagePath,
          }
        });
    });
});

router.get("/getprograms", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection("programs").find().toArray(function (err, res1) {
      if (err) throw err;
      res.status(200).json({
        message: "Programs fetched successfully!",
        programs: res1,
      });
    }); 
  });
});

router.get("/program/:id", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    var ObjectId = require('mongodb').ObjectID;
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection("programs").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
      if (err) throw err;
      res.send(res1);
      db.close();
    }); 
  });
});

router.delete("/deleteprogram/:id", (req, res, next) => {
  files.deleteOne({ "_id": (req.params.id) }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Program has been deleted!" });
  });
});


// This is add program to users emedded document api
router.post('/addpro', (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    // Find A Program From Programs Collection
    dbo.collection('programs').find({ "name": req.body.name }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      // Push New Program
      dbo.collection('users').updateOne({ "profile.Email": req.body.email },
        {
         
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
    });
  });
  res.json("Video Added Successfully");
});










router.post("/addvideo",(req,res,next)=>{
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
      dbo.collection('programs').updateOne({ name: req.body.name },
        {
           $push:
          {
            Video: {
              _id: new mongoose.Types.ObjectId(),
              VideoName: req.body.VideoName,
              Introduction: req.body.Introduction,
            }
          }
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
  });
  res.json("Video Added Sucessfully");
})

router.post("/addbatch",(req,res,next)=>{
    const degree = req.body.degree;
    var batch = {Batch_No:req.body.batchno,Starting_Date:req.body.sdate,Max_Seats:req.body.mseats,Enroll_Students:req.body.estudents};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("LMS");
        dbo.collection(degree + ' Batches').insertOne(batch, function(err, res) {
          if (err) throw err;
          console.log("1 Batch Added");
          db.close();
        });
      });
      res.send(batch);
})
// router.get("/getprograms",(req,res,next)=>{
//     program.find(function(err,response){
//         if(err) throw err;
//         // res.send(response);
//         res.status(200).json({
//           message: "Programs fetched successfully!",
//           programs: response, 
//         });
//     });
// });


router.get("/program/:idjkhgj", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    var ObjectId = require('mongodb').ObjectID;
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection("program").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
      if (err) throw err;
      res.send(res1);
      db.close();
    }); 
  });
});


router.post("/getbatches",(req,res,next)=>{
    var batches;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection(req.body.degree + " Batches").find().limit(100).sort({ _id: 1 }).toArray(function (err, result) {
          if (err) throw err;
          res.send(result);
      });
  });
});
module.exports = router;
