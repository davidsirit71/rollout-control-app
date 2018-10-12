const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workgroupSchema = new Schema({
  name: String,
  detail: {type: Schema.Types.ObjectId, ref: 'Consulta'},
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  tasklist: [{type: Schema.Types.ObjectId, ref: 'Site'}]
});

const Workgroup = mongoose.model("Workgroup", workgroupSchema);
module.exports = Workgroup;
