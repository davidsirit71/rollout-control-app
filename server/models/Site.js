const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  sitename: { type: String, required: true },
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  phaseEng: {
    active: {type: Boolean, default: false},
    subcontractor: {type: Schema.Types.ObjectId, ref: 'User'},
    sdate: Date,
    fdate: Date
  },
  phaseIns: {
    active: {type: Boolean, default: false},
    subcontractor: {type: Schema.Types.ObjectId, ref: 'User'},
    sdate: Date,
    fdate: Date
  }  
});

//siteSchema.index({ location: "2dsphere" });
const Site = mongoose.model("Site", siteSchema);
module.exports = Site;

// location: { type: { type: String }, coordinates: [Number] }

