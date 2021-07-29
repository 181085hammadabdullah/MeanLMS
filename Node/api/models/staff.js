const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const staffSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    // INSTRUCTOR ACEDMIC CAREER
    Acedmic: {
        Qualification: { type: String, required: true },
        Specialization: { type: String, required: true },
        Experience: { type: String, required: true },
        Programs: { type: String, required: true },
    },
    Programs:[{
        P_Name: { type: String, required: true },
        Duration: { type: String, required: true },
        Fees: { type: String, required: true },
    }]
});
staffSchema.pre('save', function (next) {
    this.profile.Password = bcrypt.hashSync(this.profile.Password, saltRounds);
    next();
});
module.exports = mongoose.model('Staff', staffSchema);