const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    participants: [
        {
            senderId: mongoose.Schema.Types.ObjectId,
            receiverId: mongoose.Schema.Types.ObjectId,
        }
    ]
});
module.exports = mongoose.model('Chat', ChatSchema);