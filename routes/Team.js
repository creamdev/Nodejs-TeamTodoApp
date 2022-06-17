const express = require("express");
const {
  listTeam,
  createTeam,
  addUserToTeam,
  deleteUserFromTeam,
} = require("../controllers/Team");
const authenticateToken = require("../middleware/authenticate");

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, createTeam)
  .get(authenticateToken, listTeam);

router
  .route("/:id")
  .post(authenticateToken, addUserToTeam)
  .delete(authenticateToken, deleteUserFromTeam);


module.exports = router;
