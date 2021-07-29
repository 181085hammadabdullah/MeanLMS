const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
 
    // STUDENT PROFILE
    status:{type: String, required: true},
    profile: {
        First_Name: { type: String, required: true },
        Last_Name: { type: String, required: true },
        Pic: { type: String, required: true },
        Email: { type: String, required: true, unique: true },
        Password: { type: String, required: true },
        Phone_No: { type: String, required: true },
        Address: { type: String, required: true },
        Gender: { type: String, required: true },
        CNIC: { type: String, required: true },
        Country: { type: String, required: true },
        City: { type: String, required: true },
    },
    // STUDENT ACEDMIC INFO
    Acedmic: {
        Qualification: { type: String, required: true },
        Specialization: { type: String, required: true },
        Current_Status: { type: String, required: true },
        Future_Plan: { type: String, required: true },
        Know: { type: String, required: true },
    },
    // ABOUT INSTRUCTOR
    
    // PROGRAM INFO
    Program: [],
    Pic: {
        _id: mongoose.Schema.Types.ObjectId,
        imagePath: { type: String, requird: true },
    }
    // Program: {
    //     _id: mongoose.Schema.Types.ObjectId,
    //     name: { type: String, required: true, unique: true },
    //     Duration: { type: String, required: true },
    //     Fees: { type: String, required: true },
    //     Introduction: { type: String, required: true },
    //     learn1: { type: String, required: true },
    //     learn2: { type: String, required: true },
    //     learn3: { type: String, required: true },
    //     learn4: { type: String, required: true },
    //     learn5: { type: String, required: true },
    //     learn6: { type: String, required: true },
    //     Requirement1: { type: String, required: true },
    //     Requirement2: { type: String, required: true },
    //     Requirement3: { type: String, required: true },
    //     Description: { type: String, required: true },
    //     imagePath: { type: String, requird: true },
    // },
    // BATCH INFO
   

});
userSchema.pre('save', function (next) {
    this.profile.Password = bcrypt.hashSync(this.profile.Password, saltRounds);
    next();
});
module.exports = mongoose.model('User', userSchema);