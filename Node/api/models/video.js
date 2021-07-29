const mongoose = require('mongoose');
const VideoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    Introduction: { type: String, required: true },
    imagePath: {type: String, required: true}
});
module.exports = mongoose.model('Video', VideoSchema);