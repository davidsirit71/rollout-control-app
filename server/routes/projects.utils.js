const Project = require("../models/Project");
const colors = require('colors');

//get all projects DONE !!!
exports.getProjects = ((req, res, next) => {
  //const userId = req.params.id;
  //console.log(userId);
  // inside find { team: { $in: [userId] } }
  Project.find()
    .then(proL => {
      console.log(proL);
      return res.status(200).json(proL);
    })
    .catch(err => {
      res.status(500).json(proL);
    });
});

//get a project
exports.getOneProject = ((req, res, next) => {
  const pid = req.params.projectId;
  console.log(pid.yellow);
  Project.findById(pid)
    .then(proj => {
      console.log("Unico project");
      console.log(proj);
      return res.status(200).json(proj);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//create a new project  DONE!!!!!!
exports.createProject = ((req, res, next) => {
  //const liderId = req.user._id
  const { projectname, customer } = req.body;
  console.log(projectname.blue);
  console.log(customer.red);
  //console.log(liderId.red);
  //console.log(lider);
  //console.log(team);
  //team: [userId]
  Project.findOne({projectname})
  .then((projFound)=> {
    if (projFound) res.status(500).json({
      status: `Project: ${projectname} already exist`
    })
  })
  const newProject = new Project({
    projectname,
    customer
  });
  //lider: liderId
  newProject.save().then(nProj => {
    console.log("Nuevo proyecto creado".green);
    Project.find({projectname })
      .then(proL => {
        return res.status(200).json(proL);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
});

//actualizar nuevo proyecto DONE!!!!
exports.updateProject = ((req, res, next) => {
  const pid = {_id: req.params.projectId }
  console.log(pid.blue);
  console.log(req.body.blue);
  Project.findByIdAndUpdate( pid, req.body, { new: false },
    (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ message: "something wrong when updating data" });
      }
    }
  );
});

// delete a project  DONE!!!!
exports.deleteProject = ((req, res, next) => {
  const projToDelete = req.params.projectId;
  Project.findByIdAndRemove(projToDelete)
    .then(() => {
      console.log("Proyect Deleted");
      return res.status(200).json({ message: "Proyect Deleted" });
    })
    .catch(err => {
      console.log("Something worng when deleting");
      return res.status(500).json(err);
    });
});
