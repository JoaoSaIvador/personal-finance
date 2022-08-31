const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  purpose: String,
  value: Number,
  category: String,
  date: String,
  user: String,
  createdAt: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);;
