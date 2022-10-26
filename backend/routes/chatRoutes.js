const express = require("express");
const { models } = require("mongoose");
const { middlewares } = require("../middlewares/authMiddleware");
const { remove } = require("../models/userModel");
const { accessChat } = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(middlewares, accessChat);
// router.route("/").get(middlewares,fetchChats);
// router.route("/group").post(middlewares, createGroupChat);
// router.route("/rename").put(middlewares, renameGroup);
// router.route("/groupremove").put(middlewares, removeFormGroup);
// router.route("/groupadd").put(middlewares, addToGroup);

module.exports = router;
