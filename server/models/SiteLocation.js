const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  sitename: { type: String, required: true },
  pmanager: { type: String, required: true },
  pcontroller: String,
  customerId: String,
  phaseEng: {
    active: {type: Boolean, default: false},
    subcontractor: String,
    sdate: Date,
    fdate: Date,
    duration: Number
  },
  phaseLog: {
    active: {type: Boolean, default: false},
    subcontractor: String,
    sdate: Date,
    fdate: Date,
    duration: Number
  },
  phaseIns: {
    active: {type: Boolean, default: false},
    subcontractor: String,
    sdate: Date,
    fdate: Date,
    duration: Number
  },
  phaseAce: {
    active: {type: Boolean, default: false},
    subcontractor: String,
    sdate: Date,
    fdate: Date,
    duration: Number
  },
  totaltime: Number, 
  location: { type: { type: String }, coordinates: [Number] }
});

siteSchema.index({ location: "2dsphere" });
const Site = mongoose.model("Site", siteSchema);
module.exports = Site;

// service: {
//   type: String,
//   enum: ["Engineering", "Logistic", "Execution", "Finished"]
// },
