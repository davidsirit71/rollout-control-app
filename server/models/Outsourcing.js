const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outsourcingSchema = new Schema({
  subcontractor: String,
  tasklist: Array,
  subcEval: Number
});

const Outsourcing = mongoose.model("Outsourcing", outsourcingSchema);
module.exports = Outsourcing;
