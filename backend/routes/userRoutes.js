const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { middlewares } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(middlewares, allUsers);
router.post("/login", authUser);

module.exports = router;
