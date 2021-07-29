// INCLUDE ALL NECESSARY PACKAGES
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var url = "mongodb://127.0.0.1:27017/LMS";
var MongoClient = require('mongodb').MongoClient;
const staff = require("../models/staff");
//To get All Records
router.get("/all", (req, res, next) => {
  user.find(function (request, response) {
    res.status(200).json(response);
  });
});
router.post("/one/:id", (req, res, next) => {
  var ObjectId = require('mongodb').ObjectID;
  user.find({ "_id": ObjectId(req.params.id) }, function (err, response) {
    res.send(response);
  });
});
//SIGN IN WITH JWT AUTH TOKEN 
router.post("/signin", (req, response, next) => {
  user.findOne({ "profile.Email": req.body.email }, function (err, res, next) {
    if (err) throw err;
    else {
      if (bcrypt.compareSync(req.body.password, res.profile.Password)) {//Work Is Perfectly Done 
        const token = jwt.sign({ id: res._id }, req.app.get('secretKey'), { expiresIn: '1h' });
        response.json({ status: "success", message: "user found!!!", user: res, token: token });
      }
      else {
        response.json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
    }
  })
    // Catch error code
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// FOR REGISTER A NEW USER(1ST Time)
router.post("/reg", (req, res, next) => {
  console.log(req.body);
  const Staff = new staff({
    status:"pending",
    _id: new mongoose.Types.ObjectId(),
    profile: {
      Email: req.body.email,
      Password: req.body.password,
      First_Name: "No",
      Last_Name: "No",
      Pic: "No",
      Gender: "No",
      CNIC: "No",
      Country: "No",
      City: "No",
      Phone_No: "No",
      Address: "No",
    },
    Acedmic: {
        Qualification: "No",
        Specialization: "No",
        Experience: "No",
        Programs: "No",
    },
  });
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.createCollection("staffs", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
  Staff.save().then(result => {
    res.status(201).json({
      message: "Add Instructor successfully",
    });
  })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});
// COMPLETE PROFILE AFTER FIRST LOGIN
router.post("/com", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection('staffs').updateOne({ "profile.Email": req.body.email },
      {
        $set:
        {
          "profile.First_Name": req.body.fname,
          "profile.Last_Name": req.body.lname,
          "profile.Pic": req.body.pic,
          "profile.Phone_No": req.body.phoneno,
          "profile.Address": req.body.address,
          "profile.Gender": req.body.gender,
          "profile.CNIC": req.body.cnic,
          "profile.Country": req.body.country,
          "profile.City": req.body.city,
          "Acedmic.Qualification": req.body.Qualification,
          "Acedmic.Specialization": req.body.Specialization,
          "Acedmic.Experience": req.body.Experience,
          "Acedmic.Programs": req.body.Programs,
        }
      },
      function (err, res) {
        if (err) { throw err };
      }
    );
  });
  res.json("Updated Sucessfully");
});
// Add a program in a instructor Profile
router.post('/addpro', (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    // Find A Program From Programs Collection
    dbo.collection('programs').find({ "name": req.body.pname }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      // Push New Program
      dbo.collection('staffs').updateOne({ "profile.Email": req.body.email },
        {
          $push:
          {
            Programs: {
                P_Name: result[0].name,
                Duration: result[0].Duration,
                Fees: result[0].Fees,
                Description:result[0].Description,
            }
          }
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
    });
  });
  res.json("Add Program Sucessfully");
});
// To get Same Programs Instrctors
router.post("/getsamebatch", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection('staffs').find({"Programs.P_Name":req.body.pname}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    })
  });
});
// Update Profile Pic Only
router.post("/cpic", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    console.log(req.body.email);
    dbo.collection('users').update({ "profile.Email": req.body.email },
      {
        $set:
        {
          "profile.Pic": req.body.pic
        }
      },
      function (err, res) {
        if (err) { throw err };
      });
      res.json({message:"Profile Pic Updated!!!"});
  });
});
module.exports = router;
