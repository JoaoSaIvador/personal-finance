const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: String,
    balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);