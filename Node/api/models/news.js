const mongoose = require('mongoose');
const ProgramSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    news: { type: String, required: true, unique: true },
});
module.exports = mongoose.model('News', ProgramSchema);