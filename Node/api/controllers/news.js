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
const news = require("../models/news");



router.post("/addnews", (req, res, next) => {
    const News= new news({
    _id: new mongoose.Types.ObjectId(),
    news:req.body.news,
    });
      
    News.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "News & Events Posted Successfully",
        });
    });
  });

  router.get("/getnews",(req,res,next)=>{
    news.find(function(err,response){
        if(err) throw err;
        res.send(response);
    });
});