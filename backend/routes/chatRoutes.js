const express = require("express");
const { models } = require("mongoose");
const { middlewares } = require("../middlewares/authMiddleware");
const { remove } = require("../models/userModel");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFormGroup,
} = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(middlewares, accessChat);
router.route("/").get(middlewares, fetchChats);
router.route("/group").post(middlewares, createGroupChat);
router.route("/rename").put(middlewares, renameGroup);

router.route("/groupadd").put(middlewares, addToGroup);
router.route("/groupremove").put(middlewares, removeFormGroup);

module.exports = router;
