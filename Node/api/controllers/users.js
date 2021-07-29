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
const user = require("../models/users");
//To get All Records
router.get("/all", (req, res, next) => {
  user.find(function (request, response) {
    res.status(200).json({
      message: "User fetched successfully",
      users: response
    });
  });
}); 
// Get approved users
router.get("/appall", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection("users").find().toArray(function (err, res1) {
      if (err) throw err;
      res.send(res1);
      db.close();
    }); 
  });
});
// Get One approved 
router.get("/appone/:id", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    var ObjectId = require('mongodb').ObjectID;
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection("users").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
      if (err) throw err;
      res.send(res1);
      db.close();
    }); 
  });
});
// Get One User
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
        response.json({ status: "success", message: "user found!!!", user: res, token: token, email: req.body.email,
      _id:res._id,name:res.profile.First_Name });
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
  const User = new user({
    _id: new mongoose.Types.ObjectId(),
    status: "pending",
   
    profile: {
      Email: req.body.email,
      Password: req.body.password,
      First_Name: req.body.fname,
      Last_Name: "Last Name",
      Pic: "Null",
      Gender: "Gender",
      CNIC: "CNIC",
      Country: "Country",
      City: "City",
      Phone_No: "Phone No",
      Address: "Address",
    },
    Acedmic: {
      Qualification: "Qualification",
      Specialization: "Specification",
      Current_Status: "Current Status",
      Future_Plan: "Future Plan",
      Know: "Know about us",
    },


  });
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.createCollection("users", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
 

  User.save().then(result => {
    res.status(201).json({
      message: "Add User successfully",
    });
  })

    .catch(err => {
      console.log(err);
      res.send(err);
    });
});
// COMPLETE PROFILE AFTER FIRST LOGIN
router.post("/com/:id", (req, res, next) => {
  console.log("hello");
  MongoClient.connect(url, function (err, db) {
    var ObjectId = require('mongodb').ObjectID;
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.collection('users').updateOne({ "_id": ObjectId(req.params.id) },
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
          "Acedmic.Current_Status": req.body.Current_Status,
          "Acedmic.Future_Plan": req.body.Future_Plan,
          "Acedmic.Know": req.body.Know
        }
      },
      function (err, res) {
        if (err) { throw err };
      }
    );
  });
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    dbo.createCollection(req.body.fname +" Chat", function (err, res) {
      if (err) throw err;
      console.log("Collection Chat!");
      db.close();
    });
  });
  res.json("Updated Sucessfully");
});

// router.post("/com", (req, res, next) => {
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("LMS");
//     dbo.collection('users').updateOne({ "profile.Email": req.body.email },
//       {
//         $set:
//         {
//           "profile.First_Name": req.body.fname,
//           "profile.Last_Name": req.body.lname,
//           "profile.Pic": req.body.pic,
//           "profile.Phone_No": req.body.phoneno,
//           "profile.Address": req.body.address,
//           "profile.Gender": req.body.gender,
//           "profile.CNIC": req.body.cnic,
//           "profile.Country": req.body.country,
//           "profile.City": req.body.city,
//           "Acedmic.Qualification": req.body.Qualification,
//           "Acedmic.Specialization": req.body.Specialization,
//           "Acedmic.Current_Status": req.body.Current_Status,
//           "Acedmic.Future_Plan": req.body.Future_Plan,
//           "Acedmic.Know": req.body.Know
//         }
//       },
//       function (err, res) {
//         if (err) { throw err };
//       }
//     );
//   });
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("LMS");
//     dbo.createCollection(req.body.fname +" Chat", function (err, res) {
//       if (err) throw err;
//       console.log("Collection Chat!");
//       db.close();
//     });
//   });
//   res.json("Updated Sucessfully");
// });

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
          $push:
          {
            Program: {
                _id: result[0]._id,
                name: result[0].name,
                Duration: result[0].Duration,
                Fees: result[0].Fees,
                Introduction: result[0].Introduction,
                learn1: result[0].learn1,
                learn2: result[0].learn2,
                learn3: result[0].learn3,
                learn4: result[0].learn4,
                learn5: result[0].learn5,
                learn6: result[0].learn6,
                Requirement1: result[0].Requirement1,
                Requirement2: result[0].Requirement2,
                Requirement3: result[0].Requirement3,
                Description:result[0].Description,
                imagePath: result[0].imagePath,
            }
          }
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
    });
  });
  res.json("Congratulations! You have been enrolled successfully.");
});
// this is for admin...which add instructor and batch of apply student by dropdown comes from db
router.post("/adminwork", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('staffs').find(ObjectId(req.body.staff_id)).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      dbo.collection('users').update({ $and: [{ "Program.info.P_Name": req.body.pname }, { "profile.Email": req.body.email }] },
        {
          $set:
          {
            "Program.$.Instructor.profile.First_Name": result[0].profile.First_Name,
            "Program.$.Instructor.profile.Last_Name": result[0].profile.Last_Name,
            "Program.$.Instructor.profile.Pic": result[0].profile.Pic,
            "Program.$.Instructor.Acedmic.Qualification": result[0].Acedmic.Qualification,
            "Program.$.Instructor.Acedmic.Specialization": result[0].Acedmic.Specialization,
            "Program.$.Instructor.Acedmic.Experience": result[0].Acedmic.Experience,
            "Program.$.Instructor.Acedmic.Programs": result[0].Acedmic.Programs,
          }
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
    });
    // BATCH INFO
    dbo.collection(req.body.pname + ' Batches').find({ "Batch_No": req.body.batchno }).toArray(function (err, result) {
      var seats = parseInt(result[0].Enroll_Students);
      seats = seats + 1;
      dbo.collection(req.body.pname + ' Batches').updateOne({ "Batch_No": req.body.batchno },
        {
          $set: {
            Enroll_Students: seats
          }
        })
      if (err) {
        throw err;
      }
      console.log(result[0]);
      dbo.collection('users').update({ $and: [{ "Program.info.P_Name": req.body.pname }, { "profile.Email": req.body.email }] },
        {
          $set:
          {
            "Program.$.Batch.Batch_No": result[0].Batch_No,
            "Program.$.Batch.Starting_Date": result[0].Starting_Date,
            "Program.$.Batch.Max_Seats": result[0].Max_Seats,
            "Program.$.Batch.Enroll_Students": seats,
          }
        },
        function (err, res) {
          if (err) { throw err };
        }
      );
    });
  });
  res.json("Set Batch And Instructor Sucessfully");
});
router.post("/getsamebatch", (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LMS");
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('users').find({ $and: [{ "Program.info.P_Name": req.body.pname }, { "Program.Batch.Batch_No": req.body.batchno }] }).toArray(function (err, result) {
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
    res.json({ message: "Profile Pic Updated!!!" });
  });
});
router.post("/sms", (req, res) => {
  const Sender = req.body.sender;
  const Receiver = req.body.receiver;
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection(Sender+' Chat').find({ $or: [{ 'sender': Receiver }, { 'receiver': Receiver }] }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
          if (err) throw err;
          res.send(result);
          console.log(result);
      });
  });
});
module.exports = router;
