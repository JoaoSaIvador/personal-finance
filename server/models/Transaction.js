const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  value: Number,
  category: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);;
