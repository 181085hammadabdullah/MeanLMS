const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AdminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // phoneno: { type: String, required: true },
    // address: { type: String, required: true }
});
AdminSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('Admin', AdminSchema);