const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outsourcingSchema = new Schema({
  subcontractor: String,
  supervisor: String,
  subcEval: Number,
  supeEval: Number
});

const Outsourcing = mongoose.model("Outsourcing", outsourcingSchema);
module.exports = Outsourcing;
