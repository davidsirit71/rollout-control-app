const Project = require("../models/Project");
const Site = require("../models/Site");

// create new site DONE!!
exports.createSite = (req, res, next) => {
  const { sitename, project, phEnAc, phInAc } = req.body;
  // const locat = {
  //   type: 'Point',
  //   coordinates: [Number(req.body.latitude), Number(req.body.longitude)]
  // }
  console.log(sitename.yellow);
  console.log(project.blue);
  console.log(phEnAc.red);
  console.log(phInAc.green);
  const newSite = new Site({
    sitename,
    project,
    phaseEng: { active: phEnAc },
    phaseIns: { active: phInAc }
  });
  console.log(newSite.magenta);
  newSite.save().then(nSite => {
    console.log("Nuevo sitio creado".blue);
    Site.find({ sitename })
      .then(nS => {
        return res.status(200).json(nS);
      })
      .catch(err => {
        return res.status(200).json(err);
      });
  });
};
// .then(nSite =>{
//   Project.update({_id: group}, {$addToSet:{sitelist: nSite} }, (err, js)=> {
//     if(err){
//       return res.status(500).json(err)
//     } else{
//       res.status(200).json(js)
//     }
//   })
// })

// get a site DONE!!!
exports.getOneSite = (req, res, next) => {
  const sid = req.params.siteId;
  console.log(sid.magenta);
  Site.findById(sid)
    .then(siteFound => {
      console.log(siteFound.green);
      return res.status(200).json(siteFound);
    })
    .catch(err => {
      return res.status(500).json({ message: "site not found" });
    });
};

// get all sites in one project DONE!!
exports.getAllSitesInProject = (req, res, next) => {
  const pid = req.params.projectId;
  Site.find({ project: pid })
    .then(listFound => {
      console.log(listFound.green);
      return res.status(500).json(listFound);
    })
    .catch(err => {
      return res.status(200).json({ message: "sites not found" });
    });
};

// Get all sites in DB  DONE!!!
exports.getAllSites = (req, res, next) => {
  Site.find()
    .then(listFound => {
      return res.status(500).json(listFound);
    })
    .catch(err => {
      return res.status(200).json({ message: "sites not found" });
    });
};

// Delete One Site  DONE!!!
exports.deleteSite = ((req, res, next) => {
  const siteToDelete = req.params.siteId;
  Site.findByIdAndRemove(siteToDelete)
  .then(()=> {
    console.log("Site deleted");
    return res.status(200).json({ message: "Site Deleted" });
  })
  .catch( err => {
    console.log("Something worng when deleting");
    return res.status(200).json(err);
  })
})
//Update a Site info  DONE!!!!
exports.updateSite = ((req, res, next) => {
  const sid = {_id: req.params.siteId}
  console.log(sid.blue);
  console.log(req.body.blue);
  Site.findByIdAndUpdate(sid, req.body, {new: false},
    (err, data)=> {
      if(!err){
        res.status(200).json(data);
      } else{
        res.status(500).json({ message: "something wrong when updating data" });
      }
    }    
    );
});

// {
//   sitename: { type: String, required: true },
//   project: {type: Schema.Types.ObjectId, ref: 'Project'},
//   phaseEng: {
//     active: {type: Boolean, default: false},
//     subcontractor: {type: Schema.Types.ObjectId, ref: 'User'},
//     sdate: Date,
//     fdate: Date
//   },
//   phaseIns: {
//     active: {type: Boolean, default: false},
//     subcontractor: {type: Schema.Types.ObjectId, ref: 'User'},
//     sdate: Date,
//     fdate: Date
//   },
//   totaltime: Number,
//   location: { type: { type: String }, coordinates: [Number] }
// }
