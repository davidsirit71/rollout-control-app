const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  sitename: { type: String, required: true },
  pmanager: { type: String, required: true },
  pcontroller: String,
  supervisor: String,
  subcontractor: String,
  customerId: String,
  service: {
    type: String,
    enum: ["Engineering", "Logistic", "Execution", "Finished"]
  },
  location: { type: { type: String }, coordinates: [Number] },
  
});

siteSchema.index({ location: "2dsphere" });
const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
