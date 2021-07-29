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
const admin = require("../models/admin");
//To get All Records
router.get("/all", (req, res, next) => {
  user.find(function (request, response) {
    res.status(200).json(response);
  });
});
//SIGN IN WITH JWT AUTH TOKEN 
router.post("/signin", (req, response, next) => {
  admin.findOne({ email: req.body.email }, function (err, res, next) {
    if (err) throw err;
    else {
      if (bcrypt.compareSync(req.body.password, res.password)) {//Work Is Perfectly Done 
        const token = jwt.sign({ id: res._id }, req.app.get('secretKey'), { expiresIn: '1h' });
        response.json({ status: "success", message: "user found!!!", user: res, token: token, email: req.body.email,
        _id:res._id, name:res.name });
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
// FOR REGISTER A NEW ADMIN
router.post("/reg", (req, res, next) => {
  console.log(req.body);
  const Admin = new admin({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // phoneno: req.body.phoneno,
    // address: req.body.address
  });
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.createCollection("Admin Chat", function (err, res) {
      if (err) throw err;
      console.log("User Chat created!");
      db.close();
    });
  });
  Admin.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Add Admin successfully",
    });
  })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});
router.post("/appuser/:id",(req,res,next)=>{
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('users').find({ "_id": ObjectId(req.params.id) }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
        dbo.collection('users').updateOne({ "_id": ObjectId(req.params.id)},
        {
          $set:{
            status:"approved"
          } 
        });
        if (err) throw err;
        console.log("1 User Approved");
        db.close();
      res.send(result[0]);
    })
  })
})
router.post("/appstaff/:id",(req,res,next)=>{
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('staffs').find({ "_id": ObjectId(req.params.id) }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
        dbo.collection('staffs').updateOne({ "_id": ObjectId(req.params.id)},
        {
          $set:{
            status:"approved"
          } 
        });
        if (err) throw err;
        console.log("1 User Approved");
        db.close();
      res.send(result[0]);
    })
  })
})

module.exports = router;
