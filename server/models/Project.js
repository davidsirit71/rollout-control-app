const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectname: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  lider: {type: Schema.Types.ObjectId, ref: 'User'},
  team:[{type: Schema.Types.ObjectId, ref: 'User'}],
  sitelist: [{type: Schema.Types.ObjectId, ref: 'Site'}],
  detail: [{type: Schema.Types.ObjectId, ref: 'Consulta'}]
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
