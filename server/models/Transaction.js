var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  value: Number,
  category: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);;
