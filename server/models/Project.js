const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  customername: { type: String, required: true },
  projectname: { type: String, required: true },
  projectlider: { type: String },
  sitenamelist: Array
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
