const express = require("express");
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getPrivateTodo,
  getMyAllTodo,
} = require("../controllers/Todos");
const authenticateToken = require("../middleware/authenticate");

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, createTodo)
  .get(authenticateToken, getTodo);

router
  .route("/:id")
  .put(authenticateToken, updateTodo)
  .delete(authenticateToken, deleteTodo);

router.route("/private").get(authenticateToken, getPrivateTodo);
router.route("/getmyalltodo").get(authenticateToken, getMyAllTodo);

module.exports = router;
