const mongoose = require('mongoose');
const NewsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postHeading:{ type: String, required: true},
    postContent: { type: String, requird: true },
    imagePath: { type: String, requird: true },
    // path: { type: String, requird: true },
    // name: { type: String, requird: true },
    // type: { type: String, requird: true },
    // video: { type: String, requires: true },
    // picture: { type: String, requires: true },
    // file: { type: String, requires: true },
});
module.exports = mongoose.model('New', NewsSchema);