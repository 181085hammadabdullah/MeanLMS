const mongoose = require('mongoose');
const PicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imagePath: { type: String, required: true },
});
module.exports = mongoose.model('Pic', PicSchema);