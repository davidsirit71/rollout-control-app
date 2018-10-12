const Project = require("../models/Project");

exports.getProjects = ((req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  Project.find({ team: { $in: [userId] } })
    .then(proL => {
      console.log(proL);
      return res.status(200).json(proL);
    })
    .catch(err => {
      res.status(500).json(proL);
    });
});

exports.getOneProject = ((req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  Project.findById(userId)
    .then(proj => {
      console.log("Unico project");
      console.log(proj);
      return res.status(200).json(proj);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

exports.createProject = ((req, res, next) => {
  const liderId = req.user._id
  const { projectname, customer } = req.body;
  console.log(projectname);
  console.log(customer);
  console.log(liderId);
  //console.log(lider);
  //console.log(team);
  //team: [userId]
  const newProject = new Project({
    projectname,
    customer,
    lider: liderId
  });
  newProject.save().then(nProj => {
    console.log("creado nuevo proj");
    Project.find({ lider:  ObjectId({liderId})})
      .then(proL => {
        return res.status(200).json(proL);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
});

exports.updateProject = ((req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false },
    (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ message: "something wrong when updating data" });
      }
    }
  );
});

exports.deleteProject = ((req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Proyect Deleted");
      return res.status(200).json({ message: "Proyect Deleted" });
    })
    .catch(err => {
      console.log("Something worng when deleting");
      return res.status(500).json(err);
    });
});
