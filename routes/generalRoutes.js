const express = require("express");
const {
  createProject,
  createRole,
  listProject,
  editProject,
  editRole,
} = require("../controllers/admin");
const router = express.Router();

router.post("/projectAdd", createProject);
router.post("/roleAdd", createRole);
router.get("/listProject", listProject);
router.post("/editProject", editProject);
router.post("/editRole", editRole);

module.exports = router;
