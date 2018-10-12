const express = require("express");
const router = express.Router();

const utils = require("./projects.utils");

router.get("/all/:id", utils.getProjects);
router.get("/:id", utils.getOneProject);
router.post("/new", utils.createProject);
router.put("/:id", utils.updateProject);
router.delete("/:id", utils.deleteProject);

module.exports = router;
