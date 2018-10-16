const express = require("express");
const router = express.Router();

const utils = require("./sites.utils");

//routes added to /sites/...
router.get("/all", utils.getAllSites);
router.get("/all/:projectId", utils.getAllSitesInProject);
router.get("/:siteId", utils.getOneSite);
router.post("/new", utils.createSite);
router.put("/:siteId", utils.updateSite);
router.delete("/:siteId", utils.deleteSite);

module.exports = router;
