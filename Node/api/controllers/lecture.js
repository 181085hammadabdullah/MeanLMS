// INCLUDE ALL NECESSARY PACKAGES
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



const files = require("../models/lecture");

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


router.post("/addpost", multer({storage: storage}).single("image"), (req, res, next) => {
  const URL = req.protocol + '://' + req.get("host");
    const object = new files({
    _id: new mongoose.Types.ObjectId(),
    postHeading:req.body.postHeading,
    postContent:req.body.postContent,
    imagePath: URL + '/Images/' + req.file.filename,
    });
         
    object.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Add file successfully",
          // postId: result._id
          posts: {
            id: result._id,
            postHeading: result.postHeading,
            postContent: result.postContent,
            imagePath: result.imagePath,
          }
        });
    });
});

router.get("/getposts", (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("LMS");
      dbo.collection("news").find().toArray(function (err, res1) {
        if (err) throw err;
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: res1,
        });
      }); 
    });
  });


  router.delete("/deletepost/:id", (req, res, next) => {
    files.deleteOne({ "_id": (req.params.id) }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post has been deleted!" });
    });
});
  
router.get("/newsone/:id", (req, res, next) => {
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











// router.post("/addnews", (req, res, next) => {
//     const News= new news({
//     _id: new mongoose.Types.ObjectId(),
//     newsHeading:req.body.newsHeading,
//     newsContent:req.body.newsContent,
//     });
      
//     News.save().then(result => {
//         console.log(result);
//         res.status(201).json({
//           message: "News & Events Posted Successfully",
//         });
//     });
//   });

//   router.get("/getnews",(req,res,next)=>{
//     news.find(function(err,response){
//         if(err) throw err;
//         res.send(response);
//     });
// });

// router.get("/newsone/:id", (req, res, next) => {
//     MongoClient.connect(url, function (err, db) {
//       var ObjectId = require('mongodb').ObjectID;
//       if (err) throw err;
//       var dbo = db.db("LMS");
//       dbo.collection("news").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, res1) {
//         if (err) throw err;
//         res.send(res1);
//         db.close();
//       }); 
//     });
//   });








// // IMAGE UPLOAD CODE IN NODE.JS
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });
// // FILE_FILTER WHICH IS PERMSSION FOR UPCOMING FILES FROM ANGULAR
// const fileFilter = (req, file, cb) => {
//     // ACCEPT OR REJECT A FILE
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4'
//         || file.mimetype === 'audio/ogg'
//         || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
//         || file.mimetype === 'application/pdf' || file.mimetype === 'application/msword'
//         || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//         || file.mimetype === 'application/vnd.ms-excel'
//         || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//     ) {

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
// const file = require("../models/lecture");
// router.post("/addlec", upload.single('photo'), (req, res, next) => {
//     if (req.file.mimetype == "image/png" || req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/gif") {
//         const File = new file({
//             _id: new mongoose.Types.ObjectId(),
//             title: req.body.title,
//             name: req.file.filename,
//             path: req.file.path,
//             type: req.file.mimetype,
//         });
//         File.save().then(result => {
//             console.log(result);
//         })
//             .catch(err => {
//                 console.log(err);
//                 res.send(err);
//             });
//             res.send(req.file.filename);
//     }
//     if (req.file.mimetype == "video/mp4") {
//         const File = new file({
//             _id: new mongoose.Types.ObjectId(),
//             title: req.body.title,
//             name: req.file.filename,
//             path: req.file.path,
//             type: req.file.mimetype,
//         });
//         File.save().then(result => {
//             console.log(result);
//         })
//             .catch(err => {
//                 console.log(err);
//                 res.send(err);
//             });
//             res.send(req.file.filename);
//     }
//     if (req.file.mimetype == "application/pdf" || reqfile.mimetype === 'application/msword'
//         || req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//         || req.file.mimetype === 'application/vnd.ms-excel'
//         || req.file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//     ) {
//         const File = new file({
//             _id: new mongoose.Types.ObjectId(),
//             title: req.body.title,
//             name: req.file.filename,
//             path: req.file.path,
//             type: req.file.mimetype,
//         });
//         File.save().then(result => {
//             console.log(result);
//         })
//             .catch(err => {
//                 console.log(err);
//                 res.send(err);
//             });
//             res.send(req.file.filename);
//     }
// });
// // GET ALL LECTURES OF A BATCH
// router.post('/getlec', (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).find({ 'batch': req.body.batch }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });
// // GET ONE LECTURE OF A BATCH
// router.post("/getone", (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).find({
//             $and: [{ 'batch': req.body.batch },
//             { 'lectureno': req.body.lectureno }]
//         }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// })
// // GET ALL VIDEOS OF A BATCH
// router.post('/getvid', (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).find({
//             $and: [{ 'batch': req.body.batch },
//             { 'video': "Yes" }]
//         }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });
// // GET ALL PICTURES OF A BATCH
// router.post('/getpic', (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).find({
//             $and: [{ 'batch': req.body.batch },
//             { 'pic': "Yes" }]
//         }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });
// // GET ALL FILES OF A BATCH
// router.post('/getfile', (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).find({
//             $and: [{ 'batch': req.body.batch },
//             { 'file': "Yes" }]
//         }).limit(100).sort({ _id: 1 }).toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });
// // DELETE ONE LECTURE OF A BATCH
// router.post("/delone", (req, res, next) => {
//     const Degree = req.body.degree;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("LMS");
//         dbo.collection(Degree).remove({
//             $and: [{ 'batch': req.body.batch },
//             { 'lectureno': req.body.lectureno }]
//         });
//         res.send("Deleted");
//     });
// })


//   // IMAGE UPLOAD CODE IN NODE.JS
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
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype === 'audio/ogg'
//         || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
//         || file.mimetype === 'application/pdf') {
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

// //..............................// Image Upload Code In node Js//........................
// const pic = require("../models/lecture");
// router.post("/addimage", upload.single('photo'), (req, res, next) => {
//     if(req.file.mimetype=="image/png" || req.file.mimetype=="image/jpeg"){
//         console.log("hello");
//     const Pic = new pic({
//         _id: new mongoose.Types.ObjectId(),
//         path: req.file.path,
//         name: req.file.filename,
//         type:req.file.mimetype,
//         video:"No",
//         picture: "Yes",
//         file:"No",
//     });
//     Pic.save().then(result => {
//         console.log(result);
//        res.send( req.file.filename);
//     });
// }
// if(req.file.mimetype=="video/mp4"){
//     const Pic = new pic({
//         _id: new mongoose.Types.ObjectId(),
//         path: req.file.path,
//         name: req.file.filename,
//         type:req.file.mimetype,
//         video: "Yes",
//         picture: "No",
//         file:"No",
//     });
//     Pic.save().then(result => {
//         console.log(result);
//        res.send( req.file.filename);
//     });
// }
// if(req.file.mimetype=="application/pdf"){
//     const Pic = new pic({
//         _id: new mongoose.Types.ObjectId(),
//         path: req.file.path,
//         name: req.file.filename,
//         type:req.file.mimetype,
//         video: "No",
//         picture: "No",
//         file: "Yes",
//     });
//     Pic.save().then(result => {
//         console.log(result);
//        res.send( req.file.filename);
//     });
// }
    
// });

// router.get('/getpics', (req, res, next) => {
//     pic.find(function (request, response) {
//         res.status(200).json(response);
//     });
// });

module.exports = router;
