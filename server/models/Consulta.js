const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultaSchema = new Schema({
  name: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  team: [{type: Schema.Types.ObjectId, ref: 'Workgroup'}]
})

const Consulta = mongoose.model("Consulta", consultaSchema);
module.exports = Consulta;