const mongoose = require('mongoose');
const ProgramSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    Duration: { type: String, required: true },
    Fees: { type: String, required: true },
    Introduction: { type: String, required: true },
    learn1: { type: String, required: true },
    learn2: { type: String, required: true },
    learn3: { type: String, required: true },
    learn4: { type: String, required: true },
    learn5: { type: String, required: true },
    learn6: { type: String, required: true },
    Requirement1: { type: String, required: true },
    Requirement2: { type: String, required: true },
    Requirement3: { type: String, required: true },
    Description: { type: String, required: true },
    imagePath: { type: String, requird: true },
    // Video: {
    //     _id: mongoose.Schema.Types.ObjectId,
    //     VideoName: { type: String, required: true, },
    //     Introduction: { type: String, required: true },
    // }
});
module.exports = mongoose.model('Program', ProgramSchema);