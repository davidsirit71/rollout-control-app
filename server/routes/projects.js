const express = require("express");
const router = express.Router();

const utils = require("./projects.utils");

// routes added to /projects/....
router.get("/all", utils.getProjects);
router.get("/:projectId", utils.getOneProject);
router.post("/new/", utils.createProject);
router.put("/:projectId", utils.updateProject);
router.delete("/:projectId", utils.deleteProject);

module.exports = router;
