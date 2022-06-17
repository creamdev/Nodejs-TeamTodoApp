const express = require("express");
const {
  getAllUsers,
  getUserByProfile  ,
  createUser,
  loginUser,
  getTodosByUserId,
  updateProfile,
  updatePassword,
  updateImage
} = require("../controllers/User");
const authenticateToken  = require("../middleware/authenticate");

const router = express.Router();

// Get all users
router.route("/").get(authenticateToken,getAllUsers);

//Auth Routes
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

// Profile Routes
router.route("/profile").get(authenticateToken,getUserByProfile);
router.route('/update-profile').put(authenticateToken,updateProfile);
router.route('/update-password').put(authenticateToken,updatePassword);
router.route('/update-image').post(authenticateToken,updateImage);

// User Todos Filter
router.route('/todos/:id').get(authenticateToken,getTodosByUserId);

module.exports = router;
